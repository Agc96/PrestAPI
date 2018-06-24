const db = require('../database');

module.exports = {
	get: (req, res, next) => {
		// Verificar los datos
		var id_user = parseInt(req.params.id_user);
		if (isNaN(id_user)) return next();
		// Ejecutar el query
		db.query(`SELECT id_chat, prest.chat.id_student, student.name AS student_name, prest.chat.id_teacher,
						teacher.name AS teacher_name
				FROM prest.chat
					INNER JOIN prest.user AS student ON student.id_user = prest.chat.id_student
					INNER JOIN prest.user AS teacher ON teacher.id_user = prest.chat.id_teacher
				WHERE (id_student = $1) OR (id_teacher = $1)`, [id_user], (err, result) => {
			if (err) return next(err);
			res.status(200).send(result.rows);
		});
	},
	messages: (req, res, next) => {
		// Verificar los datos
		var id_student = parseInt(req.params.id_student);
		var id_teacher = parseInt(req.params.id_teacher);
		if (isNaN(id_student) || isNaN(id_teacher)) return next();
		// Ejecutar el query
		db.query(`SELECT id_message, message, id_user = $1, created_at, has_attachment FROM prest.message
				WHERE id_chat IN (SELECT id_chat FROM prest.chat WHERE id_student = $1 AND id_teacher = $2)`,
				[id_student, id_teacher], (err, result) => {
			if (err) return next(err);
			res.status(200).send(result.rows);
		});
	},
	send: (req, res, next) => {
		return next();
	},
	attachment: (req, res, next) => {
		return next();
	}
}
