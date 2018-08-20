var Sequelize = require('sequelize');
var users = require('./usersModel');
var dbConfig = require('../db/dbConfig');

const notNull = true;

const spot = dbConfig.define('spot',{
    spot_id:{
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    user_id:{
        type: Sequelize.INTEGER,
        notNull,
        references:{
            model:users,
            key:'user_id',
            deferrable: Sequelize.Deferrable.INITIALLY_IMMEDIATE
        },
    },
    spot_title:{
        type: Sequelize.STRING,
        notNull,
    },
    spot_address:{
        type: 'Point',
        notNull,
    },
    spot_comment:{
        type: Sequelize.TEXT,
    },
    spot_image_a:{
        type: Sequelize.TEXT,
    },
    spot_image_b:{
        type: Sequelize.TEXT,
    },
    spot_image_c:{
        type: Sequelize.TEXT,
    },
    date:{
        type: Sequelize.DATEONLY,
        defaultValue: Sequelize.NOW,
    },
});

module.exports = spot; 