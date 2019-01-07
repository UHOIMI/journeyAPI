var Sequelize = require('sequelize');
var model = require('./model');
var dbConfig = require('../db/dbConfig');

const notNull = true;

const spot = dbConfig.define('spot',{
    spot_id:{
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    plan_id:{
        type: Sequelize.INTEGER,
        notNull,
        references:{
            model:model.plan,
            key:'plan_id',
            deferrable: Sequelize.Deferrable.INITIALLY_IMMEDIATE
        },
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
    spot_title:{
        type: Sequelize.STRING(20),
        notNull,
    },
    spot_address:{
        type: 'POINT',
        notNull,
        get: function(){
            address = this.getDataValue('spot_address');
            if(address){
                result = JSON.parse(JSON.stringify({lat:address.x,lng:address.y}));
                return result;
            }
        },
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
    spot_date:{
        type: Sequelize.DATEONLY,
        field:'date',
    },    
});

module.exports = spot; 