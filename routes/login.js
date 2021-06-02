var express = require('express');
var router = express.Router();
var db = require('../model/db.js')

router.get('/', function (req, res, next) {
    let message = req.query;
    // console.log(message)
    let username = message.username;
    let password = message.password;
    let feedBack = username + password;
    res.send(feedBack);
    // next()
});

router.post('/', function (req, res, next) {
    let inform = req.body.params
    let username = inform.username
    let password = inform.password

    let loginSQL = 'select user_name,user_password from users'

    // res.send(username+password)
    let conn = db.connection()
    db.queryCheck(conn, loginSQL, '', function (resx) {
        // console.log(resx)
        for (var i = 0; i < resx.length; i++) {
            var existUserName = resx[i].user_name
            var existUserPassword = resx[i].user_password

            if (existUserName == username && existUserPassword == password) {
                res.send({
                    state: '1'
                })
                // console.log(1)
                break
            } else {
                res.send({
                    state: '0'
                })
                break
            }
        }
    })
    db.close(conn)
})

module.exports = router;
