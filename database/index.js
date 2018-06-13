const pg = require('pg');
require('dotenv').config()

const pool = new pg.Pool({
	user: process.env.DB_USER,
	database: 'prest',
	password: process.env.DB_PASS,
	port: 5432
});

module.exports = {
	query: (text, params, callback) => {
		return pool.query(text, params, callback);
	}
}
