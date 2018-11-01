var dbConfig = require('./dbConfig');
var Sequelize = require('sequelize');
var plan = require('../model/planModel');
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
        console.log('Connection has been established successfully for search');
    })
    .catch((err) => {
        console.error('plan Unable to connect to the database:', err);
    });
}

//4つ
var findKGAP = function findKGAP(keyword,generation,area,price,callback) {
    var spotSQL = Sequelize.literal("(SELECT spot_id FROM spot where spot_title LIKE " + " '%" + keyword + "%' or spot_comment LIKE "+"'%"+　keyword　+"%')");
    var generationSQL = Sequelize.literal("(SELECT user_id FROM users where generation = "+ generation +")");
    plan.findAll({
        where:{
            $or:[
                {plan_title: { $like: '%'+keyword+'%' }},
                {plan_comment: { $like: '%'+keyword+'%'}},
                {spot_id_a: { $in: spotSQL }},
                {spot_id_b: { $in: spotSQL }},
                {spot_id_c: { $in: spotSQL }},
                {spot_id_d: { $in: spotSQL }},
                {spot_id_e: { $in: spotSQL }},
                {spot_id_f: { $in: spotSQL }},
                {spot_id_g: { $in: spotSQL }},
                {spot_id_h: { $in: spotSQL }},
                {spot_id_i: { $in: spotSQL }},
                {spot_id_j: { $in: spotSQL }},
                {spot_id_k: { $in: spotSQL }},
                {spot_id_l: { $in: spotSQL }},
                {spot_id_m: { $in: spotSQL }},
                {spot_id_n: { $in: spotSQL }},
                {spot_id_o: { $in: spotSQL }},
                {spot_id_p: { $in: spotSQL }},
                {spot_id_q: { $in: spotSQL }},
                {spot_id_r: { $in: spotSQL }},
                {spot_id_s: { $in: spotSQL }},
                {spot_id_t: { $in: spotSQL }},
            ],
            $and:[
                {area: area},
                {price: price},
                {user_id: {$in: generationSQL}},
            ]
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

//３つ
var findKGA = function findKGA(keyword, generation, area, callback) {
    var spotSQL = Sequelize.literal("(SELECT spot_id FROM spot where spot_title LIKE " + " '%" + keyword + "%' or spot_comment LIKE "+"'%"+　keyword　+"%')");
    var generationSQL = Sequelize.literal("(SELECT user_id FROM users where generation = "+ generation +")");
    plan.findAll({
        where:{
            $or:[
                {plan_title: { $like: '%'+keyword+'%' }},
                {plan_comment: { $like: '%'+keyword+'%'}},
                {spot_id_a: { $in: spotSQL }},
                {spot_id_b: { $in: spotSQL }},
                {spot_id_c: { $in: spotSQL }},
                {spot_id_d: { $in: spotSQL }},
                {spot_id_e: { $in: spotSQL }},
                {spot_id_f: { $in: spotSQL }},
                {spot_id_g: { $in: spotSQL }},
                {spot_id_h: { $in: spotSQL }},
                {spot_id_i: { $in: spotSQL }},
                {spot_id_j: { $in: spotSQL }},
                {spot_id_k: { $in: spotSQL }},
                {spot_id_l: { $in: spotSQL }},
                {spot_id_m: { $in: spotSQL }},
                {spot_id_n: { $in: spotSQL }},
                {spot_id_o: { $in: spotSQL }},
                {spot_id_p: { $in: spotSQL }},
                {spot_id_q: { $in: spotSQL }},
                {spot_id_r: { $in: spotSQL }},
                {spot_id_s: { $in: spotSQL }},
                {spot_id_t: { $in: spotSQL }},
            ],
            $and:[
                {area: area},
                {user_id: {$in: generationSQL}},
            ]   
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


var findKGP = function findKGP(keyword, generation, price, callback) {
    var spotSQL = Sequelize.literal("(SELECT spot_id FROM spot where spot_title LIKE " + " '%" + keyword + "%' or spot_comment LIKE "+"'%"+　keyword　+"%')");
    var generationSQL = Sequelize.literal("(SELECT user_id FROM users where generation = "+ generation +")");
    plan.findAll({
        where:{
            $or:[
                {plan_title: { $like: '%'+keyword+'%' }},
                {plan_comment: { $like: '%'+keyword+'%'}},
                {spot_id_a: { $in: spotSQL }},
                {spot_id_b: { $in: spotSQL }},
                {spot_id_c: { $in: spotSQL }},
                {spot_id_d: { $in: spotSQL }},
                {spot_id_e: { $in: spotSQL }},
                {spot_id_f: { $in: spotSQL }},
                {spot_id_g: { $in: spotSQL }},
                {spot_id_h: { $in: spotSQL }},
                {spot_id_i: { $in: spotSQL }},
                {spot_id_j: { $in: spotSQL }},
                {spot_id_k: { $in: spotSQL }},
                {spot_id_l: { $in: spotSQL }},
                {spot_id_m: { $in: spotSQL }},
                {spot_id_n: { $in: spotSQL }},
                {spot_id_o: { $in: spotSQL }},
                {spot_id_p: { $in: spotSQL }},
                {spot_id_q: { $in: spotSQL }},
                {spot_id_r: { $in: spotSQL }},
                {spot_id_s: { $in: spotSQL }},
                {spot_id_t: { $in: spotSQL }},
            ],
            $and:[
                {price: price},
                {user_id: {$in: generationSQL}},
            ]   
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


var findKAP = function findKAP(keyword, area, price, callback) {
    var spotSQL = Sequelize.literal("(SELECT spot_id FROM spot where spot_title LIKE " + " '%" + keyword + "%' or spot_comment LIKE "+"'%"+　keyword　+"%')");
    plan.findAll({
        where:{
            $or:[
                {plan_title: { $like: '%'+keyword+'%' }},
                {plan_comment: { $like: '%'+keyword+'%'}},
                {spot_id_a: { $in: spotSQL }},
                {spot_id_b: { $in: spotSQL }},
                {spot_id_c: { $in: spotSQL }},
                {spot_id_d: { $in: spotSQL }},
                {spot_id_e: { $in: spotSQL }},
                {spot_id_f: { $in: spotSQL }},
                {spot_id_g: { $in: spotSQL }},
                {spot_id_h: { $in: spotSQL }},
                {spot_id_i: { $in: spotSQL }},
                {spot_id_j: { $in: spotSQL }},
                {spot_id_k: { $in: spotSQL }},
                {spot_id_l: { $in: spotSQL }},
                {spot_id_m: { $in: spotSQL }},
                {spot_id_n: { $in: spotSQL }},
                {spot_id_o: { $in: spotSQL }},
                {spot_id_p: { $in: spotSQL }},
                {spot_id_q: { $in: spotSQL }},
                {spot_id_r: { $in: spotSQL }},
                {spot_id_s: { $in: spotSQL }},
                {spot_id_t: { $in: spotSQL }},
            ],
            $and:[
                {area: area},
                {price: price},
            ]   
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

//３つ(keyword,generation,area)
var findGAP = function findGAP(generation, area, price, callback) {
    var generationSQL = Sequelize.literal("(SELECT user_id FROM users where generation = "+ generation +")");
    plan.findAll({
        where:{
            $and:[
                {area: area},
                {price: price},
                {user_id: {$in: generationSQL}},
            ]   
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

var findKG = function findKG(keyword, generation, callback) {
    var spotSQL = Sequelize.literal("(SELECT spot_id FROM spot where spot_title LIKE " + " '%" + keyword + "%' or spot_comment LIKE "+"'%"+　keyword　+"%')");
    var generationSQL = Sequelize.literal("(SELECT user_id FROM users where generation = "+ generation +")");
    plan.findAll({
        where:{
            $or:[
                {plan_title: { $like: '%'+keyword+'%' }},
                {plan_comment: { $like: '%'+keyword+'%'}},
                {spot_id_a: { $in: spotSQL }},
                {spot_id_b: { $in: spotSQL }},
                {spot_id_c: { $in: spotSQL }},
                {spot_id_d: { $in: spotSQL }},
                {spot_id_e: { $in: spotSQL }},
                {spot_id_f: { $in: spotSQL }},
                {spot_id_g: { $in: spotSQL }},
                {spot_id_h: { $in: spotSQL }},
                {spot_id_i: { $in: spotSQL }},
                {spot_id_j: { $in: spotSQL }},
                {spot_id_k: { $in: spotSQL }},
                {spot_id_l: { $in: spotSQL }},
                {spot_id_m: { $in: spotSQL }},
                {spot_id_n: { $in: spotSQL }},
                {spot_id_o: { $in: spotSQL }},
                {spot_id_p: { $in: spotSQL }},
                {spot_id_q: { $in: spotSQL }},
                {spot_id_r: { $in: spotSQL }},
                {spot_id_s: { $in: spotSQL }},
                {spot_id_t: { $in: spotSQL }},
            ],
            $and:[
                {user_id: {$in: generationSQL}},
            ]   
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

var findKA = function findKA(keyword, area, callback) {
    var spotSQL = Sequelize.literal("(SELECT spot_id FROM spot where spot_title LIKE " + " '%" + keyword + "%' or spot_comment LIKE "+"'%"+　keyword　+"%')");
    plan.findAll({
        where:{
            $or:[
                {plan_title: { $like: '%'+keyword+'%' }},
                {plan_comment: { $like: '%'+keyword+'%'}},
                {spot_id_a: { $in: spotSQL }},
                {spot_id_b: { $in: spotSQL }},
                {spot_id_c: { $in: spotSQL }},
                {spot_id_d: { $in: spotSQL }},
                {spot_id_e: { $in: spotSQL }},
                {spot_id_f: { $in: spotSQL }},
                {spot_id_g: { $in: spotSQL }},
                {spot_id_h: { $in: spotSQL }},
                {spot_id_i: { $in: spotSQL }},
                {spot_id_j: { $in: spotSQL }},
                {spot_id_k: { $in: spotSQL }},
                {spot_id_l: { $in: spotSQL }},
                {spot_id_m: { $in: spotSQL }},
                {spot_id_n: { $in: spotSQL }},
                {spot_id_o: { $in: spotSQL }},
                {spot_id_p: { $in: spotSQL }},
                {spot_id_q: { $in: spotSQL }},
                {spot_id_r: { $in: spotSQL }},
                {spot_id_s: { $in: spotSQL }},
                {spot_id_t: { $in: spotSQL }},
            ],
            $and:[
                {area: area},
            ]   
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

var findKP = function findKP(keyword, price, callback) {
    var spotSQL = Sequelize.literal("(SELECT spot_id FROM spot where spot_title LIKE " + " '%" + keyword + "%' or spot_comment LIKE "+"'%"+　keyword　+"%')");
    plan.findAll({
        where:{
            $or:[
                {plan_title: { $like: '%'+keyword+'%' }},
                {plan_comment: { $like: '%'+keyword+'%'}},
                {spot_id_a: { $in: spotSQL }},
                {spot_id_b: { $in: spotSQL }},
                {spot_id_c: { $in: spotSQL }},
                {spot_id_d: { $in: spotSQL }},
                {spot_id_e: { $in: spotSQL }},
                {spot_id_f: { $in: spotSQL }},
                {spot_id_g: { $in: spotSQL }},
                {spot_id_h: { $in: spotSQL }},
                {spot_id_i: { $in: spotSQL }},
                {spot_id_j: { $in: spotSQL }},
                {spot_id_k: { $in: spotSQL }},
                {spot_id_l: { $in: spotSQL }},
                {spot_id_m: { $in: spotSQL }},
                {spot_id_n: { $in: spotSQL }},
                {spot_id_o: { $in: spotSQL }},
                {spot_id_p: { $in: spotSQL }},
                {spot_id_q: { $in: spotSQL }},
                {spot_id_r: { $in: spotSQL }},
                {spot_id_s: { $in: spotSQL }},
                {spot_id_t: { $in: spotSQL }},
            ],
            $and:[
                {price: price},
            ]   
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


var findGA = function findGA(generation, area, callback) {
    var generationSQL = Sequelize.literal("(SELECT user_id FROM users where generation = "+ generation +")");
    plan.findAll({
        where:{
            $and:[
                {area: area},
                {user_id: {$in: generationSQL}},
            ]   
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


var findGP = function findGP(generation, price, callback) {
    var generationSQL = Sequelize.literal("(SELECT user_id FROM users where generation = "+ generation +")");
    plan.findAll({
        where:{
            $and:[
                {price: price},
                {user_id: {$in: generationSQL}},
            ]   
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

var findAP = function findAP(area, price, callback) {
    plan.findAll({
        where:{
            $and:[
                {area: area},
                {price: price},
            ]   
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

var findK = function findK(keyword, callback) {
    var spotSQL = Sequelize.literal("(SELECT spot_id FROM spot where spot_title LIKE " + " '%" + keyword + "%' or spot_comment LIKE "+"'%"+　keyword　+"%')");
    plan.findAll({
        where:{
            $or:[
                {plan_title: { $like: '%'+keyword+'%' }},
                {plan_comment: { $like: '%'+keyword+'%'}},
                {spot_id_a: { $in: spotSQL }},
                {spot_id_b: { $in: spotSQL }},
                {spot_id_c: { $in: spotSQL }},
                {spot_id_d: { $in: spotSQL }},
                {spot_id_e: { $in: spotSQL }},
                {spot_id_f: { $in: spotSQL }},
                {spot_id_g: { $in: spotSQL }},
                {spot_id_h: { $in: spotSQL }},
                {spot_id_i: { $in: spotSQL }},
                {spot_id_j: { $in: spotSQL }},
                {spot_id_k: { $in: spotSQL }},
                {spot_id_l: { $in: spotSQL }},
                {spot_id_m: { $in: spotSQL }},
                {spot_id_n: { $in: spotSQL }},
                {spot_id_o: { $in: spotSQL }},
                {spot_id_p: { $in: spotSQL }},
                {spot_id_q: { $in: spotSQL }},
                {spot_id_r: { $in: spotSQL }},
                {spot_id_s: { $in: spotSQL }},
                {spot_id_t: { $in: spotSQL }},
            ], 
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

var findG = function findG(generation, callback) {
    var generationSQL = Sequelize.literal("(SELECT user_id FROM users where generation = "+ generation +")");
    plan.findAll({
        where:{
            $and:[
                {user_id: {$in: generationSQL}},
            ]   
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

var findA = function findA(area, callback) {
    plan.findAll({
        where:{
            $and:[
                {area: area},
            ]   
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

var findP = function findP(price, callback) {
    plan.findAll({
        where:{
            $and:[
                {price: price},
            ]   
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

//処理分け
DbClient.prototype.find = function find(query, callback) {
    keyword = query.keyword;
    generation = query.generation;
    area = query.area;
    price = query.price;
    if (keyword && generation && area && price) {
        findKGAP(keyword, generation, area, price, callback);
    } else if (keyword && generation && area){
        findKGA(keyword, generation, area, callback);
    } else if (keyword && generation && price){
        findKGP(keyword, generation, price, callback);
    } else if (keyword && area && price){
        findKAP(keyword, area, price, callback);
    } else if (generation && area && price){
        findGAP(generation, area, price, callback);
    } else if (keyword && generation){
        findKG(keyword, generation, callback);
    } else if (keyword && area){
        findKA(keyword, area, callback);
    } else if (keyword && price){
        findKP(keyword, price, callback);
    } else if (generation && area){
        findGA(generation, area, callback);
    } else if (generation && price){
        findGP(generation, price, callback);
    } else if (area && price){
        findAP(area, price, callback);
    } else if (keyword){
        findK(keyword, callback);
    } else if (generation){
        findG(generation, callback);
    } else if (area){
        findA(area, callback);
    } else if (price){
        findP(price, callback);
    } else {}
};

module.exports = new DbClient();