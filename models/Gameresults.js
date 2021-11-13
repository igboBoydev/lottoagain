const Sequelize = require('sequelize')

let Gameresults = (sequelize, type) => {
    return sequelize.define('Gameresults', {
        id: {
            type: Sequelize.INTEGER,
            allowNull: false,
            autoIncrement: true,
            primaryKey: true
        },
        admin_id: Sequelize.STRING,
        name: Sequelize.STRING,
        odds: Sequelize.STRING,
        dates: Sequelize.DATE,
    }, {
        timestamps: false
    })
}

module.exports = Gameresults


 

