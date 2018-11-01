var jwt = require('jsonwebtoken');
var Auconfig = require('./Auconfig');
function verifyToken(req, res, next) {
  // header か　url parameters か post parametersからトークンを取得する
  var token = req.body.token || req.query.token || req.headers['x-access-token'];

  if (token) {

    // jwtの認証をする
    jwt.verify(token, Auconfig.secret, function(error, decoded) {
      if (error) {
        return res.json({ status:'404',record: null, message: 'トークンの認証に失敗しました。' });
      } else {
        // 認証に成功したらdecodeされた情報をrequestに保存する
        req.decoded = decoded;
        console.log(decoded);
        next();
      }
    });

  } else {
    // トークンがなければエラーを返す
    return res.status(403).send({
        status:'404',record: null, message: 'トークンがありません' 
    });

  }
}
module.exports = verifyToken;