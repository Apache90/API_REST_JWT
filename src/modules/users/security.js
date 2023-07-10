// Importa el módulo de autenticación
const auth = require('../../auth')

// Exporta una función que devuelve el middleware de autenticación
module.exports = function chequearAuth(){
    // Función de middleware que se ejecuta en cada solicitud
    function middleware(req, res, next){

        // Utiliza el método confirmarToken del módulo de autenticación para verificar y confirmar el token en la solicitud
        auth.chequearToken.confirmarToken(req)
        // Pasa al siguiente middleware o controlador en la cadena de manejo de solicitudes
        next();
    }

    return middleware
}