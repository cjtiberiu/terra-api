'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.bulkInsert('projects', [
      {
        name: 'cNetwork Dashboard',
        projectType: 1,
        clientId: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'cNetwork Internals',
        projectType: 1,
        clientId: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Furniture eCommerce Storefront',
        projectType: 2,
        clientId: 3,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Magazin Electronice',
        projectType: 2,
        clientId: 2,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Financial Dashboard',
        projectType: 2,
        clientId: 3,
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