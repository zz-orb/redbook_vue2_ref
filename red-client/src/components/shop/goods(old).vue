<template>
  <div class="Goods">

    <!-- 面包屑 -->
    <div>
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/Red' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>购物区</el-breadcrumb-item>
        <el-breadcrumb-item>潮品闲逛</el-breadcrumb-item>
      </el-breadcrumb>
    </div>

    <!-- 轮播图 -->
    <div style="padding-top:10px">
      <h3> <i class="el-icon-coffee-cup"></i> 今日推荐</h3>
    </div>
    <div>
      <template>
        <el-carousel type="card" height="340px" :autoplay="true" :interval="2100" :loop="true">
          <el-carousel-item v-for="(item, index) in this.lunbo" :key="index">
            <img :src="item.pic" alt="" srcset="">
          </el-carousel-item>
        </el-carousel>
      </template>
    </div>

    <div>
      <h3> <i class="el-icon-present"></i> 商品列表</h3>
    </div>
    <div class="items">
      <div class="itemContainer" v-for="good in goods" :key="good.goods_id" @click="showDialog(good.goods_id)">
        <!-- 展示图 -->
        <div class="one">
          <img :src="good.goods_picture" alt="" srcset="">
        </div>

        <div class="two">
          <!-- 标题 -->
          <div class="title">
            <h3>{{ good.goods_name }}</h3>
          </div>
          <!-- 描述 -->
          <div class="descrip">
            <span>{{ good.goods_describe }}</span>
          </div>
          <!-- 价格 -->
          <div class="price">
            <span>{{ good.goods_price }}</span> 元起
          </div>
        </div>

      </div>
    </div>



    <el-dialog title="商品详情" :visible.sync="dialogVisible" width="38%" :before-close="handleClose">

      <div>
        <h4>商品编号:{{ goodid_dialog }}</h4>
      </div>

      <div>
        <div style="text-align: center;">
          <img :src="this.goods[this.goodid_dialog - 1].goods_picture" alt="商品图片" style="width:80%;height: auto;">
        </div>

        <h1 style="color:rgb(255, 119, 0); font-size: 30px;">￥{{ this.goods[this.goodid_dialog - 1].goods_price }}</h1>
        <h3 style="padding-top:5px">{{ this.goods[this.goodid_dialog - 1].goods_name }}</h3>
        <span style="padding-top:5px">{{ this.goods[this.goodid_dialog - 1].goods_describe }}</span>
      </div>

      <br>
      <div>
        <h4>评价信息：</h4> <br>
      </div>
      <el-timeline :reverse="false">
        <el-timeline-item v-for="(comment, index) in goods_detail.comment" :key="index"
          :timestamp="comment.says_time | dateFormat">
          {{ comment.says }} ——{{ comment.username }}
        </el-timeline-item>
      </el-timeline>


      <span slot="footer" class="dialog-footer">
        <el-button type="info" @click="dialogVisible = false">返回</el-button>
        <el-button type="primary" @click="addShopCart()">加入购物车</el-button>
      </span>
    </el-dialog>
  </div>
</template>
  
<script>

