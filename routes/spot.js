var express = require('express');
var router = express.Router();
var spot = require('../app/db/spotClient');
var VerifyToken = require('../verifyToken');

router.get('/find', function(req, res, next) {
    const query = req.query;
    spot.find(query, function(result) {
        res.json(result);
    });
});

router.post('/register',VerifyToken, function(req, res, next) {
    req.body.user_id = req.decoded.user_id
    const addData = req.body;
    spot.register(addData, function(result) {
        res.json(result);
    });
});  

router.put('/update', VerifyToken,function(req, res, next) {
    req.body.user_id = req.decoded.user_id
    const addData = req.body;
    spot.update(addData, function(result) {
        res.json(result);
    });
});

router.delete('/delete',VerifyToken, function(req, res, next) {
    req.body.user_id = req.decoded.user_id
    const addData = req.body;
    spot.remove(addData, function(result) {
        res.json(result);
    });
});

module.exports = router;