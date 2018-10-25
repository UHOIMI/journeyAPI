var dbConfig = require('./dbConfig');
var Sequelize = require('sequelize');
var users = require('../model/usersModel');
var crypto = require("crypto");

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
        console.log('Connection has been established successfully for users');
    })
    .catch((err) => {
        console.error('plan Unable to connect to the database:', err);
    });
}
//ユーザー一覧
var findAll = function findAll(callback) {
    users.findAll({
        attributes:[
            'user_id', 'user_name','generation','gender','comment','user_icon','user_header'
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
};

  //user_idに紐付くレコード取得
var findById = function findAll(user_id,callback) {
    users.findAll({
        attributes:[
            'user_id', 'user_name','generation','gender','comment','user_icon','user_header'
        ],
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
   //レコード取得
DbClient.prototype.find = function find(query, callback) {
    if (query.user_id){
        findById(query.user_id,callback);
    }else{
        findAll(callback);
    }
};

  //レコード追加
DbClient.prototype.register = function register(param, callback) {
    if(param.user_pass){
        var sha512 = crypto.createHash('sha512');
        sha512.update(param.user_pass);
        var hash = sha512.digest('hex')
        param.user_pass=hash;
    }else{}
    users.create(param)
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
        where: {
            user_id: query.user_id
        }
    };
    if (param.user_pass){
        var sha512 = crypto.createHash('sha512');
        sha512.update(param.user_pass);
        var hash = sha512.digest('hex')
        param.user_pass=hash;       
    }
    users.update(param, filter)
    .then((record) => {
        callback(setResult(200, record, null));
    })
    .catch((err) => {
        callback(setResult(500, null, err));
    });
};

//ログイン処理
DbClient.prototype.login = function login(param,callback){
    if(param.user_id && param.user_pass){
        var sha512 = crypto.createHash('sha512');
        sha512.update(param.user_pass);
        var hash = sha512.digest('hex')
        param.user_pass=hash;
    }
    users.findAll({
        where:{
            user_id: param.user_id,
            user_pass: param.user_pass
        }
    })
    .then((record) => {
        if (record == "") {
            callback(setResult(404, null, null));
        } else {
            callback(setResult(200, record[0].user_id, null));
        }
      })
      .catch((err) => {
        callback(setResult(500, null, err));
      });
};

module.exports = new DbClient();