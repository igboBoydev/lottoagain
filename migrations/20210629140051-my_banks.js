'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */

     await queryInterface.createTable('my_banks', {
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
      uuid: {
        allowNull: true,
        type: Sequelize.STRING
      },
      account_number: {
        allowNull: true,
        type: Sequelize.STRING
      },
      account_name: {
        allowNull: true,
        type: Sequelize.STRING
      },
      bank_code: {
        allowNull: true,
        type: Sequelize.STRING
      },
      bank_name: {
        allowNull: true,
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
     await queryInterface.dropTable('my_banks');
  }
};
