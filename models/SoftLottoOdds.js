const Sequelize = require('sequelize')

let SoftLottoOdds = (sequelize, type) => {
    return sequelize.define('SoftLottoOdds', {
        id: {
            type: Sequelize.INTEGER,
            allowNull: false,
            autoIncrement: true,
            primaryKey: true
        },
        admin_id: Sequelize.STRING,
        type: Sequelize.STRING,
        odds: Sequelize.STRING,
    })
}

module.exports = SoftLottoOdds


 

