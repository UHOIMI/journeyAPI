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
        type: Sequelize.STRING(20),
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
        get: function(){
            date = this.getDataValue('date');
            result= JSON.parse(JSON.stringify(moment(new Date(date)).format('YYYY-MM-DD HH:mm:ss')));
            return result;
        },
    },
});

module.exports = favorite; 