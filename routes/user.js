const db = require('../database');

const bcrypt = require('bcrypt');
const saltRounds = 10;

module.exports = {
	create: (req, res, next) => {
		const name = req.query.name;
		const email = req.query.email;
		const password = req.query.password;
		if (!name || !email || !password) return res.status(400).send('No se tienen todos los datos.');
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
		// TODO
	},
	login: (req, res, next) => {
		const email = req.query.email;
		const password = req.query.password;
		if (!email || !password) return res.status(400).send('No se tienen todos los datos.');
		db.query('SELECT password FROM pucp.user WHERE email = $1', [email], (err, result) => {
			if (err) return next(err);
			try {
				bcrypt.compare(password, result.rows[0].password, function (err, result) {
					if (!err && result) res.status(200).send('OK');
					else res.status(403).send('Correo o contraseña incorrectos.');
				});
			} catch (e) {
				res.status(403).send('Correo o contraseña incorrectos.');
			}
		});
	}
}
