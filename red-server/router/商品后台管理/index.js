// api.js
const express = require('express');
const router = express.Router();
const fs = require('fs');

// 删除商品 put http://localhost:8080/backend/delete/{goodsId}
router.put('/backend/delete/:goodsId', (req, res) => {

    fs.readFile('./JSON_DATA/商品后台管理/删除商品.json', 'utf8', (err, data) => {
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

// 商品分页列表 get http://localhost:8080/backend
router.get('/backend', (req, res) => {

    fs.readFile('./JSON_DATA/商品后台管理/商品分页列表.json', 'utf8', (err, data) => {
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

// 修改商品内容 put http://localhost:8080/backend/update
router.put('/backend/update/:goodsId', (req, res) => {

    fs.readFile('./JSON_DATA/商品后台管理/修改商品内容.json', 'utf8', (err, data) => {
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