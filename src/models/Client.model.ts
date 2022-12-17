import { Sequelize, DataTypes, INTEGER } from 'sequelize';

module.exports = (sequelize: any, Sequelize: any) => {
    const Client = sequelize.define('client', {
        name: {
            type: DataTypes.STRING,
            allowNull: false,
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

    return Client;
};
