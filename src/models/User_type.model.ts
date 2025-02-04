import { Sequelize, DataTypes } from 'sequelize';
//const User = require('./User.model');

module.exports = (sequelize: any, Sequelize: any) => {
  const UserType = sequelize.define(
    'user_type',
    {
      type: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: 'user',
      },
    },
    {
      timestamps: false,
    }
  );

  return UserType;
};