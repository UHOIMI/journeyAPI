var express = require('express');
var router = express.Router();
var timeline = require('../app/db/timelineClient');

router.get('/find', function(req, res, next) {
    const query = req.query;
    timeline.find(query, function(result) {
      res.json(result);
    });
  });

module.exports = router;