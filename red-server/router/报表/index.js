// api.js
const express = require('express');
const router = express.Router();
const fs = require('fs');

// 返利报表 get http://localhost:8080/report/rebate
router.get('/report/rebate', (req, res) => {

    fs.readFile('./JSON_DATA/报表/返利报表.json', 'utf8', (err, data) => {
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

// 收益报表 get http://localhost:8080/report/earnings
router.get('/report/earnings', (req, res) => {

    fs.readFile('./JSON_DATA/报表/收益报表.json', 'utf8', (err, data) => {
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