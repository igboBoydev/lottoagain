const Sequelize = require('sequelize')

let GameResult = (sequelize, type) => {
    return sequelize.define('game_results', {
        id: {
            type: Sequelize.INTEGER,
            allowNull: false,
            autoIncrement: true,
            primaryKey: true
        },
        admin_id: Sequelize.STRING,
        gameId: Sequelize.STRING,
        type: Sequelize.STRING,
        result: Sequelize.STRING,
    })
}

module.exports = GameResult

