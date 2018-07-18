var express = require('express');
var router = express.Router();
var plan = require('../app/db/planClient');


router.get('/find', function(req, res, next) {
  const query = req.query;
  plan.find(query, function(result) {
    res.json(result);
  });
});

router.post('/register', function(req, res, next) {
  const addData = req.body;
  plan.register(addData, function(result) {
    res.json(result);
  });
});

router.put('/update', function(req, res, next) {
  const query = req.query;
  const addData = req.body;
  plan.update(addData, query, function(result) {
    res.json(result);
  });
});

router.delete('/delete', function(req, res, next) {
  const query = req.query;
  plan.remove(query, function(result) {
    res.json(result);
  });
});

  module.exports = router;