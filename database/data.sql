-------------------------------------
-- Datos para la base de datos Prest
-------------------------------------

INSERT INTO prest.university (name, short_name) VALUES ('Pontificia Universidad Católica del Perú', 'PUCP');
INSERT INTO prest.university (name, short_name) VALUES ('Universidad Nacional Mayor de San Marcos', 'UNMSM');
INSERT INTO prest.university (name, short_name) VALUES ('Universidad de Lima', 'ULima');

INSERT INTO prest.career (id_university, name) VALUES (1, 'Ingeniería Industrial');
INSERT INTO prest.career (id_university, name) VALUES (1, 'Ingeniería Informática');
INSERT INTO prest.career (id_university, name) VALUES (1, 'Ingeniería Mecánica');
INSERT INTO prest.career (id_university, name) VALUES (1, 'Ingeniería Civil');
INSERT INTO prest.career (id_university, name) VALUES (1, 'Ingeniería Electrónica');

-- Cursos generales para Ingeniería
INSERT INTO prest.course(id_university, name, code) VALUES (1, 'Fundamentos de Cálculo', '1MAT05');
INSERT INTO prest.course(id_university, name, code) VALUES (1, 'Cálculo Diferencial', '1MAT06');
INSERT INTO prest.course(id_university, name, code) VALUES (1, 'Cálculo Integral', '1MAT07');
INSERT INTO prest.course(id_university, name, code) VALUES (1, 'Cálculo en Varias Variables', '1MAT08');
INSERT INTO prest.course(id_university, name, code) VALUES (1, 'Cálculo Aplicado', '1MAT09');
INSERT INTO prest.course(id_university, name, code) VALUES (1, 'Fundamentos de Física', '1FIS01');
INSERT INTO prest.course(id_university, name, code) VALUES (1, 'Física 1', '1FIS02');
INSERT INTO prest.course(id_university, name, code) VALUES (1, 'Física 2', '1FIS04');
INSERT INTO prest.course(id_university, name, code) VALUES (1, 'Física 3', '1FIS06');
-- Cursos que dependen de la carrera
INSERT INTO prest.course(id_university, name, code) VALUES (1, 'Técnicas de Programación', 'INF144');
INSERT INTO prest.course(id_university, name, code) VALUES (1, 'Mecánica para Ingenieros', 'ING134');
INSERT INTO prest.course(id_university, name, code) VALUES (1, 'Estática', 'ING135');

-- Curriculum para Industrial
INSERT INTO prest.curriculum (id_career, id_course) VALUES (1, 1);
INSERT INTO prest.curriculum (id_career, id_course) VALUES (1, 2);
INSERT INTO prest.curriculum (id_career, id_course) VALUES (1, 3);
INSERT INTO prest.curriculum (id_career, id_course) VALUES (1, 4);
INSERT INTO prest.curriculum (id_career, id_course) VALUES (1, 5);
INSERT INTO prest.curriculum (id_career, id_course) VALUES (1, 6);
INSERT INTO prest.curriculum (id_career, id_course) VALUES (1, 7);
INSERT INTO prest.curriculum (id_career, id_course) VALUES (1, 8);
INSERT INTO prest.curriculum (id_career, id_course) VALUES (1, 9);
INSERT INTO prest.curriculum (id_career, id_course) VALUES (1, 11);
-- Curriculum para Informática
INSERT INTO prest.curriculum (id_career, id_course) VALUES (2, 1);
INSERT INTO prest.curriculum (id_career, id_course) VALUES (2, 2);
INSERT INTO prest.curriculum (id_career, id_course) VALUES (2, 3);
INSERT INTO prest.curriculum (id_career, id_course) VALUES (2, 4);
INSERT INTO prest.curriculum (id_career, id_course) VALUES (2, 5);
INSERT INTO prest.curriculum (id_career, id_course) VALUES (2, 6);
INSERT INTO prest.curriculum (id_career, id_course) VALUES (2, 7);
INSERT INTO prest.curriculum (id_career, id_course) VALUES (2, 8);
INSERT INTO prest.curriculum (id_career, id_course) VALUES (2, 9);
INSERT INTO prest.curriculum (id_career, id_course) VALUES (2, 10);
-- Curriculum para Mecánica
INSERT INTO prest.curriculum (id_career, id_course) VALUES (3, 1);
INSERT INTO prest.curriculum (id_career, id_course) VALUES (3, 2);
INSERT INTO prest.curriculum (id_career, id_course) VALUES (3, 3);
INSERT INTO prest.curriculum (id_career, id_course) VALUES (3, 4);
INSERT INTO prest.curriculum (id_career, id_course) VALUES (3, 5);
INSERT INTO prest.curriculum (id_career, id_course) VALUES (3, 6);
INSERT INTO prest.curriculum (id_career, id_course) VALUES (3, 7);
INSERT INTO prest.curriculum (id_career, id_course) VALUES (3, 8);
INSERT INTO prest.curriculum (id_career, id_course) VALUES (3, 9);
INSERT INTO prest.curriculum (id_career, id_course) VALUES (3, 12);
-- Curriculum para Civil
INSERT INTO prest.curriculum (id_career, id_course) VALUES (4, 1);
INSERT INTO prest.curriculum (id_career, id_course) VALUES (4, 2);
INSERT INTO prest.curriculum (id_career, id_course) VALUES (4, 3);
INSERT INTO prest.curriculum (id_career, id_course) VALUES (4, 4);
INSERT INTO prest.curriculum (id_career, id_course) VALUES (4, 5);
INSERT INTO prest.curriculum (id_career, id_course) VALUES (4, 6);
INSERT INTO prest.curriculum (id_career, id_course) VALUES (4, 7);
INSERT INTO prest.curriculum (id_career, id_course) VALUES (4, 8);
INSERT INTO prest.curriculum (id_career, id_course) VALUES (4, 9);
INSERT INTO prest.curriculum (id_career, id_course) VALUES (4, 12);
-- Curriculum para Electrónica
INSERT INTO prest.curriculum (id_career, id_course) VALUES (5, 1);
INSERT INTO prest.curriculum (id_career, id_course) VALUES (5, 2);
INSERT INTO prest.curriculum (id_career, id_course) VALUES (5, 3);
INSERT INTO prest.curriculum (id_career, id_course) VALUES (5, 4);
INSERT INTO prest.curriculum (id_career, id_course) VALUES (5, 5);
INSERT INTO prest.curriculum (id_career, id_course) VALUES (5, 6);
INSERT INTO prest.curriculum (id_career, id_course) VALUES (5, 7);
INSERT INTO prest.curriculum (id_career, id_course) VALUES (5, 8);
INSERT INTO prest.curriculum (id_career, id_course) VALUES (5, 9);

