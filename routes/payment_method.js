const db = require('../database')

module.exports = {
	get: (req, res, next) => {
		// Verificar los datos ingresados
		const id_user = parseInt(req.params.id_user);
		if (isNaN(id_user)) return next();
		// Ejecutar el query
		db.query(`SELECT id_payment_method, card_number, expiration, cvv FROM prest.payment_method
					WHERE id_user = $1 AND active = TRUE`, [id_user], (err, result) => {
			if (err) return next(err);
			res.status(200).send(result.rows);
		});
	},
	set: (req, res, next) => {
		// Verificar los datos ingresados
		const card_number = req.query.card_number;
		if (!card_number) return next();
		const expiration = req.query.expiration;
		if (!expiration) return next();
		const cvv = req.query.cvv || null;
		// Ejecutar la transacción
		db.transaction(next, async (client) => {
			await client.query(`INSERT INTO prest.payment_method (card_number, expiration, cvv)
				VALUES ($1, $2, $3)`, [card_number, expiration, cvv]);
		}, (result) => {
			res.status(200).send('OK');
		});
	},
	delete: (req, res, next) => {
		// Verificar los datos ingresados
		const id_user = parseInt(req.params.id_user);
		if (isNaN(id_user)) return next();
		const id_payment_method = parseInt(req.params.id_payment_method);
		if (isNaN(id_payment_method)) return next();
		// Ejecutar la transacción
		db.transaction(next, async (client) => {
			await client.query(`UPDATE prest.payment_method SET active = FALSE
				WHERE id_user = $1 AND id_payment_method = $2`, [id_user, id_payment_method]);
		}, (result) => {
			res.status(200).send('OK');
		});
	}
}
