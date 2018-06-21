const university = require('./university');
const career = require('./career');
const user = require('./user');
const student_course = require('./student_course');
const teacher_course = require('./teacher_course');
const advisory = require('./advisory');
const disponibility = require('./disponibility');

module.exports = function (app) {

	// Obtener lista de universidades
	app.get('/university', university.get); // OK

	// Iniciar sesión
	app.post('/login', user.login);
	// Crear usuario
	app.post('/user/create', user.create);

	// Obtener lista de carreras
	app.get('/career', career.get); // OK
	// Asignar carrera a usuario
	app.post('/career', career.assign);
	// Obtener lista de cursos de una carrera
	app.get('/career/:id_career/course', career.curriculum); // OK

	// Obtener lista de cursos que estudia un alumno
	app.get('/student/:id_student/course', student_course.get); // OK
	// Guardar lista de cursos que estudia un alumno
	app.post('/student/:id_student/course', student_course.add);
	// Eliminar un curso que estudia un alumno
	app.delete('/student/:id_student/course/:id_course', student_course.delete);

	// Obtener lista de cursos que dicta un profesor
	app.get('/teacher/:id_teacher/course', teacher_course.get); // OK
	// Guardar lista de cursos que dicta un profesor
	app.post('/teacher/:id_teacher/course', teacher_course.add);
	// Eliminar un curso que dicta un profesor
	app.delete('/teacher/:id_teacher/course/:id_course', teacher_course.delete);

	// Obtener lista de asesorías de un alumno
	app.get('/student/:id_student/advisory', advisory.student); // OK
	// Obtener lista de asesorías de un profesor
	app.get('/teacher/:id_teacher/advisory', advisory.teacher); // OK
	// Obtener temas a tratar en una asesoría
	app.get('/advisory/:id_advisory/topic', advisory.topics); // OK

	// Ver disponibilidad de horarios de profesores
	app.get('/course/:id_course/disponibility', disponibility.get); // OK
	// Guardar disponibilidad de horarios para un profesor
	app.post('/teacher/:id_teacher/disponibility', disponibility.set);

	// Obtener 
	// app.get('/user/:id_user/payment', payment.get);

}
