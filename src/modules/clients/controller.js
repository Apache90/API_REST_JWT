const TABLA = "clientes";

// Función de fábrica que devuelve un objeto con funciones para interactuar con la tabla de clientes
module.exports = function (dbInyectada) {

  // Base de datos a utilizar (puede ser una inyección de dependencia o la base de datos por defecto)
  let db = dbInyectada;

  // Si no se proporciona una base de datos, se utiliza la base de datos por defecto
  if(!db){
    db = require("../../DataBase/mysql");
  }

  // Función para obtener todos los clientes de la tabla
  function getAll() {
    return db.getAll(TABLA);
  }

  // Función para obtener un cliente por su ID de la tabla
  function get(id) {
    return db.get(TABLA, id);
  }

  // Función para eliminar un cliente de la tabla
  function del(body) {
    return db.del(TABLA, body);
  }

  // Función para agregar un nuevo cliente a la tabla
  function add(body) {
    return db.add(TABLA, body);
  }

  return {
    getAll,
    get,
    add,
    del,
  };
};
