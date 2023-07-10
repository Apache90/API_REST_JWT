// Importa la biblioteca bcrypt para el cifrado de contraseñas
const bcrypt = require("bcrypt");
// Importar el módulo de autenticación
const auth = require("../../auth");

const TABLA = "auth";
// Exportar una función que acepta una base de datos inyectada como parámetro
module.exports = function (dbInyectada) {
  // Variable para almacenar la base de datos
  let db = dbInyectada;
  // Si no se proporciona una base de datos, importar el módulo de base de datos MySQL
  if (!db) {
    db = require("../../DataBase/mysql");
  }

  // Función asincrónica para realizar el inicio de sesión
  async function login(usuario, password) {
    // Obtener los datos de autenticación del usuario desde la base de datos
    const data = await db.query(TABLA, { usuario: usuario });

    // Comparar la contraseña proporcionada con la contraseña almacenada en la base de datos
    return bcrypt.compare(password, data.password).then((result) => {
      if (result === true) {
        // Si las contraseñas coinciden, generar un token de autenticación
        return auth.asignarToken({ ...data });
      } else {
        // Si las contraseñas no coinciden, lanzar un error
        throw new Error("Informacion Invalidad");
      }
    });
  }

  // Función asincrónica para agregar datos de autenticación
  async function add(data) {
    console.log(data);
    const authData = {
      id: data.id,
    };

    // Si se proporciona un usuario, asignarlo a los datos de autenticación
    if (data.usuario) {
      authData.usuario = data.usuario;
    }

    // Si se proporciona una contraseña, cifrarla y asignarla a los datos de autenticación
    if (data.password) {
      authData.password = await bcrypt.hash(data.password.toString(), 2);
    }
    return db.add(TABLA, authData);
  }

  return {
    add,
    login,
  };
};
