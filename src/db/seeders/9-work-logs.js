'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.bulkInsert('work_logs', [
      {
        qty: 1,
        date: '2023-04-17',
        userId: 2,
        projectId: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        qty: 1.25,
        date: '2023-04-18',
        userId: 2,
        projectId: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        qty: 1.5,
        date: '2023-04-19',
        userId: 2,
        projectId: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  },
};