// api.js
const express = require('express');
const router = express.Router();
const fs = require('fs');

// define some api endpoints
router.get('/users', (req, res) => {

    fs.readFile('./JSON_DATA/笔记详情.json', 'utf8', (err, data) => {
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

router.post('/found', (req, res) => {
  // create a new user
});

// 定义一个路由，匹配 /found/content/:noteId 的请求
router.get('/found/content/:noteId', (req, res) => {
  // 获取路由参数 noteId 的值
  const noteId = req.params.noteId;
  // 根据 noteId 来处理请求，比如查询数据库或返回响应
  // ...
  fs.readFile('./JSON_DATA/发现/笔记内容.json', 'utf8', (err, data) => {
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
