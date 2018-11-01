var express = require('express');
var router = express.Router();
var search = require('../app/db/searchClient');

router.get('/find', function(req, res, next) {
    const query = req.query;
    search.find(query, function(result) {
        res.json(result);
    });
});

module.exports = router;