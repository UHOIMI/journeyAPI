var dbConfig = require('./dbConfig');
var Sequelize = require('sequelize');
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
        console.log('Connection has been established successfully for search');
    })
    .catch((err) => {
        console.error('plan Unable to connect to the database:', err);
    });
}

//5つ
var findKGAPT = function findKGAPT(keyword,generation,area,price,transportation,callback){
        model.plan.findAll({
            order: [['plan_date','DESC']],
            where:{
                $and:{
                    $or:[
                        {
                            plan_title:{ $like: '%'+keyword+'%'},
                            area: area,
                            price: price,
                            transportation: transportation,
                            '$user.generation$': generation,
                        },
                        {
                            plan_comment:{ $like: '%'+keyword+'%'},
                            area: area,
                            price: price,
                            transportation: transportation,
                            '$user.generation$': generation,
                        },
                        {
                            '$spots.spot_title$':{ $like: '%'+keyword+'%'},
                            area: area,
                            price: price,
                            transportation: transportation,
                            '$user.generation$': generation,
                        },
                        {
                            '$spots.spot_comment$':{ $like: '%'+keyword+'%'},
                            area: area,
                            price: price,
                            transportation: transportation,
                            '$user.generation$': generation,
                        },                        
                    ],
                },
            },
            include:[
                {
                    model: model.users,
                    attributes: ['user_id','user_name','user_icon'],
                    paranoid: false,
                    required: false,
                },
                {
                    model: model.spot,
                    attributes: ['spot_id','spot_image_a','spot_image_b','spot_image_c'],
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
        });
};

//処理分け
DbClient.prototype.find = function find(query, callback) {
    if(query.keyword){
        if(query.keyword != null){
            keyword = query.keyword;
        }else{
            keyword='%';
        }
    }else{
        keyword='%';
    }

    if(query.generation){
        if(query.generation != null){
            generation = query.generation;
        }else{
            generation = {$ne:null};
        }
    }else{
        generation = {$ne:null};
    }

    if(query.area){
        if(query.area != null){
            area = query.area;
        }else{
            area = {$ne:null};
        }
    }else{
        area = {$ne:null};
    }

    if(query.price){
        if(query.price != null){
            price = query.price;
        }else{
            price = {$ne:null};
        }
    }else{
        price = {$ne:null};
    }
    
    if(query.transportation){
        if(query.transportation != null){
            transportation = query.transportation;
        }else{
            transportation = {$ne:null};
        }
    }else{
        transportation = {$ne:null};
    }
    
    findKGAPT(keyword, generation, area, price, transportation, callback);
};

module.exports = new DbClient();