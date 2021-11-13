var Sequelize = require('sequelize');

var MyBank = (sequelize, type) => {
  return sequelize.define('my_banks', {
    id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
    },
    uuid: Sequelize.STRING,
    user_id: Sequelize.INTEGER,
    account_number: Sequelize.STRING,
    account_name: Sequelize.STRING,
    bank_code: Sequelize.STRING,
    bank_name: Sequelize.STRING,
  })
}

module.exports = MyBank;