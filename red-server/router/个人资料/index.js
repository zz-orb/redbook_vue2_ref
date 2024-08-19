// api.js
const express = require('express');
const router = express.Router();
const fs = require('fs');

// 获取个人资料 GET http://localhost:8080/userInfo
router.get('/userInfo', (req, res) => {

    fs.readFile('./JSON_DATA/个人资料/获取个人资料.json', 'utf8', (err, data) => {
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

// 修改个人资料 PUT http://localhost:8080/userInfo/update
router.put('/userInfo/update', (req, res) => {

    fs.readFile('./JSON_DATA/个人资料/修改个人资料.json', 'utf8', (err, data) => {
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

// 点赞信息 GET http://localhost:8080/userInfo/praise
router.get('/userInfo/praise', (req, res) => {

    fs.readFile('./JSON_DATA/个人资料/点赞信息.json', 'utf8', (err, data) => {
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

// 收藏信息 GET http://localhost:8080/userInfo/collection
router.get('/userInfo/collection', (req, res) => {

    fs.readFile('./JSON_DATA/个人资料/收藏信息.json', 'utf8', (err, data) => {
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

// 更新头像 POST http://localhost:8080/userInfo/headphoto
router.post('/userInfo/headphoto', (req, res) => {

    fs.readFile('./JSON_DATA/个人资料/更新头像.json', 'utf8', (err, data) => {
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

// 提现 PUT http://localhost:8080/userInfo/withdraw
router.put('/userInfo/withdraw', (req, res) => {

  fs.readFile('./JSON_DATA/个人资料/提现.json', 'utf8', (err, data) => {
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