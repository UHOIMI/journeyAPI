var express = require('express');
var router = express.Router();
var favorite = require('../app/db/favoriteClient');
var VerifyToken = require('../verifyToken');


router.get('/find', function(req, res, next) {
    const query = req.query;
    favorite.find(query, function(result) {
        res.json(result);
    });
});

router.post('/register',VerifyToken,function(req, res, next) {
    req.body.user_id = req.decoded.user_id
    const addData = req.body;
    favorite.register(addData, function(result) {
        res.json(result);
    });
});

router.delete('/delete',VerifyToken, function(req, res, next) {
    req.body.user_id = req.decoded.user_id
    const query = req.body;
    favorite.remove(query, function(result) {
        res.json(result);
    });
});

router.get('/count',function(req,res,next){
    const query = req.query;
    favorite.findCount(query,function(result){
        res.json(result);
    });
});
module.exports = router;