var Sequelize =  require('sequelize');
const dbConfig = require('../db/dbConfig');

//usersテーブルのモデル
const notNull = true;

const users = dbConfig.define('users',{
    user_id:{
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    user_name:{
        type: Sequelize.STRING,
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