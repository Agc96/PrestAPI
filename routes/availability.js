const db = require('../database');

module.exports = {
	getStudent: (req, res, next) => {
		// Verificar los datos obligatorios
		var id_course = parseInt(req.params.id_course);
		if (isNaN(id_course)) return next();
		// Verificar los datos opcionales
		var day = req.params.day;
		var time_start = req.query.time_start;
		var time_end = req.query.time_end;
		// Buscar todas las disponibilidades de un día específico
		if (day) {
			db.query(`SELECT id_availability, availability.id_teacher, name AS teacher_name, payment_per_hour,
					advisory_score, time_start, time_end
				FROM prest.availability AS availability
					INNER JOIN prest.user ON prest.user.id_user = availability.id_teacher
					INNER JOIN prest.teacher ON prest.teacher.id_teacher = availability.id_teacher
				WHERE availability.id_teacher IN (SELECT id_teacher FROM prest.teacher_course WHERE id_course = $1)
					AND availability.time_start::date == $2::date AND availability.active = TRUE`,
				[id_course, day], (err, result) => {
					if (err) return next(err);
					res.status(200).send(result.rows);
				});
		}
		// Buscar las disponibilidades en un rango de timestamps
		else if (time_start && time_end) {
			db.query(`SELECT id_availability, availability.id_teacher, name AS teacher_name, payment_per_hour,
					advisory_score, time_start, time_end
				FROM prest.availability AS availability
					INNER JOIN prest.user ON prest.user.id_user = availability.id_teacher
					INNER JOIN prest.teacher ON prest.teacher.id_teacher = availability.id_teacher
				WHERE availability.id_teacher IN (SELECT id_teacher FROM prest.teacher_course WHERE id_course = $1)
					AND availability.time_start < $1 AND availability.time_end > $2 AND availability.active = TRUE`,
				[id_course, day], (err, result) => {
					if (err) return next(err);
					res.status(200).send(result.rows);
				});
		}
		else next();
	},
	getTeacher: (req, res, next) => {
		// Verificar los datos
		var id_teacher = parseInt(req.params.id_teacher);
		if (isNaN(id_teacher)) return next();
		return next();
	},
	set: (req, res, next) => {
		try {
			// Verificar los datos ingresados
			var id_teacher = parseInt(req.params.id_teacher);
			if (isNaN(id_teacher)) return next();
			var id_course = parseInt(req.query.course);
		} catch (err) {
			next(err);
		}
	},
	delete: (req, res, next) => {
		try {
			// Verificar los datos ingresados
			var id_teacher = parseInt(req.params.id_teacher);
			if (isNaN(id_teacher)) return next();
			var disponibilities = JSON.parse(req.query.data);
			// Ejecutar la transacción
			db.transaction(next, async (client) => {
				for (var i = 0; i < disponibilities.length; i++) {
					await client.query('UPDATE prest.disponibility SET active = FALSE WHERE id_disponibility = $1',
						[disponibilities[i]]);
				}
			}, (result) => {
				res.status(200).send('OK');
			});
		} catch (err) {
			next(err);
		}
	}
}