----------------------------------------------------------------------------------------------
-- TODO: Reemplazar los puntos suspensivos por un hash generado por bcrypt con 10 salt rounds
----------------------------------------------------------------------------------------------
INSERT INTO prest.user (id_university, id_career, name, phone, email, password, active)
VALUES (1, 2, 'Anthony Gutiérrez', 900000001, 'anthony.gutierrez@pucp.pe',
	'$2b$10$5.u4kDdjTUaFts9XDCB5su6IKq9dJP/i0nW4xnzLK22OQSmDfRPEO', TRUE);

INSERT INTO prest.user (id_university, id_career, name, phone, email, password, active)
VALUES (1, 3, 'William Pérez', 900000002, 'wperezp@pucp.pe',
	'$2b$10$k2ZNvigWaltS4ldH2vjyUOR/VUNL9Rl/dWYPMwsgV1K43hrcigrku', TRUE);

INSERT INTO prest.user (id_university, id_career, name, phone, email, password, active)
VALUES (1, 1, 'Christian Oliva', 900000003, 'christian.oliva@pucp.pe',
	'$2b$10$W6JFODLLzgGnYb4/nMAYSuz6YRzm/nIVxaOl1t7MCsgr19ymBDkJi', TRUE);

INSERT INTO prest.user (id_university, id_career, name, phone, email, password, active)
VALUES (1, 4, 'Miguel Romero', 900000004, 'miguel.romero@pucp.pe',
	'$2b$10$7s0egBDjcWazhkQklb0fpesOnv.l9AQ440OY/V/SGNGw7xmQnrmri', TRUE);

-- Cursos que estudia Anthony
INSERT INTO prest.student_course (id_student, id_course) VALUES (561465857, 3);
INSERT INTO prest.student_course (id_student, id_course) VALUES (561465857, 7);
INSERT INTO prest.student_course (id_student, id_course) VALUES (561465857, 10);
-- Cursos que estudia William
INSERT INTO prest.student_course (id_student, id_course) VALUES (436885871, 4);
INSERT INTO prest.student_course (id_student, id_course) VALUES (436885871, 12);

-- Cursos que dicta William
INSERT INTO prest.teacher_course (id_teacher, id_course) VALUES (436885871, 1);
-- Cursos que dicta Miguel
INSERT INTO prest.teacher_course (id_teacher, id_course) VALUES (483424269, 6);
INSERT INTO prest.teacher_course (id_teacher, id_course) VALUES (483424269, 7);
INSERT INTO prest.teacher_course (id_teacher, id_course) VALUES (483424269, 8);
INSERT INTO prest.teacher_course (id_teacher, id_course) VALUES (483424269, 9);

-- Asesoría que dicta Miguel a Anthony
INSERT INTO prest.advisory (id_student, id_teacher, id_course, time_start, time_end)
VALUES (561465857, 483424269, 7, make_timestamptz(2018, 06, 22, 18, 0, 0),
	make_timestamptz(2018, 06, 22, 20, 0, 0));
INSERT INTO prest.advisory (id_student, id_teacher, id_course, time_start, time_end, confirmed, confirmed_time,
	calification) VALUES (561465857, 483424269, 7, make_timestamptz(2018, 06, 15, 17, 0, 0),
	make_timestamptz(2018, 06, 15, 19, 0, 0), TRUE, make_timestamptz(2018, 06, 12, 11, 30, 45), 4.5);

-- Tópicos de la asesoria que dicta Miguel a Anthony
INSERT INTO prest.advisory_topic (id_advisory, topic) VALUES (1, 'Movimiento rectilíneo uniforme');
INSERT INTO prest.advisory_topic (id_advisory, topic) VALUES (1, 'Caída libre');
INSERT INTO prest.advisory_topic (id_advisory, topic) VALUES (1, 'Movimiento parabólico');

-- Disponibilidad de Miguel
INSERT INTO prest.disponibility (id_teacher, id_course, day_of_week, hour_start, hour_end)
VALUES (483424269, 7, 6, make_time(17, 0, 0), make_time(22, 0, 0));

