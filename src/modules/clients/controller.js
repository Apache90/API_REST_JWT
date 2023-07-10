const TABLA = "clientes";

module.exports = function (dbInyectada) {

  let db = dbInyectada;

  if(!db){
    db = require("../../DataBase/mysql");
  }

  function getAll() {
    return db.getAll(TABLA);
  }

  function get(id) {
    return db.get(TABLA, id);
  }

  function del(body) {
    return db.del(TABLA, body);
  }

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
