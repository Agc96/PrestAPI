const db = require('../database');

const bcrypt = require('bcrypt');
const saltRounds = 10;

const directory = {
	root: __dirname + '/../views'
}

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
			<h2 style="font-style:italic;">prest</h2>
			<p>Hola ` + name + `,</p>
			<p>Para poder ingresar a Prest debes confirmar tu correo electr&oacute;nico haciendo clic en
				<a href="www.prest.com.pe/confirm?token=` + token + `">este link</a>.
			</p>
			<p>Saludos,</p>
			<p>El equipo de Prest</p>
		`
	}
}

const crypto = require("crypto");
const randomString = function (length) {
	return crypto.randomBytes(length || 24).toString('hex');
}

module.exports = {
	create: (req, res, next) => {
		// Verificar que se tengan todos los datos
		const name = req.query.name;
		const email = req.query.email;
		const password = req.query.password;
		if (!name || !email || !password) return next();
		// Generar una contraseña y guardarla
		bcrypt.hash(password, saltRounds, function(err, hash) {
			if (err) return next(err);
			db.user([name, email, hash], next, (token) => {
				// Mandar correo con los datos
				// transporter.sendMail(mailOptions(email, token));
				res.status(200).send('OK');
			});
		});
	},
	confirm: (req, res, next) => {
		// Verificar que se tengan todos los datos
		const token = req.query.token;
		if (!token) return res.status(404).sendFile('404.html', directory);
		// Ejecutar el update
		db.query(`UPDATE pucp.user SET active = TRUE WHERE id_user IN
				(SELECT id_user FROM pucp.pending_user WHERE token = $1)`, [token], (err, result) => {
			if (err) res.status(404).sendFile('404.html', directory);
			else res.status(200).sendFile('confirmed.html', directory);
		});
	},
	styles: (req, res, next) => {
		res.sendFile('styles.css', directory);
	},
	font: (req, res, next) => {
		res.sendFile('logo-font.ttf', directory);
	},
	check: (req, res, next) => {
		res.sendFile('check.svg', directory);
	},
	login: (req, res, next) => {
		// Verificar que se tengan todos los datos
		const email = req.query.email;
		const password = req.query.password;
		if (!email || !password) return next();
		// Ejecutar el query
		db.query('SELECT password FROM pucp.user WHERE email = $1', [email], (err, result) => {
			if (err) return next(err);
			// Obtener el hash
			const hash = (result.rowCount > 0) ? result.rows[0].password : null;
			if (!hash) return next();
			// Compararlo con el password que insertó el usuario
			bcrypt.compare(password, result.rows[0].password, function (err, result) {
				if (err || !result) return next(err);
				res.status(200).send('OK');
			});
		});
	}
}
