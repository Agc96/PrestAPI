-------------------------------------
-- Datos para la base de datos Prest
-------------------------------------

INSERT INTO prest.university (name, short_name) VALUES ('Pontificia Universidad Católica del Perú', 'pucp');
INSERT INTO prest.university (name, short_name) VALUES ('Universidad Nacional Mayor de San Marcos', 'unmsm');
INSERT INTO prest.university (name, short_name) VALUES ('Universidad de Lima', 'ulima');

INSERT INTO prest.career (name) VALUES ('Ingeniería Industrial');
INSERT INTO prest.career (name) VALUES ('Ingeniería Informática');
INSERT INTO prest.career (name) VALUES ('Ingeniería Mecánica');
INSERT INTO prest.career (name) VALUES ('Ingeniería Civil');
INSERT INTO prest.career (name) VALUES ('Ingeniería Electrónica');

----------------------------------------------------------------------------------------------
-- TODO: Reemplazar los puntos suspensivos por un hash generado por bcrypt con 10 salt rounds
----------------------------------------------------------------------------------------------
INSERT INTO pucp.user (name, email, password, active) VALUES ('Anthony Gutiérrez', 'anthony.gutierrez@pucp.pe',
	'$2b$10$5.u4kDdjTUaFts9XDCB5su6IKq9dJP/i0nW4xnzLK22OQSmDfRPEO', TRUE);
INSERT INTO pucp.user (name, email, password, active) VALUES ('William Pérez', 'wperezp@pucp.pe',
	'$2b$10$k2ZNvigWaltS4ldH2vjyUOR/VUNL9Rl/dWYPMwsgV1K43hrcigrku', TRUE);
INSERT INTO pucp.user (name, email, password, active) VALUES ('Christian Oliva', 'christian.oliva@pucp.pe',
	'$2b$10$W6JFODLLzgGnYb4/nMAYSuz6YRzm/nIVxaOl1t7MCsgr19ymBDkJi', TRUE);
INSERT INTO pucp.user (name, email, password, active) VALUES ('Miguel Romero', 'miguel.romero@pucp.pe',
	'$2b$10$7s0egBDjcWazhkQklb0fpesOnv.l9AQ440OY/V/SGNGw7xmQnrmri', TRUE);

-- Cursos generales para Ingeniería
INSERT INTO pucp.course(name, code) VALUES ('Fundamentos de Cálculo', '1MAT05');
INSERT INTO pucp.course(name, code) VALUES ('Cálculo Diferencial', '1MAT06');
INSERT INTO pucp.course(name, code) VALUES ('Cálculo Integral', '1MAT07');
INSERT INTO pucp.course(name, code) VALUES ('Cálculo en Varias Variables', '1MAT08');
INSERT INTO pucp.course(name, code) VALUES ('Cálculo Aplicado', '1MAT09');
INSERT INTO pucp.course(name, code) VALUES ('Fundamentos de Física', '1FIS01');
INSERT INTO pucp.course(name, code) VALUES ('Física 1', '1FIS02');
INSERT INTO pucp.course(name, code) VALUES ('Física 2', '1FIS04');
INSERT INTO pucp.course(name, code) VALUES ('Física 3', '1FIS06');
-- Cursos que dependen de la carrera
INSERT INTO pucp.course(name, code) VALUES ('Técnicas de Programación', 'INF144'); -- 2, 2,10
INSERT INTO pucp.course(name, code) VALUES ('Mecánica para Ingenieros', 'ING134');
INSERT INTO pucp.course(name, code) VALUES ('Estática', 'ING135');

