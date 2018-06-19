const pg = require('pg');
const pool = new pg.Pool({
	host: process.env.DB_HOST || 'localhost',
	user: process.env.DB_USER || 'prest',
	database: process.env.DB_NAME || 'prest',
	password: process.env.DB_PASS,
	port: process.env.DB_PORT || 5432
});

const crypto = require("crypto");
const randomString = function (length) {
	return crypto.randomBytes(length || 32).toString('hex');
}

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
				throw e;
			} finally {
				client.release();
			}
		})().catch(err => {
			console.error(err.stack);
			throw err;
		});
	},
	user: (params, next, callback) => {
		(async () => {
			const client = await pool.connect();
			try {
				await client.query('BEGIN');
				const id_user = await client.query(`INSERT INTO pucp.user (name, email, password)
					VALUES ($1, $2, $3) RETURNING id_user`, params);
				const token = randomString();
				await client.query(`INSERT INTO pucp.pending_user (id_user, token) VALUES ($1, $2)`,
					[id_user, token]);
				await client.query('COMMIT');
				callback(token);
			} catch (e) {
				await client.query('ROLLBACK');
				throw e
			} finally {
				client.release();
			}
		}).catch(err => {
			console.error(err.stack);
			next(err);
		});
	}
}
