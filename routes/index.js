const db = require('../database');

const user = require('./user');
const course = require('./course');

module.exports = function (app) {

	// Obtener lista de universidades
	app.get('/university', (req, res, next) => {
		db.query('SELECT (id_university, name) FROM prest.university WHERE active = TRUE', (err, result) => {
			if (err) return next(err);
			res.send(result.rows);
		});
	});
	// Obtener lista de carreras
	app.get('/career', (req, res, next) => {
		db.query('SELECT (id_career, name) FROM prest.career WHERE active = TRUE', (err, result) => {
			if (err) return next(err);
			res.send(result.rows);
		});
	});

	// Crear usuario
	app.post('/user/create', user.create);
	// Confirmar correo electrónico
	app.post('/user/:id', user.confirm);
	// Iniciar sesión
	app.post('/user', user.login);

	// Obtener lista de cursos de una carrera
	app.get('/course/:id_career', course.getList);

}
