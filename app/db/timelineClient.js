var dbConfig = require('./dbConfig');
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
var findById = function find(offset,limit,area, callback) {
    model.plan.findAll({
        offset: offset,
        limit: limit,
        where: {
            area: area,
        },
        order: [['date', 'DESC']],
        include:[
            {
                model: model.users,
                attributes: ['user_name','user_icon'],
                paranoid: false, 
                required: false,
            },
            {
                model: model.spot,
                attributes:['spot_id','spot_title','spot_image_a','spot_image_b','spot_image_c'],
                paranoid: false, 
                required: true,
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
    });
}
  
//areaがない場合
var findAll = function find(offset,limit,callback) {
    model.plan.findAll({
        offset: offset,
        limit: limit,
        order: [['date', 'DESC']],
        include:[
            {
                model: model.users,
                attributes: ['user_name','user_icon'],
                paranoid: false, 
                required: false,
            },
            {
                model: model.spot,
                attributes:['spot_id','spot_title','spot_image_a','spot_image_b','spot_image_c'],
                paranoid: false, 
                required: false,
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

    if(query.offset){
        if(query.offset != null){
            offset = query.offset;
        }else{
            offset = 0;
        }
    }else{
        offset = 0;
    }

    if(query.limit){
        if(query.limit != null){
            limit = query.limit;
        }else{
            limit = 10;
        }
    }else{
        limit = 10;
    }

    if (query.area) {
        findById(offset,limit,query.area, callback);
    } else {
        findAll(offset,limit,callback);
    }
};

module.exports = new DbClient();