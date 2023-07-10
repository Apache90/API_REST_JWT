const TABLA = "usuarios";
const auth = require("../auth/index");

// Exporta una función que acepta una base de datos inyectada como parámetro
module.exports = function (dbInyectada) {

  // Variable para almacenar la base de datos
  let db = dbInyectada;

  // Si no se proporciona una base de datos, importar el módulo de base de datos MySQL
  if (!db) {
    db = require("../../DataBase/mysql");
  }

  // Función para obtener todos los usuarios
  function getAll() {
    return db.getAll(TABLA);
  }

  // Función para obtener un usuario por su ID
  function get(id) {
    return db.get(TABLA, id);
  }

  // Función para eliminar un usuario
  function del(body) {
    return db.del(TABLA, body);
  }

  // Función asíncrona para agregar un usuario
  async function add(body) {
    // Crea un objeto de usuario con los campos requeridos
    const usuario = {
      id: body.id,
      nombre: body.nombre,
      activo: body.activo,
    };

    // Agregar el usuario a la tabla de usuarios y obtener la respuesta
    const response = await db.add(TABLA, usuario);
    console.log('response',response);

    var insertId = 0;
    if (body.id == 0) {
      insertId = response.insertId;
    } else {
      insertId = body.id;
    }
    var response2 = '';
    if (body.usuario || body.password) {
      // Si se proporciona un usuario y una contraseña, llamar a la función de autenticación para agregar el usuario
      response2 = await auth.add({
        id: insertId,
        usuario: body.usuario,
        password: body.password,
      });
    }
    // Devolver la respuesta de la autenticación
    return response2;
  }

  return {
    getAll,
    get,
    add,
    del,
  };
};
