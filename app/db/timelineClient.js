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
var findById = function find(offset,limit,area,user_id,callback) {
    model.plan.findAll({
        offset: offset,
        limit: limit,
        subQuery: false,
        where: {
            area: area,
            user_id: user_id,
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
var findAll = function find(offset,limit,user_id,callback) {
    model.plan.findAll({
        offset: offset,
        limit: limit,
        order: [['date', 'DESC']],
        subQuery: false,
        where:{
            user_id: user_id,
        },
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

    if(query.user_id){
        if(query.user_id != null){
            user_id = query.user_id;
        }else{
            user_id = {$ne:null};
        }
    }else{
        user_id = {$ne:null};
    }

    if (query.area) {
        findById(offset,limit,query.area,user_id, callback);
    } else {
        findAll(offset,limit,user_id,callback);
    }
};

module.exports = new DbClient();