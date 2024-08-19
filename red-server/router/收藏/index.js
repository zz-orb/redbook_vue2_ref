// api.js
const express = require('express');
const router = express.Router();
const fs = require('fs');

// 收藏和取消收藏 http://localhost:8080/collection/{noteId}
router.post('/collection/:noteId', (req, res) => {

    fs.readFile('./JSON_DATA/收藏/收藏.json', 'utf8', (err, data) => {
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