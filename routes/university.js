const db = require('../database');

module.exports = {
	get: (req, res, next) => {
		db.query('SELECT id_university, name FROM prest.university WHERE active = TRUE', (err, result) => {
			if (err) return next(err);
			res.send(result.rows);
		});
	}
}
