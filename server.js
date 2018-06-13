const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

// const pg = require('pg');
// const connectionString = process.env.DATABASE_URL || 'postgres://localhost:5432/prest';

const routes = require('./routes');
routes(app);

app.listen(port);

console.log('Prest RESTful API server started on port ' + port);
