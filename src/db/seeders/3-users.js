'use strict';
const bcrypt = require('bcrypt');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.bulkInsert('users', [
      {
        firstName: `${process.env.ADMIN_USER_FIRSTNAME}`,
        lastName: `${process.env.ADMIN_USER_LASTNAME}`,
        email: `${process.env.ADMIN_USER_EMAIL}`,
        password: bcrypt.hashSync(`${process.env.ADMIN_USER_PASSWORD}`, bcrypt.genSaltSync(10)),
        userType: 1,
        userRole: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },
  async down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete('users', null, {});
  },
};
