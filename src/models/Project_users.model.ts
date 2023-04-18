import { Sequelize, DataTypes, INTEGER } from 'sequelize';

module.exports = (sequelize: any, Sequelize: any) => {
    const ProjectUsers = sequelize.define('project_users', {
        projectId: {
            type: DataTypes.INTEGER,
            references: {
                model: 'projects',
                key: 'id',
            },
            allowNull: false,
        },
        userId: {
            type: DataTypes.INTEGER,
            references: {
                model: 'users',
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

    return ProjectUsers;
};
