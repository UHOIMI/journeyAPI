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
        console.log('Connection has been established successfully for spot');
    })
    .catch((err) => {
        console.error('plan Unable to connect to the database:', err);
    });
}

//plan_idに紐付くレコード取得
var findAll = function findAll(plan_id,callback) {
    model.spot.findAll({
        where:{
            plan_id: plan_id,
        }
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
};
  
//spot_idに紐付くレコードを取得
var findById = function findById(spot_id, callback) {
    model.spot.findAll({
        where:{
            spot_id: spot_id,   
        }
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
};

//レコード取得
DbClient.prototype.find = function find(query, callback) {
    if (query.spot_id) {
        findById(query.spot_id, callback);
    } else {
        findAll(query.plan_id,callback);
    }
};

//レコード登録
DbClient.prototype.register = function register(param, callback) {
    model.spot.create(param)
    .then((record) => {
        callback(setResult(200, record, null));
    })
    .catch((err) => {
        callback(setResult(500, null, err));
    });
};

  //レコード更新
DbClient.prototype.update = function update(param, callback) {
    const filter = {
        where:{
            user_id: param.user_id,
            spot_id: param.spot_id,
        },
    };
    model.spot.update(param, filter)
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
};
 
//レコード削除
DbClient.prototype.remove = function remove(param, callback) {
    if(param.spot_id){
        const filter = {
            where: {
                user_id: param.user_id,
                spot_id: param.spot_id
            }
        };
    }else if(param.plan_id){
        const filter = {
            where: {
                user_id: param.user_id,
                plan_id: param.plan_id
            }
        };
    }
    model.spot.destroy(filter)
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
};
  
module.exports = new DbClient();