-- Curriculum para Industrial
INSERT INTO pucp.curriculum (id_career, id_course) VALUES (1, 1);
INSERT INTO pucp.curriculum (id_career, id_course) VALUES (1, 2);
INSERT INTO pucp.curriculum (id_career, id_course) VALUES (1, 3);
INSERT INTO pucp.curriculum (id_career, id_course) VALUES (1, 4);
INSERT INTO pucp.curriculum (id_career, id_course) VALUES (1, 5);
INSERT INTO pucp.curriculum (id_career, id_course) VALUES (1, 6);
INSERT INTO pucp.curriculum (id_career, id_course) VALUES (1, 7);
INSERT INTO pucp.curriculum (id_career, id_course) VALUES (1, 8);
INSERT INTO pucp.curriculum (id_career, id_course) VALUES (1, 9);
INSERT INTO pucp.curriculum (id_career, id_course) VALUES (1, 11);
-- Curriculum para Informática
INSERT INTO pucp.curriculum (id_career, id_course) VALUES (2, 1);
INSERT INTO pucp.curriculum (id_career, id_course) VALUES (2, 2);
INSERT INTO pucp.curriculum (id_career, id_course) VALUES (2, 3);
INSERT INTO pucp.curriculum (id_career, id_course) VALUES (2, 4);
INSERT INTO pucp.curriculum (id_career, id_course) VALUES (2, 5);
INSERT INTO pucp.curriculum (id_career, id_course) VALUES (2, 6);
INSERT INTO pucp.curriculum (id_career, id_course) VALUES (2, 7);
INSERT INTO pucp.curriculum (id_career, id_course) VALUES (2, 8);
INSERT INTO pucp.curriculum (id_career, id_course) VALUES (2, 9);
INSERT INTO pucp.curriculum (id_career, id_course) VALUES (2, 10);
-- Curriculum para Mecánica
INSERT INTO pucp.curriculum (id_career, id_course) VALUES (3, 1);
INSERT INTO pucp.curriculum (id_career, id_course) VALUES (3, 2);
INSERT INTO pucp.curriculum (id_career, id_course) VALUES (3, 3);
INSERT INTO pucp.curriculum (id_career, id_course) VALUES (3, 4);
INSERT INTO pucp.curriculum (id_career, id_course) VALUES (3, 5);
INSERT INTO pucp.curriculum (id_career, id_course) VALUES (3, 6);
INSERT INTO pucp.curriculum (id_career, id_course) VALUES (3, 7);
INSERT INTO pucp.curriculum (id_career, id_course) VALUES (3, 8);
INSERT INTO pucp.curriculum (id_career, id_course) VALUES (3, 9);
INSERT INTO pucp.curriculum (id_career, id_course) VALUES (3, 12);
-- Curriculum para Civil
INSERT INTO pucp.curriculum (id_career, id_course) VALUES (4, 1);
INSERT INTO pucp.curriculum (id_career, id_course) VALUES (4, 2);
INSERT INTO pucp.curriculum (id_career, id_course) VALUES (4, 3);
INSERT INTO pucp.curriculum (id_career, id_course) VALUES (4, 4);
INSERT INTO pucp.curriculum (id_career, id_course) VALUES (4, 5);
INSERT INTO pucp.curriculum (id_career, id_course) VALUES (4, 6);
INSERT INTO pucp.curriculum (id_career, id_course) VALUES (4, 7);
INSERT INTO pucp.curriculum (id_career, id_course) VALUES (4, 8);
INSERT INTO pucp.curriculum (id_career, id_course) VALUES (4, 9);
INSERT INTO pucp.curriculum (id_career, id_course) VALUES (4, 12);
-- Curriculum para Electrónica
INSERT INTO pucp.curriculum (id_career, id_course) VALUES (5, 1);
INSERT INTO pucp.curriculum (id_career, id_course) VALUES (5, 2);
INSERT INTO pucp.curriculum (id_career, id_course) VALUES (5, 3);
INSERT INTO pucp.curriculum (id_career, id_course) VALUES (5, 4);
INSERT INTO pucp.curriculum (id_career, id_course) VALUES (5, 5);
INSERT INTO pucp.curriculum (id_career, id_course) VALUES (5, 6);
INSERT INTO pucp.curriculum (id_career, id_course) VALUES (5, 7);
INSERT INTO pucp.curriculum (id_career, id_course) VALUES (5, 8);
INSERT INTO pucp.curriculum (id_career, id_course) VALUES (5, 9);

-- Cursos que estudia Anthony
INSERT INTO pucp.student_course (id_student, id_course) VALUES (1, 3);
INSERT INTO pucp.student_course (id_student, id_course) VALUES (1, 7);
INSERT INTO pucp.student_course (id_student, id_course) VALUES (1, 10);
-- Cursos que estudia William
INSERT INTO pucp.student_course (id_student, id_course) VALUES (2, 4);
INSERT INTO pucp.student_course (id_student, id_course) VALUES (2, 12);

-- Cursos que dicta William
INSERT INTO pucp.teacher_course (id_teacher, id_course) VALUES (2, 1);
-- Cursos que dicta Miguel
INSERT INTO pucp.teacher_course (id_teacher, id_course) VALUES (4, 6);
INSERT INTO pucp.teacher_course (id_teacher, id_course) VALUES (4, 7);
INSERT INTO pucp.teacher_course (id_teacher, id_course) VALUES (4, 8);
INSERT INTO pucp.teacher_course (id_teacher, id_course) VALUES (4, 9);
