import { Sequelize, DataTypes } from 'sequelize';
//const User = require('./User.model');

module.exports = (sequelize: any, Sequelize: any) => {
  const ProjectType = sequelize.define(
    'project_type',
    {
      type: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      timestamps: false,
    }
  );

  return ProjectType;
};
