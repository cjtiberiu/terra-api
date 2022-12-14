import { Sequelize, DataTypes } from 'sequelize';

module.exports = (sequelize: any, Sequelize: any) => {
    const User = sequelize.define('user', {
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
        // typeId: {
        //     type: DataTypes.INTEGER,
        //     allowNull: false,
        //     defaultValue: 2,
        //     unique: true,
        //     references: {
        //         model: 'user_types',
        //         key: 'id',
        //     },
        // },
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

    return User;
};

// const sequelize = new Sequelize('sqlite::memory:');

// export const User = sequelize.define('user', {
//     firstName: {
//         type: DataTypes.STRING,
//         allowNull: false,
//     },
//     lastName: {
//         type: DataTypes.STRING,
//         allowNull: false,
//     },
//     email: {
//         type: DataTypes.STRING,
//         allowNull: false,
//     },
//     password: {
//         type: DataTypes.STRING,
//         allowNull: false,
//     },
//     typeId: {
//         type: DataTypes.INTEGER,
//         allowNull: false,
//         defaultValue: 2,
//         unique: true,
//         references: {
//             model: UserType,
//             key: 'id',
//         },
//     },
//     createdAt: {
//         allowNull: false,
//         type: DataTypes.DATE,
//         defaultValue: Sequelize.literal('NOW()'),
//     },
//     updatedAt: {
//         allowNull: false,
//         type: DataTypes.DATE,
//         defaultValue: Sequelize.literal('NOW()'),
//     },
// });

// User.belongsTo(UserType);
// UserType.hasMany(User);

// module.exports = User;
