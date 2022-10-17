const express = require('express');
const app = express();
const cors = require('cors');

const errorHandler = require('./middleware/error-handler');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

// api routes
app.use('/usuarios', require('./controllers/usuarios.controller'));
app.use('/conveniados', require('./controllers/conveniados.controller'));

// global error handler
app.use(errorHandler);

module.exports = app;