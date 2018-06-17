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
	},
	transaction: (texts, params) => {
		(async () => {
			const client = await pool.connect();
			try {
				await client.query('BEGIN');
				for (var i = 0; i < params.length; i++) {
					let queryText = (typeof texts === 'string') ? texts : texts[i];
					await client.query(queryText, params[i]);
				}
				await client.query('COMMIT');
			} catch (e) {
				await client.query('ROLLBACK');
				throw e
			} finally {
				client.release();
			}
		})().catch(e => {
			console.error(e.stack);
			throw e;
		});
	}
}
