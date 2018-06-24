const pg = require('pg');
const pool = new pg.Pool({
	host: process.env.DB_HOST || 'localhost',
	user: process.env.DB_USER || 'prest',
	database: process.env.DB_NAME || 'prest',
	password: process.env.DB_PASS,
	port: process.env.DB_PORT || 5432
});

module.exports = {
	query: (text, params, callback) => {
		return pool.query(text, params, callback);
	},
	transaction: (next, callback, success) => {
		(async () => {
			const client = await pool.connect();
			try {
				await client.query('BEGIN');
				var result = callback(client);
				await client.query('COMMIT');
				return result;
			} catch (e) {
				await client.query('ROLLBACK');
				throw e;
			} finally {
				client.release();
			}
		})().then(result => {
			console.log('Transaction completed');
			success(result);
		}, err => {
			console.error(err.stack);
			next(err);
		}).catch(err => {
			console.error(err.stack);
			next(err);
		});
	}
}
