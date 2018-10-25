var dbConfig = require('./dbConfig');
var Sequelize = require('sequelize');
var plan = require('../model/planModel');

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
    plan.findAll({
        offset: offset,
        limit: 2,
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

DbClient.prototype.find = function find(query, callback) {
    if (query.area) {
        findById(query.offset,query.area, callback);
    } else {
        findAll(query.offset,callback);
    }
};

module.exports = new DbClient();