const university = require('./university');
const career = require('./career');
const user = require('./user');
const course = require('./course');

module.exports = function (app) {

	// Obtener lista de universidades
	app.get('/university', university.get);
	// Obtener lista de carreras
	app.get('/career', career.get);

	// Crear usuario
	app.post('/user/create', user.create);
	// Confirmar correo electrónico
	app.post('/user/:id', user.confirm);
	// Iniciar sesión
	app.post('/user', user.login);

	// Obtener lista de cursos de una carrera
	app.get('/course/:id_career', course.getList);

}
