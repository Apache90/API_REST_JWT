const express = require("express");
const response = require("../../red/response");
const controller = require("./index");

// Crea un enrutador Express
const router = express.Router();

// Define la ruta de login y asocia la función de controlador correspondiente
router.get('/login', login)

// Función asincrónica para manejar la autenticación de login
async function login(req, res, next) {
    try{
        // Llama al controlador para realizar la autenticación del login y obtener un token
        const token = await controller.login(req.body.usuario, req.body.password);
        response.succes(req,res,token,200);
    }catch(err){
        // Pasa el control al siguiente middleware de manejo de errores en caso de error
        next(err);
    }
}

module.exports = router;
