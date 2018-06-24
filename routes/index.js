/*
 * Rutas para la API de Prest
 * @author Anthony Gutiérrez
 */

const university = require('./university');
const career = require('./career');
const user = require('./user');
const student_course = require('./student_course');
const teacher_course = require('./teacher_course');
const advisory = require('./advisory');
const availability = require('./availability');
const payment_method = require('./payment_method');
const chat = require('./chat');
const confirm = require('./confirm');

module.exports = function (app) {

	// Obtener lista de universidades
	app.get('/university', university.get); // OK

	// Iniciar sesión
	app.post('/login', user.login); // OK
	// Crear usuario
	app.post('/user/create', user.create); // OK
	// Obtener datos de usuario
	app.get('/user/:id_user', user.get); // OK

	// Obtener lista de carreras
	app.get('/career', career.get); // OK
	// Asignar carrera a usuario
	app.post('/career', career.assign); // OK
	// Obtener lista de cursos de una carrera
	app.get('/career/:id_career/course', career.curriculum); // OK

	// Obtener lista de cursos que estudia un alumno
	app.get('/student/:id_student/course', student_course.get); // OK
	// Guardar lista de cursos que estudia un alumno
	app.post('/student/:id_student/course', student_course.add); // OK
	// Desactivar un curso que estudia un alumno
	app.delete('/student/:id_student/course/:id_course', student_course.delete); // OK

	// Obtener lista de cursos que dicta un profesor
	app.get('/teacher/:id_teacher/course', teacher_course.get); // OK
	// Guardar lista de cursos que dicta un profesor
	app.post('/teacher/:id_teacher/course', teacher_course.add); // OK
	// Desactivar un curso que dicta un profesor
	app.delete('/teacher/:id_teacher/course/:id_course', teacher_course.delete); // OK

	// Obtener lista de asesorías de un alumno
	app.get('/student/:id_student/advisory', advisory.student); // OK
	// Obtener lista de asesorías de un profesor
	app.get('/teacher/:id_teacher/advisory', advisory.teacher); // OK
	// Obtener temas a tratar en una asesoría
	app.get('/user/:id_user/advisory/:id_advisory/topic', advisory.topics); // OK
	// Crear asesoría como un alumno
	app.post('/student/:id_student/advisory/create', advisory.create); // OK
	// Confirmar asesoría como un profesor
	app.put('/teacher/:id_teacher/advisory/:id_advisory/confirm', advisory.confirm); // OK
	// Calificar al profesor de una asesoría como un alumno
	app.put('/student/:id_student/advisory/:id_advisory/score', advisory.score); // OK

	// Ver disponibilidad de horarios de profesores como alumno
	app.get('/course/:id_course/availability', availability.student);
	// Ver disponibilidad de horarios para un profesor
	app.get('/teacher/:id_teacher/availability', availability.teacher);
	// Actualizar disponibilidad de horarios para un profesor
	app.post('/teacher/:id_teacher/availability', availability.set);

	// Obtener métodos de pago de un usuario
	app.get('/user/:id_user/payment', payment_method.get); // OK
	// Guardar un método de pago para un usuario
	app.post('/user/:id_user/payment', payment_method.set); // OK
	// Quitar un método de pago de un usuario
	app.delete('/user/:id_user/payment/:id_payment_method', payment_method.delete); // OK

	// Obtener conversaciones de un usuario
	app.get('/user/:id_user/chat', chat.get);
	// Obtener lista de mensajes de un chat
	app.get('/user/:id_user/chat/:id_other_user', chat.messages);

	// Confirmación con correo electrónico
	app.get('/confirm', confirm.confirm); // OK
	app.get('/styles.css', confirm.styles); // OK
	app.get('/logo-font.ttf', confirm.logo); // OK
	app.get('/check.svg', confirm.check); // OK

}
