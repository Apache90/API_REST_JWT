//Función para enviar una respuesta de éxito en la API con un mensaje y un código de estado personalizados.
exports.succes = function (req, res, mensaje = '', status = 200){

    // Establecer el código de estado y enviar una respuesta con un objeto JSON indicando éxito
    res.status(status).send({
        error:false,
        status: status,
        body: mensaje
    });
} 

//Función para enviar una respuesta de error en la API con un mensaje y un código de estado personalizados.
exports.error = function (req, res, mensaje = 'Error Interno', status = 500){

    // Establecer el código de estado y enviar una respuesta con un objeto JSON indicando error
    res.status(status).send({
        error:true,
        status: status,
        body: mensaje
    });
} 