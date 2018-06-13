-- CREATE DATABASE prest;

CREATE SCHEMA prest;
CREATE SCHEMA pucp;

CREATE TABLE prest.university(
	id_university SERIAL PRIMARY KEY,
	name VARCHAR NOT NULL,
	short_name VARCHAR NOT NULL,
	active BOOLEAN NOT NULL DEFAULT TRUE
);

INSERT INTO prest.university (name, short_name) VALUES ('Pontificia Universidad Católica del Perú', 'pucp');
INSERT INTO prest.university (name, short_name) VALUES ('Universidad Nacional Mayor de San Marcos', 'unmsm');
INSERT INTO prest.university (name, short_name) VALUES ('Universidad de Lima', 'ulima');

CREATE TABLE pucp.user(
	id_user SERIAL PRIMARY KEY,
	name VARCHAR NOT NULL,
	email VARCHAR NOT NULL,
	password VARCHAR NOT NULL,
	active BOOLEAN NOT NULL DEFAULT TRUE
);

CREATE TABLE prest.career(
	id_career SERIAL PRIMARY KEY,
	name VARCHAR NOT NULL,
	active BOOLEAN NOT NULL DEFAULT TRUE
);

INSERT INTO prest.career (name) VALUES ('Ingeniería Industrial');
INSERT INTO prest.career (name) VALUES ('Ingeniería Informática');
INSERT INTO prest.career (name) VALUES ('Ingeniería Mecánica');
INSERT INTO prest.career (name) VALUES ('Ingeniería Civil');
INSERT INTO prest.career (name) VALUES ('Ingeniería Electrónica');

CREATE TABLE pucp.course(
	id_course SERIAL PRIMARY KEY,
	name VARCHAR NOT NULL,
	code VARCHAR NOT NULL,
	active BOOLEAN NOT NULL DEFAULT TRUE
);

-- Primeros 9 cursos
INSERT INTO pucp.course(name, code) VALUES ('Fundamentos de Cálculo', '1MAT05');
INSERT INTO pucp.course(name, code) VALUES ('Cálculo Diferencial', '1MAT06');
INSERT INTO pucp.course(name, code) VALUES ('Cálculo Integral', '1MAT07');
INSERT INTO pucp.course(name, code) VALUES ('Cálculo en Varias Variables', '1MAT08');
INSERT INTO pucp.course(name, code) VALUES ('Cálculo Aplicado', '1MAT09');
INSERT INTO pucp.course(name, code) VALUES ('Fundamentos de Física', '1FIS01');
INSERT INTO pucp.course(name, code) VALUES ('Física 1', '1FIS02');
INSERT INTO pucp.course(name, code) VALUES ('Física 2', '1FIS04');
INSERT INTO pucp.course(name, code) VALUES ('Física 3', '1FIS06');
-- Cursos 10, 11, 12
INSERT INTO pucp.course(name, code) VALUES ('Técnicas de Programación', 'INF144');
INSERT INTO pucp.course(name, code) VALUES ('Mecánica para Ingenieros', 'ING134');
INSERT INTO pucp.course(name, code) VALUES ('Estática', 'ING135');

CREATE TABLE pucp.curriculum(
	id_career INTEGER REFERENCES prest.career(id_career),
	id_course INTEGER REFERENCES pucp.course(id_course),
	active BOOLEAN NOT NULL DEFAULT TRUE
);

INSERT INTO pucp.curriculum (id_career, id_course) VALUES (1, 1);
INSERT INTO pucp.curriculum (id_career, id_course) VALUES (1, 2);
INSERT INTO pucp.curriculum (id_career, id_course) VALUES (1, 3);
INSERT INTO pucp.curriculum (id_career, id_course) VALUES (1, 4);
INSERT INTO pucp.curriculum (id_career, id_course) VALUES (1, 5);
INSERT INTO pucp.curriculum (id_career, id_course) VALUES (1, 6);
INSERT INTO pucp.curriculum (id_career, id_course) VALUES (1, 7);
INSERT INTO pucp.curriculum (id_career, id_course) VALUES (1, 8);
INSERT INTO pucp.curriculum (id_career, id_course) VALUES (1, 9);

INSERT INTO pucp.curriculum (id_career, id_course) VALUES (2, 1);
INSERT INTO pucp.curriculum (id_career, id_course) VALUES (2, 2);
INSERT INTO pucp.curriculum (id_career, id_course) VALUES (2, 3);
INSERT INTO pucp.curriculum (id_career, id_course) VALUES (2, 4);
INSERT INTO pucp.curriculum (id_career, id_course) VALUES (2, 5);
INSERT INTO pucp.curriculum (id_career, id_course) VALUES (2, 6);
INSERT INTO pucp.curriculum (id_career, id_course) VALUES (2, 7);
INSERT INTO pucp.curriculum (id_career, id_course) VALUES (2, 8);
INSERT INTO pucp.curriculum (id_career, id_course) VALUES (2, 9);

