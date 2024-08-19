// api.js
const express = require('express');
const router = express.Router();
const fs = require('fs');

// 普通用户登录
router.post('/user/userLogin', (req, res) => {
    fs.readFile('./JSON_DATA/登录/普通用户登录.json', 'utf8', (err, data) => {
        if (err) {
          console.error(err);
          res.status(500).send('Server error');
        } else {
          // parse json string to object
          const obj = JSON.parse(data);
          // send json object as response
          res.json(obj);
        }
      });
});

// 用户注册
router.post('/user/register', (req, res) => {
    fs.readFile('./JSON_DATA/登录/用户注册.json', 'utf8', (err, data) => {
        if (err) {
          console.error(err);
          res.status(500).send('Server error');
        } else {
          // parse json string to object
          const obj = JSON.parse(data);
          // send json object as response
          res.json(obj);
        }
      });
});

// 头像上传
router.post('/user/headphoto', (req, res) => {
    fs.readFile('./JSON_DATA/登录/头像上传.json', 'utf8', (err, data) => {
        if (err) {
          console.error(err);
          res.status(500).send('Server error');
        } else {
          // parse json string to object
          const obj = JSON.parse(data);
          // send json object as response
          res.json(obj);
        }
      });
});

// 发送短信验证码
router.post('/user/smsLogin', (req, res) => {
    fs.readFile('./JSON_DATA/登录/发送短信验证码.json', 'utf8', (err, data) => {
        if (err) {
          console.error(err);
          res.status(500).send('Server error');
        } else {
          // parse json string to object
          const obj = JSON.parse(data);
          // send json object as response
          res.json(obj);
        }
      });
});

// 管理员后台登录
router.post('/user/adminLogin', (req, res) => {
    fs.readFile('./JSON_DATA/登录/管理员后台登录.json', 'utf8', (err, data) => {
        if (err) {
          console.error(err);
          res.status(500).send('Server error');
        } else {
          // parse json string to object
          const obj = JSON.parse(data);
          // send json object as response
          res.json(obj);
        }
      });
});


// export the router
module.exports = router;