import { Sequelize, DataTypes } from 'sequelize';

module.exports = (sequelize: any, Sequelize: any) => {
  const WorkLog = sequelize.define('work_log', {
    qty: {
      allowNull: false,
      type: DataTypes.FLOAT(2)
    },
    date: {
      allowNull: false,
      type: DataTypes.DATEONLY
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

  return WorkLog;
};