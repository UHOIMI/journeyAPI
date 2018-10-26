var dbConfig = require('./dbConfig');
var Sequelize = require('sequelize');
var spot = require('../model/spotModel');
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

//user_idに紐付くレコード取得
var findAll = function findAll(user_id,callback) {
    spot.findAll({
        where:{
            user_id: user_id,
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
    spot.findAll({
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
        findAll(query.user_id,callback);
    }
};

//レコード登録
DbClient.prototype.register = function register(param, callback) {
    spot.create(param)
    .then((record) => {
        callback(setResult(200, record, null));
    })
    .catch((err) => {
        callback(setResult(500, null, err));
    });
};

  //レコード更新
DbClient.prototype.update = function update(param, query, callback) {
    const filter = {
        where:{
            spot_id: query.spot_id,
        },
    };
    spot.update(param, filter)
    .then((record) => {
        callback(setResult(200, record, null));
    })
    .catch((err) => {
        callback(setResult(500, null, err));
    });
};
 
//レコード削除
DbClient.prototype.remove = function remove(query, callback) {
    const filter = {
        where: {
            spot_id: query.spot_id
        }
    };
    spot.destroy(filter)
    .then((record) => {
        callback(setResult(200, record, null));
    })
    .catch((err) => {
        callback(setResult(500, null, err));
    });
};
  
module.exports = new DbClient();