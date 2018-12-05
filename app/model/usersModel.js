var Sequelize =  require('sequelize');
const dbConfig = require('../db/dbConfig');
const notNull = true;

const users = dbConfig.define('users',{
    user_id:{
        type: Sequelize.STRING(20),
        primaryKey: true,
        validate:{
            notEmpty: true,
        }
    },
    user_pass:{
        type: Sequelize.STRING(150),
        validate:{
            notEmpty: true,
        }
    },
    user_name:{
        type: Sequelize.STRING(20),
        notNull,
        validate:{
            notEmpty: true,
        }
    },
    generation:{
        type: Sequelize.SMALLINT,
        notNull,
    },
    gender:{
        type: Sequelize.ENUM('男性','女性'),
        notNull,
    },
    comment:{
        type: Sequelize.TEXT,
    },
    user_icon:{
        type: Sequelize.TEXT,
    },
    user_header:{
        type: Sequelize.TEXT,
    },
},{
    timestamp: false,
    freezeTableName: true,
    defaultScope: {
        attributes: {
            exclude: ['user_pass'],
        },
    },
});

module.exports = users; 