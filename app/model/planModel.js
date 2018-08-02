var Sequelize = require('sequelize');
var users = require('./usersModel');
var spot = require('./spotModel');
var dbConfig = require('../db/dbConfig');

const notNull = true;

const plan = dbConfig.define('plan',{
    plan_id:{
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
    plan_title:{
        type: Sequelize.STRING,
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
        type: Sequelize.INTEGER,
        notNull,
    },
    spot_id_a:{
        type: Sequelize.INTEGER,
        notNull,
        references:{
            model:spot,
            key:'spot_id',
            deferrable: Sequelize.Deferrable.INITIALLY_IMMEDIATE
        },
    },    
    spot_id_b:{
        type: Sequelize.INTEGER,
        references:{
            model:spot,
            key:'spot_id',
            deferrable: Sequelize.Deferrable.INITIALLY_IMMEDIATE
        },
    },
    spot_id_c:{
        type: Sequelize.INTEGER,
        references:{
            model:spot,
            key:'spot_id',
            deferrable: Sequelize.Deferrable.INITIALLY_IMMEDIATE
        },
    },
    spot_id_d:{
        type: Sequelize.INTEGER,
        references:{
            model:spot,
            key:'spot_id',
            deferrable: Sequelize.Deferrable.INITIALLY_IMMEDIATE
        },
    },
    spot_id_e:{
        type: Sequelize.INTEGER,
        references:{
            model:spot,
            key:'spot_id',
            deferrable: Sequelize.Deferrable.INITIALLY_IMMEDIATE
        },
    },
    spot_id_f:{
        type: Sequelize.INTEGER,
        references:{
            model:spot,
            key:'spot_id',
            deferrable: Sequelize.Deferrable.INITIALLY_IMMEDIATE
        },
    },
    spot_id_g:{
        type: Sequelize.INTEGER,
        references:{
            model:spot,
            key:'spot_id',
            deferrable: Sequelize.Deferrable.INITIALLY_IMMEDIATE
        },
    },
    spot_id_h:{
        type: Sequelize.INTEGER,
        references:{
            model:spot,
            key:'spot_id',
            deferrable: Sequelize.Deferrable.INITIALLY_IMMEDIATE
        },
    },
    spot_id_i:{
        type: Sequelize.INTEGER,
        references:{
            model:spot,
            key:'spot_id',
            deferrable: Sequelize.Deferrable.INITIALLY_IMMEDIATE
        },
    },
    spot_id_j:{
        type: Sequelize.INTEGER,
        references:{
            model:spot,
            key:'spot_id',
            deferrable: Sequelize.Deferrable.INITIALLY_IMMEDIATE
        },
    },
    spot_id_k:{
        type: Sequelize.INTEGER,
        references:{
            model:spot,
            key:'spot_id',
            deferrable: Sequelize.Deferrable.INITIALLY_IMMEDIATE
        },
    },
    spot_id_l:{
        type: Sequelize.INTEGER,
        references:{
            model:spot,
            key:'spot_id',
            deferrable: Sequelize.Deferrable.INITIALLY_IMMEDIATE
        },
    },
    spot_id_m:{
        type: Sequelize.INTEGER,
        references:{
            model:spot,
            key:'spot_id',
            deferrable: Sequelize.Deferrable.INITIALLY_IMMEDIATE
        },
    },
    spot_id_n:{
        type: Sequelize.INTEGER,
        references:{
            model:spot,
            key:'spot_id',
            deferrable: Sequelize.Deferrable.INITIALLY_IMMEDIATE
        },
    },
    spot_id_o:{
        type: Sequelize.INTEGER,
        references:{
            model:spot,
            key:'spot_id',
            deferrable: Sequelize.Deferrable.INITIALLY_IMMEDIATE
        },
    },
    spot_id_p:{
        type: Sequelize.INTEGER,
        references:{
            model:spot,
            key:'spot_id',
            deferrable: Sequelize.Deferrable.INITIALLY_IMMEDIATE
        },
    },
    spot_id_q:{
        type: Sequelize.INTEGER,
        references:{
            model:spot,
            key:'spot_id',
            deferrable: Sequelize.Deferrable.INITIALLY_IMMEDIATE
        },
    },
    spot_id_r:{
        type: Sequelize.INTEGER,
        references:{
            model:spot,
            key:'spot_id',
            deferrable: Sequelize.Deferrable.INITIALLY_IMMEDIATE
        },
    },
    spot_id_s:{
        type: Sequelize.INTEGER,
        references:{
            model:spot,
            key:'spot_id',
            deferrable: Sequelize.Deferrable.INITIALLY_IMMEDIATE
        },
    },
    spot_id_t:{
        type: Sequelize.INTEGER,
        references:{
            model:spot,
            key:'spot_id',
            deferrable: Sequelize.Deferrable.INITIALLY_IMMEDIATE
        },
    },
    date:{
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW,
    },
    area:{
        type: Sequelize.STRING(4),
        notNull,
    },
});


module.exports = plan;