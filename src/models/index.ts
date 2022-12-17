const dbConfig = require('../config/db.config.js');

interface IDBObject {
    [key: string]: any;
}

const Sequelize = require('sequelize');
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
    host: dbConfig.HOST,
    dialect: dbConfig.dialect,
    operatorsAliases: 0,

    pool: {
        max: dbConfig.pool.max,
        min: dbConfig.pool.min,
        acquire: dbConfig.pool.acquire,
        idle: dbConfig.pool.idle,
    },
});

const db: IDBObject = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.userTypes = require('./User_type.model.js')(sequelize, Sequelize);
db.users = require('./User.model.js')(sequelize, Sequelize);
db.projectTypes = require('./Project_type.model.js')(sequelize, Sequelize);
db.projects = require('./Project.model.js')(sequelize, Sequelize);
db.countries = require('./Country.model.js')(sequelize, Sequelize);
db.clients = require('./Client.model.js')(sequelize, Sequelize);
db.client_projects = require('./Client_projects.model.js')(
    sequelize,
    Sequelize
);
db.project_users = require('./Project_users.model.js')(sequelize, Sequelize);

db.users.belongsTo(db.userTypes, {
    foreignKey: {
        name: 'userType',
        allowNull: false,
        defaultValue: 2,
    },
    targetKey: 'id',
    uniqueKey: 'user_type_fk',
});
db.userTypes.hasMany(db.users, {
    foreignKey: {
        name: 'userType',
        allowNull: false,
        defaultValue: 2,
    },
});
db.projects.belongsTo(db.projectTypes, {
    foreignKey: {
        name: 'projectType',
        allowNull: false,
        defaultValue: 2,
    },
    targetKey: 'id',
    uniqueKey: 'project_type_fk',
});
db.projectTypes.hasMany(db.projects, {
    foreignKey: {
        name: 'projectType',
        allowNull: false,
        defaultValue: 2,
    },
});
db.clients.belongsTo(db.countries, {
    foreignKey: {
        name: 'countryId',
        allowNull: false,
    },
    targetKey: 'id',
    uniqueKey: 'client_country_fk',
});
db.countries.hasMany(db.clients, {
    foreignKey: {
        name: 'countryId',
        allowNull: false,
        defaultValue: 2,
    },
});
db.projects.belongsToMany(db.clients, { through: db.client_projects });
db.clients.belongsToMany(db.projects, { through: db.client_projects });

db.projects.belongsToMany(db.users, { through: db.project_users });
db.users.belongsToMany(db.projects, { through: db.project_users });

module.exports = db;

// 'use strict';

// interface IDBObject {
//     [key: string]: any;
// }

// const fs = require('fs');
// const path = require('path');
// const Sequelize = require('sequelize');
// const processSeq: any = require('process');
// const basename = path.basename(__filename);
// const env = process.env.NODE_ENV || 'development';
// const config = require(__dirname + '/../config/database.js');
// const db: IDBObject = {};

// let sequelize: any;
// if (config.use_env_variable) {
//     sequelize = new Sequelize(process.env[config.use_env_variable], config);
// } else {
//     console.log(config);
//     sequelize = new Sequelize(
//         config.development.database,
//         config.development.username,
//         config.development.password,
//         {
//             host: config.development.host,
//             dialect: config.development.dialect,
//         }
//     );
// }

// fs.readdirSync(__dirname)
//     .filter((file: any) => {
//         return (
//             file.indexOf('.') !== 0 &&
//             file !== basename &&
//             file.slice(-3) === '.js'
//         );
//     })
//     .forEach((file: any) => {
//         console.log(file);
//         //let model = this.sequelize.import(path.join(__dirname, file));
//         const model = require(path.join(__dirname, file))(sequelize, Sequelize);
//         // const model = require(path.join(__dirname, file))(
//         //     sequelize,
//         //     Sequelize.DataTypes
//         // );
//         db[model.name] = model;
//     });

// Object.keys(db).forEach((modelName) => {
//     if (db[modelName].associate) {
//         db[modelName].associate(db);
//     }
// });

// db.sequelize = sequelize;
// db.Sequelize = Sequelize;

// console.log(db);

// module.exports = db;
