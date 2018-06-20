const db = require('../database');

module.exports = {
	get: (req, res, next) => {
		// Verificar los datos ingresados
		var id_student = parseInt(req.params.id_student);
		if (isNaN(id_student)) return next();
		// Ejecutar el query
		db.query(`SELECT (id_course, name, code) from prest.course WHERE id_course IN
			(SELECT id_course FROM prest.student_course WHERE id_student = $1 AND active = TRUE)`,
			[req.params.id_student], (err, result) => {
				if (err) return next(err);
				res.status(200).send(result.rows);
			});
	},
	add: (req, res, next) => {
		try {
			// Verificar los datos ingresados
			var id_student = parseInt(req.params.id_student);
			if (isNaN(id_student)) return next();
			var courses = JSON.parse(req.query.data);
			// Ejecutar la transaccion
			db.transaction(next, async (client) => {
				for (var i = 0; i < courses.length; i++) {
					var rows = await client.query(`UPDATE prest.teacher_course SET active = TRUE
						WHERE id_teacher = $1 AND id_course = $2 RETURNING count(*)`, [id_teacher, courses[i]]);
					if (rows <= 0) await client.query(`INSERT INTO prest.student_course (id_student, id_course)
						VALUES ($1, $2)`, [id_student, courses[i]]);
				}
			}, (result) => {
				res.status(200).send('OK');
			});
		} catch (err) {
			next(err);
		}
	},
	delete: (req, res, next) => {
		// Verificar los datos ingresados
		var id_student = parseInt(req.params.id_student);
		var id_course = parseInt(req.params.id_course);
		if (isNaN(id_student) || isNaN(id_course)) return next();
		// Ejecutar el query
		db.query('UPDATE prest.student_course SET active = FALSE WHERE id_student = $1 AND id_course = $2',
			[id_student, id_course], (err, result) => {
				if (err) return next(err);
				res.status(200).send('OK');
			});
	}
}
