import { Sequelize, DataTypes } from 'sequelize';

module.exports = (sequelize: any, Sequelize: any) => {
    const User = sequelize.define('user', {
        firstName: {
            type: DataTypes.STRING,
            allowNull: false,
            as: 'FIRST_NAME',
        },
        lastName: {
            type: DataTypes.STRING,
            allowNull: false,
            as: 'LAST_NAME',
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            as: 'EMAIL',
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
            as: 'PASSWORD',
        },
        contractStartDate: {
            type: DataTypes.DATE,
            allowNull: true,
            as: 'CONTACT_START_DATE',
        },
        contractEndDate: {
            type: DataTypes.DATE,
            allowNull: true,
            as: 'CONTRACT_END_DATE',
        },
        createdAt: {
            allowNull: false,
            type: DataTypes.DATE,
            defaultValue: Sequelize.literal('NOW()'),
        },
        updatedAt: {
            allowNull: false,
            type: DataTypes.DATE,
            defaultValue: Sequelize.literal('NOW()'),
        },
    });

    return User;
};