import { Sequelize, DataTypes, INTEGER } from 'sequelize';

module.exports = (sequelize: any, Sequelize: any) => {
  const ClientProjects = sequelize.define('client_projects', {
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

  return ClientProjects;
};
