'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('users', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      uuid: {
        allowNull: true,
        type: Sequelize.STRING
      },
      customer_id: {
        allowNull: true,
        type: Sequelize.STRING
      },
      firstname: {
        allowNull: true,
        type: Sequelize.STRING
      },
      lastname: {
        allowNull: true,
        type: Sequelize.STRING
      },
      email: {
        allowNull: false,
        type: Sequelize.STRING
      },
      mobile: {
        allowNull: true,
        type: Sequelize.STRING
      },
      password: {
        allowNull: false,
        type: Sequelize.STRING
      },
      activated: {
        allowNull: false,
        defaultValue: 0,
        type: Sequelize.INTEGER
      },
      address: {
        allowNull: true,
        type: Sequelize.STRING
      },
      last_login: {
        allowNull: true,
        type: Sequelize.STRING
      },
      otp: {
        allowNull: true,
        type: Sequelize.STRING
      },
      bvn: {
        allowNull: true,
        type: Sequelize.STRING
      },
      dob: {
        allowNull: true,
        type: Sequelize.STRING
      },
      wallet: {
        allowNull: false,
        defaultValue: 0.00,
        type: 'DECIMAL(12,2)'
      },
      bonus: {
        allowNull: false,
        defaultValue: 0.00,
        type: 'DECIMAL(12,2)'
      },
      withdrawable: {
        allowNull: false,
        defaultValue: 0.00,
        type: 'DECIMAL(12,2)'
      },
      pin: {
        allowNull: true,
        type: Sequelize.STRING
      },
      gender: {
        allowNull: true,
        type: Sequelize.STRING
      },
      bank_status: {
        allowNull: true,
        defaultValue: 0,
        type: Sequelize.INTEGER
      },
      profile_status: {
        allowNull: true,
        defaultValue: 0,
        type: Sequelize.INTEGER
      },
      kyc_status: {
        allowNull: true,
        defaultValue: 0,
        type: Sequelize.INTEGER
      },
      locked: {
        allowNull: true,
        defaultValue: 0,
        type: Sequelize.INTEGER
      },
      reference_id: {
        allowNull: true,
        type: Sequelize.STRING
      },
      voice: {
        allowNull: true,
        defaultValue: 0,
        type: Sequelize.INTEGER
      },
      id_type: {
        allowNull: true,
        type: Sequelize.STRING
      },
      id_number: {
        allowNull: true,
        type: Sequelize.STRING
      },
      id_url: {
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
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
        type: 'TIMESTAMP'
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('users');
  }
};