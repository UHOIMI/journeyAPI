var express = require('express');
var router = express.Router();
var multer = require('multer');

var storage = multer.diskStorage({
    // ファイルの保存先を指定
    destination: function (req, file, cb) {
      cb(null, './uploads')
    },
    // ファイル名を指定(オリジナルのファイル名を指定)
    filename: function (req, file, cb) {
      cb(null, file.originalname)
    }
  })

  var upload = multer({ storage: storage }).single('image');

//var upload = multer({ dest: './uploads/' }).single('image');

router.get('/', function(req, res, next) {
    res.render('index', { title: 'Express' });
  });

router.post('/upload', function(req, res) {
  upload(req, res, function(err) {
    if(err) {
      res.json("Failed to write " + req.file.destination + " with " + err);
    } else {
      res.json("uploaded " +  req.file.filename + " Size: " + req.file.size);
    }
  });
});

module.exports = router;