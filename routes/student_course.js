const db = require('../database');

module.exports = {
	get: (req, res, next) => {
		var id_student = parseInt(req.params.id_student);
		if (isNaN(id_student)) return next();
		db.query(`SELECT (id_course, name, code) from pucp.course WHERE id_course IN
			(SELECT id_course FROM pucp.student_course WHERE id_student = $1 AND active = TRUE)`,
			[req.params.id_student], (err, result) => {
				if (err) return next(err);
				res.status(200).send(result.rows);
			});
	},
	set: (req, res, next) => {
		// db.transaction
	},
	delete: (req, res, next) => {
		// db.query('UPDATE pucp.student_course SET active = FALSE WHERE id_student = $1 AND id_course = $2')
	}
}
