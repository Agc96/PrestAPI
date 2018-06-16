const db = require('../database');

module.exports = {
	get: (req, res, next) => {
		// Verificar que el dato es del tipo correcto
		var id_teacher = parseInt(req.params.id_teacher);
		if (isNaN(id_teacher)) return next();
		// Ejecutar el query
		db.query(`SELECT (id_course, name, code) from pucp.course WHERE id_course IN
			(SELECT id_course FROM pucp.teacher_course WHERE id_teacher = $1 AND active = TRUE)`,
			[req.params.id_teacher], (err, result) => {
				if (err) return next(err);
				res.status(200).send(result.rows);
			});
	},
	set: (req, res, next) => {
		//
	},
	delete: (req, res, next) => {
		//
	}
}
