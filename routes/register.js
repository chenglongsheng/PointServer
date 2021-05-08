var express = require('express');
var router = express.Router();

/* GET register listing. */
router.get('/', function(req, res, next) {
  res.send('这是注册界面Get');
});

router.post('/', function(req, res, next) {
    res.send('这是注册界面Post');
  });

module.exports = router;
