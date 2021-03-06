var dbConfig = require('./dbConfig');
var model = require('../model/model');
var sequelize = require('sequelize');
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
        console.log('Connection has been established successfully for favorite');
    })
    .catch((err) => {
        console.error('plan Unable to connect to the database:', err);
    });
}

//ユーザーIDに紐づけされたレコード取得
var findUser = function findAll(user_id,offset,limit,callback) {
    userSQL = sequelize.literal("(SELECT user_id from users where users.user_id = plan.user_id)");
    model.favorite.findAll({
        offset: offset,
        limit: limit,
        where:{
            user_id: user_id,
        },
        order: [['date', 'DESC'],[model.spot,'spot_id','ASC']],
        include:[
            {
                model: model.plan,
                attributes:{exclude:['plan_id']},
                paranoid: false,
                required: false,
            },
            {
                model: model.spot,
                attributes:['spot_id','spot_title','spot_image_a','spot_image_b','spot_image_c'],
                paranoid: false, 
                required: false, 
            }
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

//プランIDに紐づけされたレコード取得
var findPlan = function findAll(plan_id,callback) {
    model.favorite.findAll({
        where:{
            plan_id: plan_id,
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
};

//ユーザーIDとプランIDに紐づけされたレコードを取得
var findById = function findById(user_id,plan_id,callback) {
    model.favorite.findAll({
        where:{
            plan_id: plan_id,
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

//取得処理分岐＆レコード取得
DbClient.prototype.find = function find(query, callback) {
    if (query.user_id && query.plan_id) {
        findById(query.user_id,query.plan_id, callback);
    } else if(query.user_id){

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

        findUser(query.user_id,offset,limit,callback);
    } else{
        findPlan(query.plan_id,callback);
    }
};

//レコード追加
DbClient.prototype.register = function register(param, callback) {
    model.favorite.create(param)
    .then((record) => {
        callback(setResult(200, record, null));
    })
    .catch((err) => {
        callback(setResult(500, null, err));
    });
};

//レコード削除
DbClient.prototype.remove = function remove(param, callback) {
    const filter = {
        where: {
            plan_id: param.plan_id,
            user_id: param.user_id,
        }
    };
    model.favorite.destroy(filter)
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

//プランのお気に入り数をカウント
var findPlanCount = function findAll(plan_id,callback) {
    model.favorite.findAndCountAll({
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

//ユーザーのお気に入り数をカウント
var findUserCount = function findAll(user_id,callback) {
    model.favorite.findAndCountAll({
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

//処理わけとレコード取得
DbClient.prototype.findCount = function find(query, callback) {
    if (query.plan_id) {
        findPlanCount(query.plan_id, callback);
    }else{
        findUserCount(query.user_id, callback);
    }
};

module.exports = new DbClient();