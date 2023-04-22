import { Sequelize, DataTypes } from 'sequelize';

module.exports = (sequelize: any, Sequelize: any) => {
  const UserRole = sequelize.define(
    'user_role',
    {
      role: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      timestamps: false,
    }
  );

  return UserRole;
};
