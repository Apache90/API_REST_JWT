// Importar los módulos necesarios
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const config = require('./config');
const clientes = require('./modules/clients/rutas');
const usuarios = require('./modules/users/rutas');
const auth = require('./modules/auth/rutas');
const error = require('./red/errors');

// Crear una aplicación Express
const app=express();

// Opciones de configuración de CORS
var corsOptions = {
    origin: '*', // Permitir solicitudes desde cualquier origen
    optionsSuccessStatus: 200 // Establecer el código de estado de éxito de las solicitudes CORS a 200
}

// Middleware de CORS para permitir solicitudes desde cualquier origen
app.use(cors(corsOptions));
// Middleware de registro de solicitudes
app.use(morgan('dev'));
// Middleware de análisis de cuerpos de solicitudes
app.use(express.json());
app.use(express.urlencoded({ extended: true}));

// Configuración de la aplicación
app.set('port',config.app.port);

// Rutas
app.use('/api/clientes',clientes)
app.use('/api/usuarios',usuarios)
app.use('/api/auth',auth)

// Middleware de manejo de errores
app.use(error); // Middleware para manejar y responder a errores en las solicitudes


module.exports = app;