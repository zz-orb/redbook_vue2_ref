// app.js
const express = require('express');
const app = express();

// import the api router
// const apiRouter = require('./router/template.js');

const 登录 = require('./router/登录/index.js')
const 发现 = require('./router/发现/index.js')
const 点赞 = require('./router/点赞/index.js')
const 收藏 = require('./router/收藏/index.js')
const 发布 = require('./router/发布/index.js')
const 笔记管理 = require('./router/笔记管理/index.js')
const 购物 = require('./router/购物/index.js')
const 购物车 = require('./router/购物车/index.js')
const 订单 = require('./router/订单/index.js')
const 个人资料 = require('./router/个人资料/index.js')
const 商品后台管理 = require('./router/商品后台管理/index.js')
const 报表 = require('./router/报表/index.js')

// 允许跨域
app.all('*', function(req, res, next) {
    // console.log(req.headers.origin)
    // console.log(req.environ)
    res.header("Access-Control-Allow-Origin", req.headers.origin);
    // res.header("Access-Control-Allow-Origin", '*');
    res.header("Access-Control-Allow-Headers", "Content-Type,Content-Length, Authorization, Accept,X-Requested-With");
    res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
    res.header("Access-Control-Allow-Credentials","true");
    res.header("X-Powered-By",' 3.2.1')
    if(req.method === "OPTIONS") res.send(200);/*让options请求快速返回*/
    else  next();
});
   

// mount the api router with /api prefix
app.use('/', 登录);
app.use('/', 发现);
app.use('/', 点赞);
app.use('/', 收藏);
app.use('/', 发布);
app.use('/', 笔记管理);
app.use('/', 购物);
app.use('/', 购物车);
app.use('/', 订单);
app.use('/', 个人资料);
app.use('/', 商品后台管理);
app.use('/', 报表);

app.use(express.static('public'))

app.listen(3000, () => {
  console.log('Express Server running at http://localhost:3000/ ctrl+鼠标左键 访问 ');
});
