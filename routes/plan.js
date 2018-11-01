var express = require('express');
var router = express.Router();
var plan = require('../app/db/planClient');
var VerifyToken = require('../verifyToken');


router.get('/find', function(req, res, next) {
    const query = req.query;
    plan.find(query, function(result) {
        res.json(result);
    });
});

router.post('/register',VerifyToken, function(req, res, next) {
    req.body.user_id = req.decoded.user_id
    const addData = req.body;
    plan.register(addData, function(result) {
        res.json(result);
    });
});

router.put('/update',VerifyToken, function(req, res, next) {
    req.body.user_id = req.decoded.user_id
    const addData = req.body;
    plan.update(addData, function(result) {
        res.json(result);
    });
});

router.delete('/delete',VerifyToken, function(req, res, next) {
    req.body.user_id = req.decoded.user_id
    const addData = req.body;
    plan.remove(addData, function(result) {
        res.json(result);
    });
});

module.exports = router;