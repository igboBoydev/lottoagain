var Sequelize = require('sequelize');

var Oauth = (sequelize, type) => {
  return sequelize.define('oauth', {
    no: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
    },
    id: Sequelize.INTEGER,
    email: Sequelize.TEXT,
    iat: Sequelize.INTEGER,
    exp: Sequelize.INTEGER,
  })
}

module.exports = Oauth;