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
      cb(null, Date.now() + file.originalname)
    }
  })

  var upload = multer({ storage: storage }).array('image',3);

//var upload = multer({ dest: './uploads/' }).single('image');

router.get('/', function(req, res, next) {
    res.render('index', { title: 'Express' });
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

module.exports = router;