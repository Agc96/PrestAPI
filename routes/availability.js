const db = require('../database');

module.exports = {
	student: (req, res, next) => {
		// Verificar los datos obligatorios
		var id_course = parseInt(req.params.id_course);
		if (isNaN(id_course)) return next();
		// Verificar los datos opcionales
		var day = req.query.day;
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
					AND availability.time_start::date = $2::date AND availability.available = TRUE`,
				[id_course, day], (err, result) => {
					if (err) return next(err);
					res.status(200).send(result.rows);
				});
		}
		// Buscar las disponibilidades en un rango de timestamps
		else if (time_start && time_end) {
			db.query(`SELECT id_availability, availability.id_teacher, name AS teacher_name, payment_per_hour,
					advisory_score FROM prest.availability AS availability
					INNER JOIN prest.user ON prest.user.id_user = availability.id_teacher
					INNER JOIN prest.teacher ON prest.teacher.id_teacher = availability.id_teacher
				WHERE availability.id_teacher IN (SELECT id_teacher FROM prest.teacher_course WHERE id_course = $1)
					AND availability.time_start <= $2 AND availability.time_end >= $3 AND availability.available = TRUE`,
				[id_course, time_start, time_end], (err, result) => {
					if (err) return next(err);
					res.status(200).send(result.rows);
				});
		}
		else next();
	},
	teacher: (req, res, next) => {
		// Verificar los datos
		var id_teacher = parseInt(req.params.id_teacher);
		if (isNaN(id_teacher)) return next();
		// Ejecutar el query
		db.query(`SELECT id_availability, time_start, time_end, available FROM prest.availability
				WHERE id_teacher = $1`, [id_teacher], (err, result) => {
			if (err) return next(err);
			res.status(200).send(result.rows);
		});
	},
	set: (req, res, next) => {
		try {
			// Verificar los datos ingresados
			var id_teacher = parseInt(req.params.id_teacher);
			if (isNaN(id_teacher)) return next();
			var create_data = JSON.parse(req.params.create);
			var delete_data = JSON.parse(req.params.delete);

			// Ejecutar la transacción
			/* db.transaction(next, async (client) => {
				var result = await client.query(`SELECT 	`)
				for (var i = 0; i < create_data.length; i++) {
					await client.query(`INSERT INTO prest.availability (id_teacher, time_start, time_end)
						VALUES ($1, $2, $3)`, id_teacher, create_data[i].time_start, create_data[i].time_end);
				}
				for (var i = 0; i < delete_data.length; i++) {
					await client.query(`DELETE FROM `)
				}
			}); */
			next();
		} catch (err) {
			next(err);
		}
	}
}
