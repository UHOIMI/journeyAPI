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
        console.log('Connection has been established successfully for plan');
    })
    .catch((err) => {
        console.error('plan Unable to connect to the database:', err);
    });
}

//user_idに紐付くレコード取得
var findAll = function findAll(user_id,callback) {
    model.plan.findAll({
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
  
//plan_idに紐付くレコードを取得
var findById = function findById(plan_id, callback) {
    model.plan.findAll({
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

//レコード取得
DbClient.prototype.find = function find(query, callback) {
    if (query.plan_id) {
        findById(query.plan_id, callback);
    } else {
        findAll(query.user_id,callback);
    }
};

//レコード追加
DbClient.prototype.register = function register(param, callback) {
    model.plan.create(param)
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

//レコード更新
DbClient.prototype.update = function update(param, callback) {
    const filter = {
        where: {
            user_id: param.user_id,
            plan_id: param.plan_id,
        }
    };
    model.plan.update(param, filter)
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
    const filter = {
        where: {
            user_id: param.user_id,
            plan_id: param.plan_id
        }
    };
    model.plan.destroy(filter)
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