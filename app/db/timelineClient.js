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

  DbClient.prototype.find = function find(query, callback) {
    plan.findAll({
        offset: query.offset,
        limit: 2,
        order: [['date', 'DESC']],
    })
    .then((record) => {
        if (record) {
            callback(setResult(200, record, null));
        } else {
            callback(setResult(404, null, null));
        }
    })
    .catch((err) => {
        callback(setResult(500, null, err));
    });
  }

  module.exports = new DbClient();