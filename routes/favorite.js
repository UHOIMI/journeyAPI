var express = require('express');
var router = express.Router();
var favorite = require('../app/db/favoriteClient');


router.get('/find', function(req, res, next) {
    const query = req.query;
    favorite.find(query, function(result) {
        res.json(result);
    });
});

router.post('/register', function(req, res, next) {
    const addData = req.body;
    favorite.register(addData, function(result) {
      res.json(result);
    });
  });

router.delete('/delete', function(req, res, next) {
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