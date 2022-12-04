import { Sequelize, DataTypes } from 'sequelize';
import { UserType } from './User_type.model';

const sequelize = new Sequelize('sqlite::memory:');

export const User = sequelize.define('user', {
    firstName: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    lastName: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    typeId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 2,
        unique: true,
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

User.belongsTo(UserType);
