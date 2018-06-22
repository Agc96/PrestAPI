const db = require('../database');

const directory = {
	root: __dirname + '/../views'
}

module.exports = {
	confirm: (req, res, next) => {
		// Verificar que se tengan todos los datos
		const token = req.query.token;
		if (!token) return res.status(404).sendFile('404.html', directory);
		// Ejecutar el update
		db.transaction((err) => {
			res.status(404).sendFile('404.html', directory);
		}, async (client) => {
			const result = await client.query(`UPDATE prest.user SET active = TRUE WHERE id_user IN
					(SELECT id_user FROM prest.pending_user WHERE token = $1)`, [token]);
			return result.rowCount;
		}, (result) => {
			if (result > 0) res.status(200).sendFile('confirmed.html', directory);
			else res.status(404).sendFile('404.html', directory);
		});
	},
	styles: (req, res, next) => {
		res.sendFile('styles.css', directory);
	},
	logo: (req, res, next) => {
		res.sendFile('logo-font.ttf', directory);
	},
	check: (req, res, next) => {
		res.sendFile('check.svg', directory);
	}
}
