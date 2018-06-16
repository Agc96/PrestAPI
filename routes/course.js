const db = require('../database');

module.exports = {
	get: (req, res, next) => {
		db.query(`SELECT (id_course, name, code) FROM pucp.course WHERE id_course IN
					(SELECT(id_course) FROM pucp.curriculum WHERE id_career = $1 AND active = TRUE)`,
					[req.params.id_career], (err, result) => {
			if (err) return next(err);
			res.send(result.rows);
		});
	}
}
