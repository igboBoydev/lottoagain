var Sequelize = require('sequelize');

var Setting = (sequelize, type) => {
  return sequelize.define('settings', {
    id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
    },
    type: Sequelize.STRING,
    value: Sequelize.STRING,
  })
}

module.exports = Setting;