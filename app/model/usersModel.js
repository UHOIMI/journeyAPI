var Sequelize =  require('sequelize');
const dbConfig = require('../db/dbConfig');

//usersテーブルのモデル
const notNull = true;

const users = dbConfig.define('users',{
    user_id:{
        type: Sequelize.STRING(20),
        primaryKey: true,
    },
    user_pass:{
        type: Sequelize.STRING(150),
    },
    user_name:{
        type: Sequelize.STRING(20),
        notNull,
    },
    generation:{
        type: Sequelize.SMALLINT,
        notNull,
    },
    gender:{
        type: Sequelize.ENUM('男','女'),
        notNull,
    },
    comment:{
        type: Sequelize.TEXT,
        notNull,
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
});

module.exports = users; 