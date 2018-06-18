----------------------------------------------------------------------------------------------
-- Por mientras se están usando seriales, para realizar un nexo más rápido entre las tablas.
-- En la práctica deberían usarse PKs random (especialmente en user) pero eso se hará después.
----------------------------------------------------------------------------------------------

-- CREATE DATABASE prest;
CREATE SCHEMA prest;
CREATE SCHEMA pucp;

CREATE TABLE prest.university(
	id_university SERIAL PRIMARY KEY,
	name VARCHAR NOT NULL,
	short_name VARCHAR NOT NULL,
	active BOOLEAN NOT NULL DEFAULT TRUE
);

CREATE TABLE prest.career(
	id_career SERIAL PRIMARY KEY,
	name VARCHAR NOT NULL,
	active BOOLEAN NOT NULL DEFAULT TRUE
);

CREATE TABLE pucp.user(
	id_user SERIAL PRIMARY KEY,
	name VARCHAR NOT NULL,
	email VARCHAR NOT NULL,
	password VARCHAR NOT NULL,
	active BOOLEAN NOT NULL DEFAULT FALSE
);

CREATE TABLE pucp.pending_user(
	id_user INTEGER REFERENCES pucp.user,
	token VARCHAR NOT NULL
);

CREATE TABLE pucp.course(
	id_course SERIAL PRIMARY KEY,
	name VARCHAR NOT NULL,
	code VARCHAR NOT NULL,
	active BOOLEAN NOT NULL DEFAULT TRUE
);

CREATE TABLE pucp.curriculum(
	id_career INTEGER REFERENCES prest.career(id_career),
	id_course INTEGER REFERENCES pucp.course(id_course),
	active BOOLEAN NOT NULL DEFAULT TRUE
);

CREATE TABLE pucp.student_course(
	id_student_course SERIAL PRIMARY KEY,
	id_student INTEGER REFERENCES pucp.user,
	id_course INTEGER REFERENCES pucp.course,
	active BOOLEAN NOT NULL DEFAULT TRUE
);

-- A PARTIR DE AQUI FALTA

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
