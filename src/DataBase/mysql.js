// Importa la biblioteca mysql y el archivo de configuración
const mysql = require("mysql");
const config = require("../config");

// Configuración de la base de datos
const dbconfig = {
  host: config.mysql.host,
  user: config.mysql.user,
  password: config.mysql.password,
  database: config.mysql.database,
};

let conexion;

// Función para establecer la conexión con la base de datos
function conMysql() {
  // Crea una conexión utilizando la configuración
  conexion = mysql.createConnection(dbconfig);

  // Intenta conectar a la base de datos
  conexion.connect((err) => {
    if (err) {
      console.log("[DB Error]", err);
      setTimeout(conMysql, 200);
    } else {
      console.log("[DB Conectada]");
    }
  });
  // Maneja los errores de conexión
  conexion.on("error", (err) => {
    console.log("[DB Error]", err);
    if (err.code === "PROTOCOL_CONNECTION_ERROR") {
      conMysql();
    } else {
      throw err;
    }
  });
}
// Establece la conexión a la base de datos
conMysql();

// Funciones para realizar consultas a la base de datos
// Obtener todos los registros de una tabla
function getAll(tabla) {
  return new Promise((resolve, reject) => {
    conexion.query(`SELECT * FROM ${tabla}`, (err, res) => {
      return err ? reject(err) : resolve(res);
    });
  });
}

// Obtener un registro de una tabla por su ID
function get(tabla, id) {
  return new Promise((resolve, reject) => {
    conexion.query(`SELECT * FROM ${tabla} WHERE id =${id}`, (err, res) => {
      return err ? reject(err) : resolve(res);
    });
  });
}

// Agregar un registro a una tabla
function add(tabla, data) {
  return new Promise((resolve, reject) => {
    conexion.query(
      `INSERT INTO ${tabla} SET ? ON DUPLICATE KEY UPDATE ?`,
      [data, data],
      (err, res) => {
        return err ? reject(err) : resolve(res);
      }
    );
  });
}

// Eliminar un registro de una tabla
function del(tabla, data) {
  return new Promise((resolve, reject) => {
    conexion.query(`DELETE FROM ${tabla} WHERE id = ?`, data.id, (err, res) => {
      return err ? reject(err) : resolve(res);
    });
  });
}

// Realizar una consulta personalizada a la base de datos
function query(tabla, consulta) {
  return new Promise((resolve, reject) => {
    conexion.query(`SELECT * FROM ${tabla} WHERE ?`, consulta, (err, res) => {
      return err ? reject(err) : resolve(res[0]);
    });
  });
}

module.exports = {
  getAll,
  get,
  add,
  del,
  query,
};
