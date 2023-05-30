'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.bulkInsert('clients', clients);
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

let clients = [
  {
    name: 'CNETWORK',
    vatPercentage: 19,
    countryId: 184,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    name: 'Client Romania 1',
    vatPercentage: 19,
    countryId: 184,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    name: 'Client USA 1',
    vatPercentage: 0,
    countryId: 239,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];
