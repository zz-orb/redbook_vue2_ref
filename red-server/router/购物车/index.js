// api.js
const express = require('express');
const router = express.Router();
const fs = require('fs');

// 添加商品到购物车 post http://localhost:8080/shoppingCart/add/{goodsId}
router.post('/shoppingCart/add/:goodsId', (req, res) => {
    fs.readFile('./JSON_DATA/购物车/添加商品到购物车.json', 'utf8', (err, data) => {
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

// 增加购物车商品数量 post http://localhost:8080/shoppingCart/addCount/{goodsId}
router.post('/shoppingCart/addCount/:goodsId', (req, res) => {
    fs.readFile('./JSON_DATA/购物车/增加购物车商品数量.json', 'utf8', (err, data) => {
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

// 减少购物车商品数量 post http://localhost:8080/shoppingCart/reduceCount/{goodsId}
router.post('/shoppingCart/reduceCount/:goodsId', (req, res) => {
    fs.readFile('./JSON_DATA/购物车/减少购物车商品数量.json', 'utf8', (err, data) => {
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

// 删除购物车商品 put http://localhost:8080/shoppingCart/remove/{goodsId}
router.put('/shoppingCart/remove/:goodsId', (req, res) => {
    fs.readFile('./JSON_DATA/购物车/删除购物车商品.json', 'utf8', (err, data) => {
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

// 所有购物车商品信息 get http://localhost:8080/shoppingCart
router.get('/shoppingCart', (req, res) => {

    fs.readFile('./JSON_DATA/购物车/所有购物车商品信息.json', 'utf8', (err, data) => {
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


// 购物车结算 post http://localhost:8080/shoppingCart/settlement
router.post('/shoppingCart/settlement', (req, res) => {
    fs.readFile('./JSON_DATA/购物车/购物车结算.json', 'utf8', (err, data) => {
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