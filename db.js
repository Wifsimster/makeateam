var Sequelize = require('sequelize');
var config = require('./config');

var db = config.database;

var sequelize = new Sequelize(db.database, db.user, db.password, {
  host: db.host,
  dialect: 'mysql'
});

module.exports = sequelize;