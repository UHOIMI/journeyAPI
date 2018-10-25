var express = require('express');
var router = express.Router();
var users = require('../app/db/usersClient');

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
  
router.put('/update', function(req, res, next) {
    const query = req.query;
    const addData = req.body;
    users.update(addData, query, function(result) {
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