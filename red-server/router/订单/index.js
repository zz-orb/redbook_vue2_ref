// api.js
const express = require('express');
const router = express.Router();
const fs = require('fs');

// 订单首页面 http://localhost:8080/order
router.get('/order', (req, res) => {

    fs.readFile('./JSON_DATA/订单/订单首页面.json', 'utf8', (err, data) => {
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


// 对订单中的商品进行评论 http://localhost:8080/order/comment/{goodsId}
router.post('/order/comment/:goodsId', (req, res) => {
    fs.readFile('./JSON_DATA/订单/对订单中的商品进行评论.json', 'utf8', (err, data) => {
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