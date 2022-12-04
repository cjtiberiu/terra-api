'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('user_types', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER,
            },
            type: {
                type: Sequelize.STRING,
                allowNull: false,
                defaultValue: 'user',
            },
        });
    },
    async down(queryInterface, Sequelize) {
        await queryInterface.dropTable('user_types');
    },
};
