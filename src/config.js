// Importa el paquete dotenv para cargar variables de entorno desde un archivo .env
require('dotenv').config();

module.exports = {
    app:{
        port: process.env.PORT,
    },
    jwt:{
        secret: process.env.SECRET || 'notasectreta!'
    },
    mysql:{
        host: process.env.HOST,
        user: process.env.USER,
        password: process.env.PASS,
        database: process.env.DB
    }
}