const db = require('../database');

module.exports = {
	get: (req, res, next) => {
		// Verificar los datos ingresados
		const id_university = parseInt(req.query.university);
		if (isNaN(id_university)) return next();
		// Ejecutar el query
		db.query('SELECT id_career, name FROM prest.career WHERE id_university = $1', [id_university],
				(err, result) => {
			if (err) next(err);
			else res.send(result.rows);
		});
	},
	assign: (req, res, next) => {
		// Verificar los datos ingresados
		const id_user = parseInt(req.query.user);
		const id_career = parseInt(req.query.career);
		if (isNaN(id_user) || isNaN(id_career)) return next();
		// Ejecutar el query
		db.transaction(next, async (client) => {
			await client.query('INSERT INTO prest.student (id_student, id_career) VALUES ($1, $2)',
				[id_user, id_career]);
			await client.query('INSERT INTO prest.teacher (id_teacher, id_career) VALUES ($1, $2)',
				[id_user, id_career]);
		}, (result) => {
			res.status(200).send({ message: 'OK' });
		});
	},
	curriculum: (req, res, next) => {
		// Verificar los datos ingresados
		const id_career = parseInt(req.params.id_career);
		if (isNaN(id_career)) return next();
		// Ejecutar el query
		db.query(`SELECT id_course, name, code FROM prest.course WHERE id_course IN
					(SELECT id_course FROM prest.curriculum WHERE id_career = $1 AND active = TRUE)`,
					[id_career], (err, result) => {
			if (err) return next(err);
			res.send(result.rows);
		});
	}
}
