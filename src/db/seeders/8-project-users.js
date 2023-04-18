'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        return queryInterface.bulkInsert('project_users', projectUsers);
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

let projectUsers = [
    {
        projectId: 1,
        userId: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
    },
    {
        projectId: 1,
        userId: 2,
        createdAt: new Date(),
        updatedAt: new Date(),
    },
    {
        projectId: 3,
        userId: 2,
        createdAt: new Date(),
        updatedAt: new Date(),
    },
];
