var Sequelize = require("sequelize")
var sequelize = require("../../db")

// Define the model
var User = sequelize.define(
  "user",
  {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    firstName: {
      type: Sequelize.STRING,
      field: "first_name"
    },
    lastName: {
      type: Sequelize.STRING,
      field: "last_name"
    },
    email: {
      type: Sequelize.STRING,
      field: "email"
    },
    image: {
      type: Sequelize.STRING,
      field: "image"
    }
  },
  {
    freezeTableName: true // Model tableName will be the same as the model name
  }
)

module.exports = User
