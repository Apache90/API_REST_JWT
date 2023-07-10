const response = require('./response');

//Función de middleware para manejar errores en la API.
function errors(err,req,res,next){
    console.error('[Error]',err);

    // Obtener el mensaje de error y el código de estado del objeto Error
    const mensaje = err.menssage || 'Error interno';
    const status = err.statusCode || 500;

    // Enviar una respuesta de error utilizando el módulo de respuesta personalizada
    response(err, req, message, status);
}

module.exports = errors;