function error (mensaje, code){
    // Crea un nuevo objeto Error con el mensaje proporcionado
    let e = new Error(mensaje);
    // Si se proporciona un código de estado, asignarlo al objeto Error
    if(code){
        e.statusCode = code;
    }
    return e;
}

module.exports = error;