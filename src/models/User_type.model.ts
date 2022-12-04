import { Sequelize, DataTypes } from 'sequelize';
import { User } from './User.model';

const sequelize = new Sequelize('sqlite::memory:');

export const UserType = sequelize.define('user_type', {
    type: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: 'user',
    },
});

UserType.hasMany(User);
