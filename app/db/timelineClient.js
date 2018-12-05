var dbConfig = require('./dbConfig');
var plan = require('../model/planModel');
var model = require('../model/model');
/**
 * フロントエンドに返却するクエリ実行結果
 */
var result = {
    status: null,
    record: null,
    message: ""
};
  
var initializeResult = function initializeResult() {
    result.status = null,
    result.record = null,
    result.message = ""
};

var setResult = function setResult(status, record, message) {
    initializeResult();
    result.status = status;
    if (record) {
        result.record = record;
    } else {
        result.message = message;
    }
    return result;
};

//DB接続
var DbClient = function() {
    // db access
    dbConfig
    .authenticate()
    .then(() => {
        console.log('Connection has been established successfully for timeline');
    })
    .catch((err) => {
        console.error('plan Unable to connect to the database:', err);
    });
}

//areaが指定されている場合
var findById = function find(offset,area, callback) {
    plan.findAll({
        offset: offset,
        limit: 2,
        where: {
            area: area,
        },
        order: [['date', 'DESC']],
    })
    .then((record) => {
        if (record == "") {
            callback(setResult(404, null, null));
        } else {
            callback(setResult(200, record, null));
        }
    })
    .catch((err) => {
        callback(setResult(500, null, err));
    });
}
  
//areaがない場合
var findAll = function find(offset,callback) {
    model.plan.findAll({
        //attributes:[],
        offset: offset,
        limit: 10,
        order: [['date', 'DESC']],
        include:[
            {
                model: model.users,
                tableName:'users',
                attributes: ['user_name','user_icon'],
                paranoid: false, 
                required: false,
            },
            {
                model: model.spot,
                associate:[
                    //model.plan.hasMany(model.spot,{foreignKey:'spot_id', targetKey:'spot_id_a'}),
                    model.plan.hasMany(model.spot, {foreignKey: 'spot_id', sourceKey: 'spot_id_a'}),
                    //model.plan.belongsTo(model.spot,{foreignKey:'spot_id_a',targetKey:'spot_id'}),
                ],
                freezeTableName:false,
                tableName:'spot_a',
                attributes:['spot_image_a','spot_image_b','spot_image_c'],
                paranoid: false, 
                required: false,
                where:{
                    $or:[
                        {spot_image_a:{$ne:null}},
                        {spot_image_b:{$ne:null}},
                        {spot_image_c:{$ne:null}},
                    ], 
                },
            },
            {
                model: model.spot,
                associate:[
                    model.plan.hasMany(model.spot, {foreignKey: 'spot_id', sourceKey: 'spot_id_b'}),
                    //model.plan.hasOne(model.spot,{foreignKey:'spot_id'},{targetKey:'spot_id_b'}),
                    //model.plan.belongsTo(model.spot,{foreignKey:'spot_id_b'},{targetKey:'spot_id'}),
                ],
                freezeTableName:false,
                tableName:'spot_b',
                attributes:['spot_image_a','spot_image_b','spot_image_c'],
                paranoid: false, 
                required: false,
                where:{
                    $or:[
                        {spot_image_a:{$ne:null}},
                        {spot_image_b:{$ne:null}},
                        {spot_image_c:{$ne:null}},
                    ], 
                },
            },
        ],
    })
    .then((record) => {
        if (record == "") {
            callback(setResult(404, null, null));
        } else {
            callback(setResult(200, record, null));
        }
    })
    .catch((err) => {
        callback(setResult(500, null, err));
        console.log(err)
    });
}

DbClient.prototype.find = function find(query, callback) {
    if (query.area) {
        findById(query.offset,query.area, callback);
    } else {
        findAll(query.offset,callback);
    }
};

module.exports = new DbClient();