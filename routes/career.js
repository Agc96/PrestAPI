const db = require('../database');

module.exports = {
	get: (req, res, next) => {
		db.query('SELECT (id_career, name) FROM prest.career WHERE active = TRUE', (err, result) => {
			if (err) return next(err);
			res.send(result.rows);
		});
	},
	set: (req, res, next) => {
		// Verificar los datos ingresados
		const id_career = parseInt(req.query.id_career);
		const id_user = parseInt(req.query.id_user);
		if (isNaN(id_user) || isNaN(id_career)) return next();
		// Ejecutar el query
		db.query('UPDATE pucp.user SET id_career = $1 WHERE id_user = $2', [id_career, id_user],
			(err, result) => {
				if (err) return next(err);
				res.status(200).send('OK');
			});
	}
}
