'use strict';
var uuid = require('node-uuid');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
    await queryInterface.bulkInsert('lottos', [
      {
        slug: "embassy",
        uuid: uuid(),
        name: "EMBASSY",
        day: "monday",
        startTime: "1:00",
        endTime: "9:45",
        type: "5/90",
      },
      {
        slug: "success",
        uuid: uuid(),
        name: "SUCCESS",
        day: "monday",
        startTime: "12:00",
        endTime: "15:00",
        type: "5/90",
      },
      {
        slug: "akwa_ibom",
        uuid: uuid(),
        name: "AKWA IBOM",
        day: "monday",
        startTime: "9:46",
        endTime: "11:59",
        type: "5/90",
      },
      {
        slug: "grandmaster",
        uuid: uuid(),
        name: "GRANDMASTER",
        day: "monday",
        startTime: "15:01",
        endTime: "22:00",
        type: "5/90",
      },
      {
        slug: "rambo",
        uuid: uuid(),
        name: "RAMBO",
        day: "tuesday",
        startTime: "1:00",
        endTime: "9:45",
        type: "5/90",
      },
      {
        slug: "dansaki",
        uuid: uuid(),
        name: "DANSAKI",
        day: "tuesday",
        startTime: "9:46",
        endTime: "11:59",
        type: "5/90",
      },
      {
        slug: "mega_77",
        uuid: uuid(),
        name: "MEGA 77",
        day: "tuesday",
        startTime: "12:00",
        endTime: "15:00",
        type: "5/90",
      },
      {
        slug: "trophy",
        uuid: uuid(),
        name: "TROPHY",
        day: "tuesday",
        startTime: "15:01",
        endTime: "22:00",
        type: "5/90",
      },
      {
        slug: "gold2",
        uuid: uuid(),
        name: "GOLD",
        day: "wednesday",
        startTime: "1:00",
        endTime: "9:45",
        type: "5/90",
      },
      {
        slug: "grandmaster2",
        uuid: uuid(),
        name: "GRANDMASTER",
        day: "wednesday",
        startTime: "9:46",
        endTime: "11:59",
        type: "5/90",
      },
      {
        slug: "royalvag",
        uuid: uuid(),
        name: "ROYALVAG",
        day: "wednesday",
        startTime: "12:00",
        endTime: "15:00",
        type: "5/90",
      },
      {
        slug: "royal_chance",
        uuid: uuid(),
        name: "ROYAL CHANCE",
        day: "wednesday",
        startTime: "15:01",
        endTime: "22:00",
        type: "5/90",
      },
      {
        slug: "metro",
        uuid: uuid(),
        name: "METRO",
        day: "thursday",
        startTime: "1:00",
        endTime: "9:45",
        type: "5/90",
      },
      {
        slug: "royal_a1",
        uuid: uuid(),
        name: "ROYAL A1",
        day: "thursday",
        startTime: "9:46",
        endTime: "11:59",
        type: "5/90",
      },
      {
        slug: "mega_visa",
        uuid: uuid(),
        name: "MEGA VISA",
        day: "thursday",
        startTime: "12:00",
        endTime: "15:00",
        type: "5/90",
      },
      {
        slug: "arena",
        uuid: uuid(),
        name: "ARENA",
        day: "thursday",
        startTime: "15:01",
        endTime: "22:00",
        type: "5/90",
      },
      {
        slug: "pay_day",
        uuid: uuid(),
        name: "PAY DAY",
        day: "friday",
        startTime: "1:00",
        endTime: "9:45",
        type: "5/90",
      },
      {
        slug: "royal_06",
        uuid: uuid(),
        name: "ROYAL 06",
        day: "friday",
        startTime: "9:46",
        endTime: "11:59",
        type: "5/90",
      },
      {
        slug: "trophy2",
        uuid: uuid(),
        name: "TROPHY",
        day: "friday",
        startTime: "12:00",
        endTime: "15:00",
        type: "5/90",
      },
      {
        slug: "havana",
        uuid: uuid(),
        name: "HAVANA",
        day: "friday",
        startTime: "15:01",
        endTime: "22:00",
        type: "5/90",
      },

      {
        slug: "gold2",
        uuid: uuid(),
        name: "GOLD",
        day: "saturday",
        startTime: "1:00",
        endTime: "9:45",
        type: "5/90",
      },
      {
        slug: "jarra",
        uuid: uuid(),
        name: "JARRA",
        day: "saturday",
        startTime: "9:46",
        endTime: "11:59",
        type: "5/90",
      },
      {
        slug: "platinum",
        uuid: uuid(),
        name: "PLATINUM",
        day: "saturday",
        startTime: "12:00",
        endTime: "15:00",
        type: "5/90",
      },
      {
        slug: "dansaki2",
        uuid: uuid(),
        name: "DANSAKI",
        day: "saturday",
        startTime: "15:01",
        endTime: "22:00",
        type: "5/90",
      },
      {
        slug: "arena2",
        uuid: uuid(),
        name: "ARENA",
        day: "sunday",
        startTime: "1:00",
        endTime: "13:00",
        type: "5/90",
      },
      {
        slug: "sunday_carnival",
        uuid: uuid(),
        name: "SUNDAY CARNIVAL",
        day: "sunday",
        startTime: "13:01",
        endTime: "16:00",
        type: "5/90",
      },
      {
        slug: "sunday_bonus",
        uuid: uuid(),
        name: "SUNDAY BONUS",
        day: "sunday",
        startTime: "16:01",
        endTime: "20:00",
        type: "5/90",
      },


    ], {});

  },
  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
     await queryInterface.bulkDelete('lottos', null, {});
  }
};



// 1. impliment user profile  --- deposite, transfer
// 2. 







