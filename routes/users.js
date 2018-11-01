var express = require('express');
var router = express.Router();
var users = require('../app/db/usersClient');
var VerifyToken = require('../verifyToken');

router.get('/find', function(req, res, next) {
    const query = req.query;
    users.find(query, function(result) {
      res.json(result);
    });
});
  
router.post('/register', function(req, res, next) {
    const addData = req.body;
    users.register(addData, function(result) {
      res.json(result);
    });
});
  
router.put('/update',VerifyToken, function(req, res, next) {
    req.body.user_id = req.decoded.user_id
    const addData = req.body;
    users.update(addData, function(result) {
      res.json(result);
    });
});

router.post('/login',function(req, res, next){
    const userData = req.body;
    users.login(userData,function(result){
        res.json(result);
    });
});

  module.exports = router;