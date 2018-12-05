var Sequelize = require('sequelize');
var model = require('./model');
var dbConfig = require('../db/dbConfig');
var moment = require("moment");

const notNull = true;

const favorite = dbConfig.define('favorite',{
    plan_id:{
        type: Sequelize.INTEGER,
        primaryKey: true,
        references:{
            model:model.plan,
            key:'plan_id',
            deferrable: Sequelize.Deferrable.INITIALLY_IMMEDIATE,
        },
    },
    user_id:{
        type: Sequelize.STRING(20),
        primaryKey: true,
        notNull,
        references:{
            model:model.users,
            key:'user_id',
            deferrable: Sequelize.Deferrable.INITIALLY_IMMEDIATE,
        },
    },
    fav_date:{
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW,
        field:'date',
        get: function(){
            date = this.getDataValue('date');
            result= JSON.parse(JSON.stringify(moment(new Date(date)).format('YYYY-MM-DD HH:mm:ss')));
            return result;
        },
    },
});

module.exports = favorite; 