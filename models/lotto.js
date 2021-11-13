var Sequelize = require('sequelize');

var Lotto = (sequelize, type) => {
  return sequelize.define('lottos', {
    id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
    },
    slug: Sequelize.STRING,
    uuid: Sequelize.STRING,
    name: Sequelize.STRING,
    day: Sequelize.STRING,
    startTime: Sequelize.STRING,
    endTime: Sequelize.STRING,
    type: Sequelize.STRING,
  })
}

module.exports = Lotto;