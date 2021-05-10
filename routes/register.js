var express = require('express');
var router = express.Router();

/* GET register listing. */
router.get('/', function(req, res, next) {
  let message = req.query;
  // console.log(message)
  let username = message.newusername;
  let password = message.newpassword;
  let feedBack = username+password;
  res.send(feedBack);
});

router.post('/', function(req, res, next) {
  // console.log(req.body)
  let newUser = req.body
  let username = newUser.params.newusername
  let password = newUser.params.newpassword
  console.log(username)
  console.log(password)
  res.send('这是注册界面Post');
});

module.exports = router;
