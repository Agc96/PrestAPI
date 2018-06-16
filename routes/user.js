const db = require('../database');

const bcrypt = require('bcrypt');
const saltRounds = 10;

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
			db.query('INSERT INTO pucp.user (name, email, password) VALUES ($1, $2, $3)',
				[name, email, hash], (err, result) => {
					if (err) return next(err);
					res.status(200).send('Usuario creado correctamente');
				});
		});
	},
	confirm: (req, res, next) => {
		// Verificar que se tengan todos los datos
		const token = req.query.token;
		if (!token) return res.status(404).sendFile('404.html', { root: __dirname + '/../views' });
		// Ejecutar el update
		db.query(`UPDATE pucp.user SET active = TRUE WHERE id_user IN
				(SELECT id_user FROM pucp.pending_user WHERE token = $1)`, [token], (err, result) => {
			if (err) return res.status(500).sendFile('500.html', { root: __dirname + '/../views' });
			res.status(200).send('Contraseña verificada. Puede cerrar esta ventana.');
		});
	},
	styles: (req, res, next) => {
		res.sendFile('styles.css', { root: __dirname + '/../views' });
	},
	login: (req, res, next) => {
		// Verificar que se tengan todos los datos
		const email = req.query.email;
		const password = req.query.password;
		if (!email || !password) return next();
		// Ejecutar el query
		db.query('SELECT password FROM pucp.user WHERE email = $1', [email], (err, result) => {
			if (err) return next(err);
			try {
				bcrypt.compare(password, result.rows[0].password, function (err, result) {
					if (err || !result) return next(err);
					res.status(200).send('OK');
				});
			} catch (e) {
				next();
			}
		});
	}
}
