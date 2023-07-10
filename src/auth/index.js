// La biblioteca "jsonwebtoken" permite generar y verificar tokens JWT
// De config traemos traemos la palabra secreta utilizada para firmar y verif los tokens
const jwt = require("jsonwebtoken");
config = require("../config");

const secret = config.jwt.secret;

function asignarToken(data) {
  return jwt.sign(data, secret);
}

function verificarToken(token) {
  return jwt.verify(token, secret);
}

const chequearToken = {
  confirmarToken: function (req, id) {
    const decodificado = decodificarCabecera(req);
  },
};

function obtenerToken(autorizacion) {
  if (!autorizacion) {
    throw new Error("No hay token");
  }

  if (autorizacion.indexOf("Bearer ") == -1) {
    throw new Error("Formato invalido");
  }
  let token = autorizacion.replace("Bearer ", "");
  return token;
}

function decodificarCabecera(req) {
  console.log(req.headers);
  const autorizacion = req.headers.authorization || "";
  const token = obtenerToken(autorizacion);
  const decodificado = verificarToken(token);

  req.user = decodificado;
  return decodificado;
}

module.exports = {
  asignarToken,
  chequearToken,
};

/*
Este código proporciona funciones para generar, verificar y decodificar tokens JWT,
así como funciones auxiliares para manejar encabezados de autorización en solicitudes HTTP. 
Estas funciones pueden ser utilizadas en un sistema de autenticación y autorización para proteger
rutas y recursos en una aplicación Node.js.
*/
