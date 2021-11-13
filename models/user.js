var Sequelize = require('sequelize');

var User = (sequelize, type) => {
  return sequelize.define('users', {
    id: {
      type: Sequelize.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true
    },
    uuid: Sequelize.STRING,
    firstname: Sequelize.STRING,
    lastname: Sequelize.STRING,
    customer_id: Sequelize.INTEGER,
    email: Sequelize.STRING,
    mobile: Sequelize.STRING,
    password: Sequelize.STRING,
    activated: Sequelize.INTEGER,
    address: Sequelize.STRING,
    last_login: Sequelize.STRING,
    otp: Sequelize.STRING,
    bvn: Sequelize.STRING,
    dob: Sequelize.STRING,
    wallet: Sequelize.DOUBLE,
    bonus: Sequelize.DOUBLE,
    withdrawable: Sequelize.DOUBLE,
    pin: Sequelize.STRING,
    gender: Sequelize.STRING,
    bank_status: Sequelize.INTEGER,
    locked: Sequelize.INTEGER,
    profile_status: Sequelize.INTEGER,
    kyc_status: Sequelize.INTEGER,
    id_type: Sequelize.STRING,
    id_number: Sequelize.STRING,
    id_url: Sequelize.STRING,
    voice: Sequelize.INTEGER,
    reference_id: Sequelize.STRING,
  })
}

module.exports = User;