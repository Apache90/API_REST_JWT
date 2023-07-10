const response = require('./response');

function errors(err,req,res,next){
    console.error('[Error]',err);

    const mensaje = err.menssage || 'Error interno';
    const status = err.statusCode || 500;

    response(err, req, message, status);
}

module.exports = errors;