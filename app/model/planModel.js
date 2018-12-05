var Sequelize = require('sequelize');
var model = require('./model');
var dbConfig = require('../db/dbConfig');
var moment = require("moment");

const notNull = true;

const plan = dbConfig.define('plan',{
    plan_id:{
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    user_id:{
        type: Sequelize.STRING(20),
        notNull,
        references:{
            model:model.users,
            key:'user_id',
            deferrable: Sequelize.Deferrable.INITIALLY_IMMEDIATE
        },
    },
    plan_title:{
        type: Sequelize.STRING(20),
        notNull,
    },
    plan_comment:{
        type: Sequelize.TEXT,
    },
    transportation:{
        type: Sequelize.STRING(14),
        notNull,
    },
    price:{
        type: Sequelize.STRING(15),
        notNull,
    },
    area:{
        type: Sequelize.STRING(4),
        notNull,
    }, 
    plan_date:{
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW,
        field:'date',
        get: function(){
            date = this.getDataValue('plan_date');
            result= JSON.parse(JSON.stringify(moment(new Date(date)).format('YYYY-MM-DD HH:mm:ss')));
            return result;
        },
    }, 
});



module.exports = plan;