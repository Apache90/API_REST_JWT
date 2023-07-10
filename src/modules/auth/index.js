const db = require('../../DataBase/mysql');
const ctrl = require('./controller');

module.exports = ctrl(db);