'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */

    await queryInterface.createTable('bets', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      user_id: {
        allowNull: false,
        type:  Sequelize.INTEGER
      },
      bet_id: {
        allowNull: true,
        type: Sequelize.STRING
      },
      game_id: {
        allowNull: true,
        type: Sequelize.STRING
      },
      amount: {
        allowNull: true,
        defaultValue: 0,
        type: Sequelize.FLOAT(12,2)
      },
      type: {
        allowNull: true,
        type: Sequelize.STRING
      },
      kind: {
        allowNull: true,
        type: Sequelize.STRING
      },
      odd: {
        allowNull: true,
        defaultValue: 0,
        type: Sequelize.INTEGER
      },
      line: {
        allowNull: true,
        defaultValue: 0,
        type: Sequelize.INTEGER
      },
      possibleWinning: {
        allowNull: true,
        defaultValue: 0,
        type: Sequelize.FLOAT(12,2)
      },
      min_possibleWinning: {
        allowNull: true,
        defaultValue: 0,
        type: Sequelize.FLOAT(12,2)
      },
      max_possibleWinning: {
        allowNull: true,
        defaultValue: 0,
        type: Sequelize.FLOAT(12,2)
      },
      stakes: {
        allowNull: true,
        type: Sequelize.STRING
      },
      staked: {
        allowNull: true,
        type: Sequelize.STRING
      },
      stakes2: {
        allowNull: true,
        type: Sequelize.STRING
      },
      result: {
        allowNull: true,
        type: Sequelize.STRING
      },
      status: {
        allowNull: true,
        defaultValue: 'pending',
        type: Sequelize.STRING
      },

      createdAt: {
        type: 'TIMESTAMP',
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
        allowNull: false
      },
      updatedAt: {
        allowNull: true,
        type: 'TIMESTAMP',
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
      }
    });
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
     await queryInterface.dropTable('bets');
  }
};
