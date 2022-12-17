import { Sequelize, DataTypes } from 'sequelize';

module.exports = (sequelize: any, Sequelize: any) => {
    const Project = sequelize.define('project', {
        name: {
            type: DataTypes.STRING,
            allowNull: false,
            as: 'FIRST_NAME',
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

    return Project;
};
