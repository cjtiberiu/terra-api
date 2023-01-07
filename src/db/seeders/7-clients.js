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
        name: 'Client Romania',
        countryId: 184,
        createdAt: new Date(),
        updatedAt: new Date(),
    },
    {
        name: 'Client USA',
        countryId: 239,
        createdAt: new Date(),
        updatedAt: new Date(),
    },
];