export default {
  data() {
    return {
      //  商品数据
      goods: [
        {
          "goods_describe": "为发烧而生",
          "goods_id": 1,
          "goods_name": "红米note",
          "goods_picture": "http://localhost:8888/sports_shop_backend_war/users_picture/kzb68up.jpg",
          "goods_price": 799
        }
      ],
      // dialog对话框的启动与否
      dialogVisible: false,
      // 打开dialog的商品id
      goodid_dialog: 1,
      // 轮播图图片地址
      lunbo: [
        {
          pic: require('../../assets/mypic/lunbo1.jpg')
        },
        {
          pic: require('../../assets/mypic/lunbo2.jpg')
        },
        {
          pic: require('../../assets/mypic/lunbo3.jpg')
        },
        {
          pic: require('../../assets/mypic/lunbo4.jpg')
        },
      ],
      // 商品详情数据，带有评论数据
      goods_detail: {
        "comment": [
          {
            "order_id": 3,
            "says": "薇我50，肯德基疯狂星期四",
            "says_id": 1,
            "says_time": 1670083200000,
            "user_id": 2,
            "username": "冰镇生鲜"
          },
          {
            "order_id": 3,
            "says": "薇我30，肯德基疯狂星期四",
            "says_id": 2,
            "says_time": 1670083200000,
            "user_id": 2,
            "username": "冰镇生鲜"
          },
          {
            "order_id": 3,
            "says": "薇我20，肯德基疯狂星期四",
            "says_id": 3,
            "says_time": 1670169600000,
            "user_id": 2,
            "username": "冰镇生鲜"
          },
          {
            "order_id": 3,
            "says": "薇我10，肯德基疯狂星期四",
            "says_id": 4,
            "says_time": 1670688000000,
            "user_id": 2,
            "username": "冰镇生鲜"
          }
        ],
        "goods_describe": "为发烧而生",
        "goods_id": 1,
        "goods_name": "红米note",
        "goods_picture": "http://localhost:8888/sports_shop_backend_war/users_picture/kzb68up.jpg",
        "goods_price": 799
      },

    }
  },
  mounted() {
    this.getAllGoods()
  },
  methods: {


    // 关闭商品详情对话框
    handleClose(done) {
      this.$confirm('确认关闭？')
        .then(_ => {
          done();
        })
        .catch(_ => { });
    },


    // 展示商品详情对话框
    showDialog(goodid) {
      // 通过id获取商品详情 getGoodAndComment
      this.$http({
        url: '/getGoodAndComment',
        params: {
          //键值对
          goods_id: goodid
        },
        method: 'post'
      }).then(res => {
        // 登录成功判断，以及保存token
        if (res.data.meta.status !== 200) {
          return this.$message.error('获取商品详情失败')
        } else {
          this.$message.success('获取商品详情信息成功')

          // console.log(res.data.data.comment)
          this.goods_detail = res.data.data;
          this.goodid_dialog = goodid;

          this.dialogVisible = true;
        }
      }).catch(res => {
        console.log(res);
      })
    },

    // 添加商品到购物车
    addShopCart() {
      const params = {
          //键值对
          shopping_count: 1,
          shopping_amount: this.goods_detail.goods_price,
          goods_id: this.goods_detail.goods_id,
          goods_name: this.goods_detail.goods_name,
          goods_price: this.goods_detail.goods_price,
          goods_picture: this.goods_detail.goods_picture,
          goods_describe: this.goods_detail.goods_describe,
          user_id: window.sessionStorage.getItem('user_id'),
          username: window.sessionStorage.getItem('username')
        }
      this.$http({
        url: '/addShopCartToOrders',
        params,
        method: 'post'
      }).then(res => {
        // 登录成功判断，以及保存token
        if (res.data.meta.status !== 200) {
          return this.$message.error('添加商品到购物车失败')
        } else {
          this.$message.success('添加购物车商品成功')
          // console.log(res)
          this.dialogVisible = false;
        }
      }).catch(err => {
        console.log(err);
      })
    },


    // 加载商品数据
    getAllGoods() {
      // axios.post的构造函数有顺序，不可乱
      this.$http({
        method: 'post',
        url: "/getAllGoods",
      }).then(data => {
        this.$message.success("获取商品数据成功")
        this.goods = data.data.data
        // console.log(this.goods)
      }).catch(response => {
        console.log(response)
      })
    }
  }
}
</script>

<style>
.Goods {
  width: 100%;
  height: 100%;
}

.items {
  display: flex;
  flex-grow: 0.2;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: center;
}

.itemContainer {
  margin: 15px;

  width: 234px;
  height: 340px;
  background-color: #fff;
  position: relative;
  text-align: center;
  border: 0.5px solid rgba(217, 217, 217, 0.842);
  border-radius: 8px;
  overflow: hidden;
  /* 细节慢速 */
  transition: all 0.35s;
}

/* 鼠标悬停 */
.itemContainer:hover {
  /* transform: scale(1.025); */
  transform: translate3d(2%, 2%, 0)scale(1.015);
  /* width: 240px;
    height: 348px; */
  box-shadow: 1px 1px 8px rgba(94, 88, 84, 0.757);
}

.one {
  width: 100%;
  height: 65%;
}

.one img {
  width: 210px;
  height: 210px;
  position: absolute;
  top: 10px;
  left: 50%;
  transform: translateX(-50%);
}

.two {
  width: 100%;
  height: 32%;
  line-height: 20px;
  /* background-color: bisque; */

  position: absolute;
  bottom: 0;
}

.title {
  margin-top: 2px;
  height: 30px;
  line-height: 30px;
  /* background-color: blueviolet; */
}

.descrip {
  margin-top: 5px;
  height: 20px;
  line-height: 20px;
  /* background-color: rgb(70, 226, 43); */
}

.price {
  margin-top: 17px;
  height: 20px;
  line-height: 20px;
  /* background-color: rgb(43, 226, 211); */
  color: rgb(255, 119, 0);
}

/* 轮播图css */
.el-carousel__item {
  overflow: hidden;
  /* border: 1px solid rgba(142, 142, 142, 0.498); */
  border-radius: 10px;
}

.el-carousel__item img {
  height: auto;
  width: 100%;
}

.el-carousel__item:nth-child(2n) {
  background-color: rgb(245, 245, 245);
}

.el-carousel__item:nth-child(2n+1) {
  background-color: rgb(245, 245, 245);
}
</style>