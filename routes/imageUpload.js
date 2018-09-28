var express = require('express');
var router = express.Router();
var multer = require('multer');
var fs = require('fs');

//保存先
var Uppath = './uploads'; 

var storage = multer.diskStorage({
    // ファイルの保存先を指定
    destination: function (req, file, cb) {
      cb(null, Uppath)
    },
    // ファイル名を指定(オリジナルのファイル名を指定)
    filename: function (req, file, cb) {
      cb(null, Date.now() + file.originalname)
    }
  })

var upload = multer({ storage: storage ,limits:{fileSize:5000000}}).array('image',3);

router.get('/', function(req, res){
   
});

router.post('/upload', function(req, res) {
  upload(req, res, function(err) {
    if(err) {
        res.json('error');
    } else {
        var filepaths = req.files.map(function(file) {
            return file.path;
        });
        res.json(filepaths);
    }
  });
});

router.delete('/delete', function(req, res){
    var path = (Uppath +'/'+ req.query.image_name);
    fs.unlink(path,function(err){
        if(err){
            res.json(err);
        } else {
            res.json('success');
        }
    });
});

module.exports = router;