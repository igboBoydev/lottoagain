const Sequelize = require('sequelize')

let Bet = (sequelize, type) => {
    return sequelize.define('bets', {
        id: {
            type: Sequelize.INTEGER,
            allowNull: false,
            autoIncrement: true,
            primaryKey: true
        },
        user_id: Sequelize.STRING,
        bet_id: Sequelize.STRING,
        game_id: Sequelize.STRING,
        amount: Sequelize.FLOAT(12,2),
        type: Sequelize.STRING,
        kind: Sequelize.STRING,
        odd: Sequelize.FLOAT(12,2),
        line: Sequelize.INTEGER,
        min_possibleWinning: Sequelize.FLOAT(12,2),
        max_possibleWinning: Sequelize.FLOAT(12,2),
        possibleWinning: Sequelize.FLOAT,
        stakes: Sequelize.STRING,
        staked: Sequelize.STRING,
        //stakes1: Sequelize.STRING,
        stakes2: Sequelize.STRING,
        result: Sequelize.STRING,
        status: Sequelize.STRING
    });
}

module.exports = Bet;


 

