const db = require('../database');

const parseJSON = function (data) {
	try {
		return JSON.parse(data);
	} catch (e) {
		return [];
	}
}

const parseBool = function (data) {
	if (typeof(data) !== 'string') return null;
	return data.toLowerCase() === 'true';
}

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
		// Verificar los datos ingresados
		var id_teacher = parseInt(req.params.id_teacher);
		if (isNaN(id_teacher)) return next();
		var create_data = parseJSON(req.query.create_data);
		var delete_data = parseJSON(req.query.delete_data);
		var repeat = parseBool(req.query.repeat);
		console.log(repeat);
		if ((create_data.length <= 0) && (delete_data.length <= 0)) return next();
		// Ejecutar la transacción
		db.transaction(next, async (client) => {
			// En caso de que se vaya a repetir, obtener la fecha límite para insertar o eliminar
			var limit_day = null;
			if (repeat) {
				limit_day = await client.query(`SELECT day_end::timestamptz FROM prest.semester WHERE active = TRUE
					AND id_university IN (SELECT id_university FROM prest.user WHERE id_user = $1)`,
					[id_teacher]);
				if (limit_day.rowCount <= 0) throw 'Current semester not found';
				limit_day = new Date(limit_day.rows[0].day_end);
				if (isNaN(limit_day)) throw 'Bad end time on semester';
			}
			// Insertar las disponibilidades señaladas
			for (var i = 0; i < create_data.length; i++) {
				// Verificar los datos
				var time_start = new Date(create_data[i].time_start);
				var time_end = new Date(create_data[i].time_end);
				if (isNaN(time_start) || isNaN(time_end)) throw 'Bad times on insert' + (i+1);
				// Ejecutar el query
				await client.query(`INSERT INTO prest.availability (id_teacher, time_start, time_end)
					VALUES ($1, $2, $3)`, [id_teacher, time_start, time_end]);
				// En caso de que se quiera repetir, insertar hasta llegar al fin de ciclo
				while (repeat) {
					time_start.setDate(time_start.getDate() + 7);
					time_end.setDate(time_end.getDate() + 7);
					if (time_start > limit_day) break;
					await client.query(`INSERT INTO prest.availability (id_teacher, time_start, time_end)
						VALUES ($1, $2, $3)`, [id_teacher, time_start, time_end]);
				}
			}
			// Eliminar las disponibilidades señaladas
			for (var i = 0; i < delete_data.length; i++) {
				// Verificar los datos
				var time_start = new Date(delete_data[i].time_start);
				var time_end = new Date(delete_data[i].time_end);
				if (isNaN(time_start) || isNaN(time_end)) throw 'Bad times on delete #' + (i+1);
				// Ejecutar el query
				await client.query(`DELETE FROM prest.availability WHERE id_teacher = $1
					AND time_start = $2 AND time_end = $3`, [id_teacher, time_start, time_end]);
				// En caso de que se quiera repetir, eliminar hasta llegar al fin de ciclo
				time_start.setDate(time_start.getDate() + 7);
				time_end.setDate(time_end.getDate() + 7);
				while (repeat) {
					time_start.setDate(time_start.getDate() + 7);
					time_end.setDate(time_end.getDate() + 7);
					if (time_start > limit_day) break;
					await client.query(`DELETE FROM prest.availability WHERE id_teacher = $1
						AND time_start >= $2 AND time_end <= $3 AND available = TRUE`,
						[id_teacher, time_start, time_end]);
				}
			}
		}, (result) => {
			res.status(200).send({ message: 'OK' });
		});
	}
}
