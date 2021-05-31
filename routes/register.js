var express = require('express');
var db = require('../model/db.js')
var router = express.Router();

// 对Date的扩展，将 Date 转化为指定格式的String
// 月(M)、日(d)、小时(h)、分(m)、秒(s)、季度(q) 可以用 1-2 个占位符，
// 年(y)可以用 1-4 个占位符，毫秒(S)只能用 1 个占位符(是 1-3 位的数字)
// 例子：
// (new Date()).Format("yyyy-MM-dd hh:mm:ss.S") ==> 2021-05-24 21:36:48
// (new Date()).Format("yyyy-M-d h:m:s.S")   ==> 2021-5-4 21:36:48
Date.prototype.Format = function (fmt) {
  var o = {
    "M+": this.getMonth() + 1, //月份
    "d+": this.getDate(), //日
    "h+": this.getHours(), //小时
    "m+": this.getMinutes(), //分
    "s+": this.getSeconds(), //秒
    "q+": Math.floor((this.getMonth() + 3) / 3), //季度
    "S": this.getMilliseconds() //毫秒
  };
  if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
  for (var k in o)
    if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
  return fmt;
}

/* GET register listing. */
router.get('/', function (req, res, next) {
  let message = req.query;
  // console.log(message)
  let username = message.newusername;
  let password = message.newpassword;
  let feedBack = username + password;
  res.send(feedBack);
});

// 检查用户信息
router.get('/check', function (req, res, next) {
  let inform = req.query
  var username = inform.newusername
  let querySQL = "select * from users"

  let conn = db.connection()

  db.queryCheck(conn, querySQL, "", function (resx) {
    console.log(resx)
    console.log(inform)

    for (var i = 0; i < resx.length; i++) {
      var flag = 0
      var existUsername = resx[i].user_name
      if (existUsername == username) {
        flag = 1
        break
      } else {
        flag = 0
      }
    }
    if (flag) {
      res.send({
        state: "fail",
        message: "用户名已被使用"
      })
    } else {
      res.send({
        state: "success",
        message: "用户名未被使用"
      })
    }
  })

  db.close(conn)
  // console.log(username)

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

  // SQL语句
  let isExistUser = "select user_name from users"
  let newUserSQL = 'INSERT INTO users (user_id,user_name,user_password,user_create_time) VALUES (1002,' + '"' + username + '"' + ',' + '"' + password + '"' + ',' + '"' + (new Date()).Format("yyyy-MM-dd hh:mm:ss") + '"' + ')'

  var isExist = false;
  let conn = db.connection()
  db.queryData(conn, isExistUser, '', function (resx) {
    // console.log(resx)
    for (var i = 0; i < resx.length; i++) {
      if (resx[i].user_name == username) {
        res.send({
          state: '0',
          message: '用户名已注册'
        })
        isExist = true;
        break
      } else {
        isExist = false
      }
    }
  })

  db.insert(conn, newUserSQL, '', function (insertId) {
    if (!isExist) {
      console.log(insertId + "success")
      res.send({
        state: '1',
        message: '注册成功'
      })
      isExist = false
    }
    else {
      isExist = false
    }
  })

  db.close(conn)


  // if(!isExist){
  //   let conn = db.connection()
  //   db.insert(conn, newUserSQL, '', function (insertId) {
  //     console.log(insertId + "success")
  //     res.send({
  //       state: '1',
  //       message: '注册成功'
  //     })
  //   })
  //   isExist = false
  //   db.close(conn)
  // }
  // console.log(newUserSQL)


})

module.exports = router;
