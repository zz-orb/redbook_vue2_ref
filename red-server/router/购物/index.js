// api.js
const express = require('express');
const router = express.Router();
const fs = require('fs');

// 商品内容 http://localhost:8080/shopping/content/{goodsId}
router.get('/shopping/content/:noteId', (req, res) => {

    fs.readFile('./JSON_DATA/购物/商品内容.json', 'utf8', (err, data) => {
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

// 商品内容页面直接结算 （等待开发中）
router.post('/shopping/settle', (req, res) => {

    fs.readFile('./JSON_DATA/购物/商品内容页面直接结算.json', 'utf8', (err, data) => {
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

// 商品首页面 http://localhost:8080/shopping
router.get('/shopping', (req, res) => {

    fs.readFile('./JSON_DATA/购物/商品首页面.json', 'utf8', (err, data) => {
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

// 搜索 http://localhost:8080/shopping/search
router.get('/shopping/search', (req, res) => {

    fs.readFile('./JSON_DATA/购物/搜索.json', 'utf8', (err, data) => {
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