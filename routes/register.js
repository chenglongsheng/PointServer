var express = require('express');
var db = require('../model/db.js')
var router = express.Router();

/* GET register listing. */
router.get('/', function (req, res, next) {
  let message = req.query;
  // console.log(message)
  let username = message.newusername;
  let password = message.newpassword;
  let feedBack = username + password;
  res.send(feedBack);
});

// router.post('/', function (req, res, next) {
//   console.log(req.body)
//   let newUser = req.body
//   let username = newUser.params.newusername
//   let password = newUser.params.newpassword
//   console.log(username)
//   console.log(password)
//   res.send('这是注册界面Post');  
// });


/* POST register listing. */
router.post('/', function (req, res, next) {
  let inform = req.body.params
  let username = inform.newusername
  let password = inform.newpassword

  let isExistUser = "select user_name from users"
  let newUserSQL = 'INSERT INTO users (user_id,user_name,user_password) VALUES(1002,' + '"' + username + '"' + ',' + '"' + password + '"' + ')'

  let conn = db.connection()
  db.queryData(conn, isExistUser, '', function (resx) {
    console.log(resx)

    for (var i=0; i<resx.length; i++) {
      if (resx[i].user_name == username) {
        res.send({
          state: '0',
          message: '用户名重复'
        })
        break;
      }
    }
  })
  db.close(conn)


  
  // // console.log(newUserSQL)
  // let conn = db.connection()
  // db.insert(conn, newUserSQL, '', function (insertId) {
  //   console.log(insertId + "success")
  // })
  // db.close()

})

module.exports = router;
