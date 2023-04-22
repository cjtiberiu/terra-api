import { Sequelize, DataTypes } from 'sequelize';

module.exports = (sequelize: any, Sequelize: any) => {
  const Country = sequelize.define(
    'country',
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      code: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      phone: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      currency: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      timestamps: false,
    }
  );

  return Country;
};
