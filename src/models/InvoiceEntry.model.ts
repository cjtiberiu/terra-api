import { Sequelize, DataTypes, INTEGER } from 'sequelize';

module.exports = (sequelize: any, Sequelize: any) => {
  const InvoiceEntry = sequelize.define('invoice_entry', {
    totalHours: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    pricePerHour: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false
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

  return InvoiceEntry;
};
