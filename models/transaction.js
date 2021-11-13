const Sequelize = require('sequelize')

let Transaction = (sequelize, type) => {
    return sequelize.define('Transaction', {
        id: {
            type: Sequelize.INTEGER,
            allowNull: false,
            autoIncrement: true,
            primaryKey: true
        },
        user_id: Sequelize.STRING,
        balance: Sequelize.FLOAT,
        amount: Sequelize.FLOAT,
        reference: Sequelize.STRING,
        type: Sequelize.STRING,
        status: Sequelize.STRING,
        description: Sequelize.STRING
    })
}

module.exports = Transaction


 

