import { Sequelize, DataTypes, INTEGER } from 'sequelize';

module.exports = (sequelize: any, Sequelize: any) => {
    const Client = sequelize.define('client_projects', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            allowNull: false,
        },
        clientId: {
            type: DataTypes.INTEGER,
            references: {
                model: 'clients',
                key: 'id',
            },
            allowNull: false,
        },
        projectId: {
            type: DataTypes.INTEGER,
            references: {
                model: 'projects',
                key: 'id',
            },
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
