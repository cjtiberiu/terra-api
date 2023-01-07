'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        return queryInterface.bulkInsert('user_roles', [
            {
                role: 'Administrator',
            },
            {
                role: 'Frontend Developer',
            },
            {
                role: 'Backend Developer',
            },
            {
                role: 'Fullstack Developer',
            },
        ]);
    },

    async down(queryInterface, Sequelize) {
        return queryInterface.bulkDelete('user_roles', null, {});
    },
};
