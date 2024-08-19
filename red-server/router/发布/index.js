// api.js
const express = require('express');
const router = express.Router();
const fs = require('fs');

// 发布笔记 http://localhost:8080/release/note
router.post('/release/note', (req, res) => {
    fs.readFile('./JSON_DATA/发布/发布笔记.json', 'utf8', (err, data) => {
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

// 上传视频 http://localhost:8080/release/uploadVideo
router.post('/release/uploadVideo', (req, res) => {
    fs.readFile('./JSON_DATA/发布/上传视频.json', 'utf8', (err, data) => {
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

// 上传图片 http://localhost:8080/release/uploadPicture
router.post('/release/uploadPicture', (req, res) => {
    fs.readFile('./JSON_DATA/发布/上传图片.json', 'utf8', (err, data) => {
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