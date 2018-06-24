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
		return next();
	},
	send: (req, res, next) => {
		return next();
	},
	attachment: (req, res, next) => {
		return next();
	}
}