INSERT INTO pucp.curriculum (id_career, id_course) VALUES (3, 1);
INSERT INTO pucp.curriculum (id_career, id_course) VALUES (3, 2);
INSERT INTO pucp.curriculum (id_career, id_course) VALUES (3, 3);
INSERT INTO pucp.curriculum (id_career, id_course) VALUES (3, 4);
INSERT INTO pucp.curriculum (id_career, id_course) VALUES (3, 5);
INSERT INTO pucp.curriculum (id_career, id_course) VALUES (3, 6);
INSERT INTO pucp.curriculum (id_career, id_course) VALUES (3, 7);
INSERT INTO pucp.curriculum (id_career, id_course) VALUES (3, 8);
INSERT INTO pucp.curriculum (id_career, id_course) VALUES (3, 9);

INSERT INTO pucp.curriculum (id_career, id_course) VALUES (4, 1);
INSERT INTO pucp.curriculum (id_career, id_course) VALUES (4, 2);
INSERT INTO pucp.curriculum (id_career, id_course) VALUES (4, 3);
INSERT INTO pucp.curriculum (id_career, id_course) VALUES (4, 4);
INSERT INTO pucp.curriculum (id_career, id_course) VALUES (4, 5);
INSERT INTO pucp.curriculum (id_career, id_course) VALUES (4, 6);
INSERT INTO pucp.curriculum (id_career, id_course) VALUES (4, 7);
INSERT INTO pucp.curriculum (id_career, id_course) VALUES (4, 8);
INSERT INTO pucp.curriculum (id_career, id_course) VALUES (4, 9);

INSERT INTO pucp.curriculum (id_career, id_course) VALUES (5, 1);
INSERT INTO pucp.curriculum (id_career, id_course) VALUES (5, 2);
INSERT INTO pucp.curriculum (id_career, id_course) VALUES (5, 3);
INSERT INTO pucp.curriculum (id_career, id_course) VALUES (5, 4);
INSERT INTO pucp.curriculum (id_career, id_course) VALUES (5, 5);
INSERT INTO pucp.curriculum (id_career, id_course) VALUES (5, 6);
INSERT INTO pucp.curriculum (id_career, id_course) VALUES (5, 7);
INSERT INTO pucp.curriculum (id_career, id_course) VALUES (5, 8);
INSERT INTO pucp.curriculum (id_career, id_course) VALUES (5, 9);

INSERT INTO pucp.curriculum(id_career, id_course) VALUES (1, 11);
INSERT INTO pucp.curriculum(id_career, id_course) VALUES (2, 10);
INSERT INTO pucp.curriculum(id_career, id_course) VALUES (3, 12);
INSERT INTO pucp.curriculum(id_career, id_course) VALUES (4, 12);

CREATE TABLE pucp.student_course(
	id_student_course SERIAL PRIMARY KEY,
	id_student INTEGER REFERENCES pucp.user,
	id_course INTEGER REFERENCES pucp.course,
	active BOOLEAN NOT NULL DEFAULT TRUE
);

-- TODO

CREATE TABLE pucp.teacher_course(
	id_teacher_course SERIAL PRIMARY KEY,
	id_teacher INTEGER REFERENCES pucp.user,
	id_course INTEGER REFERENCES pucp.course,
	active BOOLEAN NOT NULL DEFAULT TRUE
);

-- TODO

CREATE TABLE pucp.advisory(
	id_advisory SERIAL PRIMARY KEY,
	id_student INTEGER REFERENCES pucp.user,
	id_teacher INTEGER REFERENCES pucp.user,
	id_course INTEGER REFERENCES pucp.course,
	time_start TIMESTAMP NOT NULL,
	time_end TIME NOT NULL,
	confirmed_request BOOLEAN,
	confirmed_student BOOLEAN,
	confirmed_teacher BOOLEAN
);

-- TODO

CREATE TABLE pucp.chat(
	id_chat SERIAL PRIMARY KEY,
	id_student INTEGER REFERENCES pucp.user,
	id_teacher INTEGER REFERENCES pucp.user
);

-- TODO

CREATE TABLE pucp.message(
	id_message SERIAL PRIMARY KEY,
	id_chat INTEGER REFERENCES pucp.chat,
	id_user INTEGER REFERENCES pucp.user,
	message VARCHAR NOT NULL,
	created_at TIMESTAMP NOT NULL
);

-- TODO

CREATE TABLE pucp.message_file(
	id_message INTEGER REFERENCES pucp.message,
	file BYTEA NOT NULL
);

-- TODO

CREATE TABLE pucp.message_location(
	id_message INTEGER REFERENCES pucp.message,
	latitude DOUBLE PRECISION NOT NULL,
	longitude DOUBLE PRECISION NOT NULL
);

-- TODO
