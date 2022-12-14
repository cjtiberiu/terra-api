'use strict';
const bcrypt = require('bcrypt');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        return queryInterface.bulkInsert('users', [
            {
                firstName: 'Admin',
                lastName: 'Test',
                email: 'admin@genesis.com',
                password: bcrypt.hashSync('test', bcrypt.genSaltSync(10)),
                typeId: 1,
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                firstName: 'User',
                lastName: 'Test',
                email: 'user@genesis.com',
                password: bcrypt.hashSync('test', bcrypt.genSaltSync(10)),
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