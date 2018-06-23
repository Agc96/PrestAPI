const db = require('../database');

const parseBool = function (value) {
	if (value === undefined || value === null) return null;
	return value.toLowerCase() === 'true';
}

module.exports = {
	student: (req, res, next) => {
		// Obtener los datos
		var id_student = parseInt(req.params.id_student);
		if (isNaN(id_student)) return next();
		// Ejecutar el query
		db.query(`SELECT id_advisory, advisory.id_teacher, teacher.name AS name_teacher, detail.advisory_count,
					detail.advisory_score, advisory.id_course, course.name AS name_course, time_start, time_end,
					payment, method.card_number, confirmed, confirmed_time
				FROM prest.advisory AS advisory
					INNER JOIN prest.user AS teacher ON teacher.id_user = advisory.id_teacher
					INNER JOIN prest.teacher AS detail ON detail.id_teacher = advisory.id_teacher
					INNER JOIN prest.course AS course ON course.id_course = advisory.id_course
					LEFT JOIN prest.payment_method AS method ON method.id_payment_method = advisory.id_payment_method
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
		db.query(`SELECT id_advisory, id_student, student.name AS name_student, advisory.id_course,
					course.name AS name_course, time_start, time_end, payment, method.card_number IS NOT NULL AS card,
					confirmed, confirmed_time
				FROM prest.advisory AS advisory
					INNER JOIN prest.user AS student ON student.id_user = advisory.id_student
					INNER JOIN prest.course AS course ON course.id_course = advisory.id_course
					LEFT JOIN prest.payment_method AS method ON method.id_payment_method = advisory.id_payment_method
				WHERE id_teacher = $1`, [id_teacher], (err, result) => {
			if (err) return next(err);
			res.send(result.rows);
		});
	},
	topics: (req, res, next) => {
		// Obtener los datos
		var id_advisory = parseInt(req.params.id_advisory);
		var id_user = parseInt(req.params.id_user);
		if (isNaN(id_advisory) || isNaN(id_user)) return next();
		// Ejecutar el query
		db.query('SELECT topic FROM prest.advisory_topic WHERE id_advisory = $1', [id_advisory],
				(err, result) => {
			if (err) return next(err);
			res.send(result.rows);
		});
	},
	create: (req, res, next) => {
		// Obtener los datos
		var id_student = parseInt(req.params.id_student);
		var id_teacher = parseInt(req.query.teacher);
		var id_course = parseInt(req.query.course);
		if (isNaN(id_student) || isNaN(id_teacher) || isNaN(id_course)) return next();
		var time_start = req.query.time_start;
		var time_end = req.query.time_end;
		var payment = req.query.payment; // No se convierte a float debido a la imprecisión de esta en JS
		if (!time_start || !time_end || isNaN(parseFloat(payment))) return next();
		var id_payment_method = req.query.payment_method || null;
		// Ejecutar la transacción
		db.transaction(next, async (client) => {
			await client.query(`INSERT INTO prest.advisory (id_student, id_teacher, id_course, time_start,
				time_end, payment, id_payment_method) VALUES ($1, $2, $3, $4, $5, $6, $7)`,
				[id_student, id_teacher, id_course, time_start, time_end, payment, id_payment_method]);
		}, (result) => {
			res.status(200).send('OK');
		});
	},
	confirm: (req, res, next) => {
		// Obtener los datos
		var id_advisory = parseInt(req.params.id_advisory);
		var id_teacher = parseInt(req.params.id_teacher);
		var confirmed = parseBool(req.query.confirmed);
		if (isNaN(id_advisory) || confirmed === null) return next();
		// Ejecutar la transacción
		db.transaction(next, async (client) => {
			await client.query(`UPDATE prest.advisory SET confirmed = $1, confirmed_time = NOW()
				WHERE id_advisory = $2 AND id_teacher = $3`, [confirmed, id_advisory, id_teacher]);
			if (confirmed) await client.query(`UPDATE prest.teacher SET advisory_count =
					(SELECT COUNT(*) FROM prest.advisory WHERE id_teacher = $1 AND confirmed = TRUE)
				WHERE id_teacher = $1`, [id_teacher]);
		}, (result) => {
			res.status(200).send('OK');
		});
	},
	score: (req, res, next) => {
		var id_advisory = parseInt(req.params.id_advisory);
		var id_student = parseInt(req.params.id_student);
		var score = req.query.score;
		if (isNaN(id_advisory) || isNaN(id_student) || isNaN(parseFloat(score))) return next();
		// Ejecutar la transacción
		db.transaction(next, async (client) => {
			var result = await client.query(`UPDATE prest.advisory SET score = $1 WHERE id_advisory = $2
				AND id_student = $3 RETURNING id_teacher`, [score, id_advisory, id_student]);
			// Obtener el ID del profesor
			var id_teacher = (result.rowCount > 0) ? result.rows[0].id_teacher : null;
			if (!id_teacher) throw Exception('Bad teacher ID');
			// Actualizar la puntuación del profesor
			await client.query(`UPDATE prest.teacher SET advisory_score =
					(SELECT AVG(score) FROM prest.advisory WHERE id_teacher = $1 AND confirmed = TRUE)
				WHERE id_teacher = $1`, [id_teacher]);
		}, (result) => {
			res.status(200).send('OK');
		});
	}
}
