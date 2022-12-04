'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        return queryInterface.bulkInsert('users', [
            {
                firstName: 'Claudiu',
                lastName: 'T',
                email: 'claudiu@example.com',
                typeId: 1,
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                firstName: 'Vlad',
                lastName: 'S',
                email: 'vlad@example.com',
                typeId: 2,
                createdAt: new Date(),
                updatedAt: new Date(),
            },
        ]);
    },
    async down(queryInterface, Sequelize) {
        return queryInterface.bulkDelete('users', null, {});
    },
};
