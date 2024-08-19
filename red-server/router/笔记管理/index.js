// api.js
const express = require('express');
const router = express.Router();
const fs = require('fs');

// 笔记管理页面（分页） http://localhost:8080/manage
router.get('/manage', (req, res) => {
    fs.readFile('./JSON_DATA/笔记管理/笔记管理页面.json', 'utf8', (err, data) => {
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

// 删除笔记 http://localhost:8080/manage/remove/{noteId}
router.put('/manage/remove/:noteId', (req, res) => {
  // 获取路由参数 noteId 的值
  const noteId = req.params.noteId;
  // 根据 noteId 来处理请求，比如查询数据库或返回响应
  // ...
  fs.readFile('./JSON_DATA/笔记管理/删除笔记.json', 'utf8', (err, data) => {
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