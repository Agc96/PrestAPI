const db = require('../database');

module.exports = {
	get: (req, res, next) => {
		// Verificar los datos obligatorios
		var id_course = parseInt(req.params.id_course);
		if (isNaN(id_course)) return next();
		var day_of_week = parseInt(req.query.day_of_week);
		if (isNaN(day_of_week)) return next();
		// var hour_start = req.query.hour_start, hour_end = req.query.hour_end;
		// Ejecutar el query dependiendo de los datos
		db.query(`SELECT id_teacher, name AS name_teacher, hour_start, hour_end
			FROM prest.disponibility AS disponibility
				INNER JOIN prest.user AS teacher ON teacher.id_user = disponibility.id_teacher
			WHERE id_course = $1 AND day_of_week = $2 AND disponibility.active = TRUE`,
			[id_course, day_of_week], (err, result) => {
				if (err) return next(err);
				res.status(200).send(result.rows);
			});

		// 1. dia de la semana
		// 2. dia de la semana y rango de horas
	},
	set: (req, res, next) => {
		//
	}
}
