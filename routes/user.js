const db = require('../database');

const bcrypt = require('bcrypt');
const saltRounds = 10;

const nodemailer = require('nodemailer')
const transporter = nodemailer.createTransport({
	service: 'gmail',
	auth: {
		user: process.env.MAIL_USER,
		pass: process.env.MAIL_PASS
	}
});
const mailOptions = function (name, email, token) {
	return {
		from: process.env.MAIL_USER,
		to: email,
		subject: 'Prest - Correo de confirmación',
		html: `
			<h1>Prest</h1>
			<h3>Confirma tu correo electrónico</h3>
			<p>Hola ` + name + `,</p>
			<p>Para poder ingresar a Prest debes confirmar tu correo electr&oacute;nico haciendo clic en
				<a href="` + process.env.CONFIRM_URL + `/confirm?token=` + token + `">este link</a>.
			</p>
			<p>Saludos,</p>
			<p>El equipo de Prest</p>
		`
	}
}

const crypto = require('crypto');
const randomString = function (length) {
	return crypto.randomBytes(length || 24).toString('hex');
}

module.exports = {
	create: (req, res, next) => {
		// Verificar que se tengan todos los datos
		const id_university = parseInt(req.query.university);
		const name = req.query.name;
		const phone = 987654321;
		const email = 'anthony.gutierrez@pucp.pe';//req.query.email;
		const password = req.query.password;
		if (isNaN(id_university) || !name || !email || !password) return next();
		// Generar una contraseña y guardarla
		bcrypt.hash(password, saltRounds, function(err, hash) {
			if (err) return next(err);
			// Ejecutar la transacción
			db.transaction(next, async (client) => {
				// Insertar un usuario
				const user = await client.query(`INSERT INTO prest.user (id_university, name, phone,
					email, password) VALUES ($1, $2, $3, $4, $5) RETURNING id_user`,
					[id_university, name, phone, email, hash]);
				// Obtener el id generado
				const id_user = (user.rowCount > 0) ? user.rows[0].id_user : null;
				if (!id_user) throw Exception('Bad user ID');
				// Generar una cadena aleatoria para confirmar el correo electrónico
				const token = randomString(24);
				await client.query(`INSERT INTO prest.pending_user (id_user, token) VALUES ($1, $2)`,
						[id_user, token]);
				return token;
			}, (token) => {
				// Mandar correo con los datos
				transporter.sendMail(mailOptions(name, email, token), (err, result) => {
					if (err) return next(err);
					res.status(200).send('OK, email sent');
				});
			});
		});
	},
	login: (req, res, next) => {
		// Verificar que se tengan todos los datos
		const email = req.query.email;
		const password = req.query.password;
		if (!email || !password) return next();
		// Ejecutar el query
		db.query('SELECT id_user, id_university, password FROM prest.user WHERE email = $1',
				[email], (err, result) => {
			if (err) return next(err);
			// Obtener el hash
			const hash = (result.rowCount > 0) ? result.rows[0].password : null;
			if (!hash) return next();
			// Compararlo con el password que insertó el usuario
			bcrypt.compare(password, result.rows[0].password, function (err, isPass) {
				if (err || !isPass) return next(err);
				res.status(200).send({
					'id_user': result.rows[0].id_user,
					'id_university': result.rows[0].id_university
				});
			});
		});
	},
	get: (req, res, next) => {
		// Verificar que se tengan todos los datos
		const id_user = parseInt(req.params.id_user);
		if (isNaN(id_user)) return next();
		// Ejecutar el query
		db.query(`SELECT id_university, name, email, student.id_career AS student_id_career,
				student.advisory_count AS student_count, teacher.id_career AS teacher_id_career,
				teacher.advisory_count AS teacher_count
			FROM prest.user
				LEFT JOIN prest.student AS student ON student.id_student = prest.user.id_user
				LEFT JOIN prest.teacher AS teacher ON teacher.id_teacher = prest.user.id_user
			WHERE prest.user.id_user = $1 AND active = TRUE`, [id_user], (err, result) => {
			if (err) return next(err);
			res.status(200).send(result.rows);
		});
	}
}
