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
        console.log('Connection has been established successfully for search');
    })
    .catch((err) => {
        console.error('plan Unable to connect to the database:', err);
    });
}


var findKGAPT = function findKGAPT(keyword,generation,area,price,transportation,offset,callback){
        model.plan.findAll({
            order: [['plan_date','DESC']],
            limit:10,
            offset:offset,
            where:{
                $and:{
                    $or:[
                        {
                            plan_title:{ $like: {$any:keyword}},
                            area: area,
                            price: price,
                            transportation: transportation,
                        },
                        {
                            plan_comment:{ $like: {$any:keyword}},
                            area: area,
                            price: price,
                            transportation: transportation,
                        },                       
                    ],
                },
            },
            include:[
                {
                    model: model.users,
                    attributes: ['user_name','user_icon'],
                    where:{
                        generation:generation,
                    },
                    paranoid: false,
                    required: false,
                },
                {
                    model: model.spot,
                    attributes: [
                            'spot_title','spot_id','spot_image_a','spot_image_b','spot_image_c',
                    ],
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
            console.log(err);
            callback(setResult(500, null, err));
        });
};

//処理分け
DbClient.prototype.find = function find(query, callback) {
    var keyword = new Array(); 
    if(query.keyword){
        if(query.keyword != null){
            //半角スペースを全角スペースに置き換え
            query.keyword = query.keyword.replace(' ','　');
            //置き換えた全角スペースで区切って配列にする
            array = query.keyword.split('　');
            //すべての要素を%を囲む
            for( i=0; i< array.length; i++){
                keyword.push('%'+ array[i] +'%');
            }
        }else{
            keyword.push('%');
        }
    }else{
        keyword.push('%');
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

    if(query.offset){
        if(query.offset != null){
            offset = query.offset;
        }else{
            offset = 0;
        }
    }else{
        offset = 0;
    }

    
    findKGAPT(keyword, generation, area, price, transportation,offset, callback);
};

module.exports = new DbClient();