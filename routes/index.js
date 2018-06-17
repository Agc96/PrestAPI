const university = require('./university');
const career = require('./career');
const user = require('./user');
const course = require('./course');
const student_course = require('./student_course');
const teacher_course = require('./teacher_course');

module.exports = function (app) {

	// Obtener lista de universidades
	app.get('/university', university.get);
	// Obtener lista de carreras
	app.get('/career', career.get);

	// Crear usuario
	app.post('/user', user.create);
	// Confirmar correo electrónico
	app.get('/confirm', user.confirm);
	app.get('/styles.css', user.styles);
	// Iniciar sesión
	app.post('/login', user.login);

	// Obtener lista de cursos de una carrera
	app.get('/course/:id_career', course.get);

	// Obtener lista de cursos que estudia un alumno
	app.get('/student/:id_student/course', student_course.get);
	// Guardar lista de cursos que estudia un alumno
	app.post('/student/:id_student/course', student_course.add);
	// Eliminar un curso que estudia un alumno
	app.delete('/student/:id_student/course/:id_course', student_course.delete);

	// Obtener lista de cursos que aprende un profesor
	app.get('/teacher/:id_teacher/course', teacher_course.get);
	// Guardar lista de cursos que estudia un alumno
	app.post('/teacher/:id_teacher/course', teacher_course.add);
	// Eliminar un curso que estudia un alumno
	app.delete('/teacher/:id_teacher/course/:id_course', teacher_course.delete);

}
