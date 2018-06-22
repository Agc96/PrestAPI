----------------------------------------------------------------------------------------------
-- Esquema de base de datos Prest
----------------------------------------------------------------------------------------------

CREATE SCHEMA prest;

CREATE TABLE prest.university(
	id_university SERIAL PRIMARY KEY,
	name VARCHAR NOT NULL,
	short_name VARCHAR NOT NULL,
	active BOOLEAN NOT NULL DEFAULT TRUE
);

CREATE TABLE prest.career(
	id_career SERIAL PRIMARY KEY,
	id_university INTEGER NOT NULL REFERENCES prest.university,
	name VARCHAR NOT NULL,
	active BOOLEAN NOT NULL DEFAULT TRUE
);

CREATE TABLE prest.course(
	id_course SERIAL PRIMARY KEY,
	id_university INTEGER NOT NULL REFERENCES prest.university,
	name VARCHAR NOT NULL,
	code VARCHAR NOT NULL
);

CREATE TABLE prest.curriculum(
	id_career INTEGER NOT NULL REFERENCES prest.career,
	id_course INTEGER NOT NULL REFERENCES prest.course,
	active BOOLEAN NOT NULL DEFAULT TRUE
);

CREATE OR REPLACE FUNCTION pseudo_encrypt(BIGVALUE BIGINT) RETURNS INTEGER AS $$
DECLARE
value int;
l1 int;
l2 int;
r1 int;
r2 int;
i int:=0;
BEGIN
	value := CAST(BIGVALUE AS int);
	l1 := (value >> 16) & 65535;
	r1 := value & 65535;
	WHILE i < 3 LOOP
		l2 := r1;
		r2 := l1 # ((((1366 * r1 + 150889) % 714025) / 714025.0) * 32767)::int;
		l1 := l2;
		r1 := r2;
		i := i + 1;
	END LOOP;
	RETURN ((r1 << 16) + l1);
END;
$$ LANGUAGE plpgsql strict immutable;

CREATE SEQUENCE prest.user_sequence;

CREATE TABLE prest.user(
	id_user INTEGER PRIMARY KEY DEFAULT pseudo_encrypt(nextval('prest.user_sequence')),
	id_university INTEGER NOT NULL REFERENCES prest.university,
	name VARCHAR NOT NULL,
	phone NUMERIC UNIQUE NOT NULL,
	email VARCHAR UNIQUE NOT NULL,
	password VARCHAR NOT NULL,
	active BOOLEAN NOT NULL DEFAULT FALSE
);

CREATE TABLE prest.pending_user(
	id_user INTEGER NOT NULL REFERENCES prest.user,
	token VARCHAR NOT NULL
);

CREATE TABLE prest.student(
	id_student INTEGER PRIMARY KEY REFERENCES prest.user,
	id_career INTEGER NOT NULL REFERENCES prest.career,
	advisory_count INTEGER NOT NULL DEFAULT 0
);

CREATE TABLE prest.student_course(
	id_student INTEGER NOT NULL REFERENCES prest.student,
	id_course INTEGER NOT NULL REFERENCES prest.course,
	active BOOLEAN NOT NULL DEFAULT TRUE
);

CREATE TABLE prest.teacher(
	id_teacher INTEGER PRIMARY KEY REFERENCES prest.user,
	id_career INTEGER NOT NULL REFERENCES prest.career,
	payment_per_hour DECIMAL NOT NULL DEFAULT 0,
	advisory_count INTEGER NOT NULL DEFAULT 0,
	advisory_score DOUBLE PRECISION NOT NULL DEFAULT 0
);

CREATE TABLE prest.teacher_course(
	id_teacher INTEGER NOT NULL REFERENCES prest.teacher,
	id_course INTEGER NOT NULL REFERENCES prest.course,
	active BOOLEAN NOT NULL DEFAULT TRUE
);

CREATE TABLE prest.payment_method(
	id_payment_method SERIAL PRIMARY KEY,
	id_user INTEGER NOT NULL REFERENCES prest.user,
	card_number VARCHAR NOT NULL,
	expiration DATE NOT NULL,
	cvv INTEGER,
	active BOOLEAN NOT NULL DEFAULT TRUE
);

CREATE TABLE prest.advisory(
	id_advisory SERIAL PRIMARY KEY,
	id_student INTEGER NOT NULL REFERENCES prest.student,
	id_teacher INTEGER NOT NULL REFERENCES prest.teacher,
	id_course INTEGER NOT NULL REFERENCES prest.course,
	time_start TIMESTAMP WITH TIME ZONE NOT NULL,
	time_end TIMESTAMP WITH TIME ZONE NOT NULL,
	id_payment_method INTEGER REFERENCES prest.payment_method,
	payment DECIMAL NOT NULL,
	confirmed BOOLEAN,
	confirmed_time TIMESTAMP WITH TIME ZONE,
	score DOUBLE PRECISION
);

CREATE TABLE prest.advisory_topic(
	id_advisory INTEGER NOT NULL REFERENCES prest.advisory,
	topic VARCHAR NOT NULL
);

CREATE TABLE prest.disponibility(
	id_disponibility SERIAL PRIMARY KEY,
	id_teacher INTEGER NOT NULL REFERENCES prest.teacher,
	id_course INTEGER NOT NULL REFERENCES prest.course,
	day_of_week SMALLINT NOT NULL,
	hour_start TIME NOT NULL,
	hour_end TIME NOT NULL,
	active BOOLEAN NOT NULL DEFAULT TRUE
);

CREATE TABLE prest.chat(
	id_chat SERIAL PRIMARY KEY,
	id_student INTEGER NOT NULL REFERENCES prest.student,
	id_teacher INTEGER NOT NULL REFERENCES prest.teacher
);
