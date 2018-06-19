const db = require('../database');

module.exports = {
	student: (req, res, next) => {
		// Obtener los datos
		var id_student = parseInt(req.params.id_student);
		if (isNaN(id_student)) return next();
		// Ejecutar el query
		db.query(`SELECT id_advisory, id_teacher, teacher.name AS name_teacher,
					advisory.id_course, course.name AS name_course, time_start, time_end,
					confirmed, confirmed_time
				FROM pucp.advisory AS advisory
					INNER JOIN pucp.user AS teacher ON teacher.id_user = advisory.id_teacher
					INNER JOIN pucp.course AS course ON course.id_course = advisory.id_course
				WHERE id_student = $1`, [id_student], (err, result) => {
			if (err) return next(err);
			res.send(result.rows);
		});
	},
	teacher: (req, res, next) => {
		// Obtener los datos
		var id_teacher = parseInt(req.params.id_teacher);
		if (isNaN(id_teacher)) return next();
		// Ejecutar el query
		db.query(`SELECT id_advisory, id_student, student.name AS name_student,
					advisory.id_course, course.name AS name_course, time_start, time_end,
					confirmed, confirmed_time
				FROM pucp.advisory AS advisory
					INNER JOIN pucp.user AS student ON student.id_user = advisory.id_student
					INNER JOIN pucp.course AS course ON course.id_course = advisory.id_course
				WHERE id_teacher = $1`, [id_teacher], (err, result) => {
			if (err) return next(err);
			res.send(result.rows);
		});
	}
}
