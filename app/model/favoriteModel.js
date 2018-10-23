var Sequelize = require('sequelize');
var users = require('./usersModel');
var plan = require('./planModel');
var dbConfig = require('../db/dbConfig');

const notNull = true;

const favorite = dbConfig.define('favorite',{
    plan_id:{
        type: Sequelize.INTEGER,
        primaryKey: true,
        references:{
            model:plan,
            key:'plan_id',
            deferrable: Sequelize.Deferrable.INITIALLY_IMMEDIATE,
        },
    },
    user_id:{
        type: Sequelize.String(20),
        primaryKey: true,
        notNull,
        references:{
            model:users,
            key:'user_id',
            deferrable: Sequelize.Deferrable.INITIALLY_IMMEDIATE,
        },
    },
    date:{
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW,
    },
});

module.exports = favorite; 