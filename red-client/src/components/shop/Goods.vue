<template>
  <div>
    <div class="opt">
      <el-menu default-active="1" mode="horizontal">
        <el-menu-item index="1" @click="changeShow('推荐')">推荐</el-menu-item>
        <el-menu-item index="2" @click="changeShow('家居')">家居</el-menu-item>
        <el-menu-item index="3" @click="changeShow('平价')">平价</el-menu-item>
        <el-menu-item index="4" @click="changeShow('潮流')">潮流</el-menu-item>
        <el-menu-item index="5" @click="changeShow('宝藏好店')">宝藏好店</el-menu-item>
        <el-menu-item index="6" @click="changeShow('其他')">其他</el-menu-item>
      </el-menu>
    </div>
    <!-- 核心内容 -->
    <div class="waterful">
       <div class="watch_item"  v-for="item in show_data"  >
           <img :src="item.picture" alt="" srcset="" width="175px" height="auto" @click="openInfo(item.id)">

           <div class="watch_item_middle"><span>{{ item.goodsName }}</span></div>

           <div class="watch_item_bottom">
            <div>
               <el-avatar :src="headphoto" size="small"> user </el-avatar>
            </div>
            <div>
              <span class="name"> red官方 </span>
            </div>
            <div >
               {{item.price}}
            </div>
           </div>
       </div>
    </div>

    <!-- 详情内容，对话框 -->
    <el-dialog
      :visible.sync="dialogVisible"
      top="10px"
      width="900px"
      height="80%"
      :before-close="handleClose"
      append-to-body
      style="border-radius: 20px;">

      <div class="dialog_conten">

        <!-- 媒体区域，v-if 自动选择图片或者视频 -->
        <div class="dialog_conten_media">

           <!-- 自动缩放，居中定位 -->
           <div class="media_position">
              <!-- 展示图片 -->
              <el-image :src="targetData.goods.picture" fit="contain"></el-image>
           </div>
        </div>
        
        <!-- 内容信息区域 -->
        <div class="dialog_conten_imfo">

           <!-- 第一行：{头像 姓名，关注} -->
           <div class="one_imfo">
             <el-avatar :src="headphoto" size="large" style="margin-left: 20px;"> user </el-avatar>
             <div class="one_imfo_username_span">
              <span > &nbsp; &nbsp; Red官方</span>
             </div>
             <!-- <el-button type="primary"  round style="margin-left: 20px;">关 注</el-button> -->
           </div>

           <!-- 第二行（可滚动内容）-->
           <div class="two_imfo">
          
              <!-- 内容: {标题，内容, 创建时间} -->
              <div>
                <div class="two_imfo_title">
                 {{ targetData.goods.goodsName }}
                </div>
                <h4>商品内容:</h4>
                <div class="two_imfo_content">
                 {{ targetData.goods.goodsContent }}
                </div>
                <div class="two_imfo_created">
                  {{ targetData.goods.created | dateFormat}}
                </div>
                <h4>商品评论:</h4>
                <div class="two_imfo_created">
                  共计 {{ targetData.goodsComment.length }} 条评论
                </div>
                <hr>
              </div>

              <!-- 评论：{共计评论数，评论者头像，评论信息} -->
              <div>
                <!-- 使用v-for遍历渲染评论 -->
                <div v-for="item in targetData.goodsComment" >
                  <div style="color: #303133;font-size: 15px;font-weight: 800;">
                    <el-avatar :src="item.headphoto" size="small" > user </el-avatar>
                    {{ item.username }}
                  </div>
                  <div >
                    {{ item.comment }}
                  </div>
                  <div class="two_imfo_created">
                    {{ item.created | dateFormat}}
                  </div>
                  <hr>
                </div>
                <div style="text-align: center;"> -THE END-</div>
              </div>
           </div>
          
           <!-- 第三行：{点赞，分析 发起评论} -->
           <div class="three_comment">
            <hr>
            <div class="three_icon">
              <i class="el-icon-bank-card" ></i> <span>商品价格: ￥{{ targetData.goods.price }} 元</span> &nbsp;&nbsp;&nbsp;&nbsp;
              <i class="el-icon-collection-tag"></i> <span>商品标签： {{ targetData.goods.goodsTag }}</span>
            </div>

            <div class="goods_three_input">
              <!-- <el-input placeholder="搜索小红书" v-model="comment_text">
                    <el-button slot="append" icon="el-icon-chat-dot-round" @click="sendComment" ></el-button>
              </el-input> -->
              <el-input-number v-model="goodsCount" @change="handleChange" :min="1" :max="10" label="商品数量"></el-input-number>  &nbsp;
              <el-button type="primary" icon="el-icon-shopping-cart-1" @click="addShoppingCart">加入购物车</el-button>
            </div>
            
           </div>

        </div>
      </div>
    </el-dialog>
  </div>
</template>
<script>
// import VideoPlayer from '@/components/explore/VideoPlayer.vue';
// 在组件文件中导入Vue模块
import Vue from 'vue';

export default {
  // name: 'VideoExample',
  // components: {
  //   VideoPlayer
  // },
  data() { 
    return {
      // 商品数量
      goodsCount: 1,
      // 商品详情
      targetData: {
        "goods": {
          "created": "2023-04-30T06:19:37.000+00:00",
          "updated": null,
          "id": 12,
          "goodsName": "创意家居日用小商品厨房用品",
          "price": 1.61,
          "goodsContent": "品牌: other/其他风格: 日式包装种类: 其他颜色分类: 长方形毛重: 4g适用节日: 春节是否可定制: 否",
          "goodsTag": "平价",
          "picture": "https://tanhua-zxm.oss-cn-hangzhou.aliyuncs.com/%E5%B0%8F%E7%BA%A2%E4%B9%A6/%E5%95%86%E5%93%81/%E5%B9%B3%E4%BB%B7/new%20-%20%E5%89%AF%E6%9C%AC/QQ%E6%88%AA%E5%9B%BE20230425183202.png",
          "returnRate": 0.2,
          "deleted": 0
        },
        "goodsComment": [
          {
            "created": "2023-04-25T11:21:44.000+00:00",
            "updated": "2023-04-25T15:39:39.000+00:00",
            "id": 23,
            "userId": 2,
            "goodsId": 12,
            "comment": "好用好用",
            "username": "足球张雨绮",
            "headphoto": "https://tanhua-zxm.oss-cn-hangzhou.aliyuncs.com/%E5%B0%8F%E7%BA%A2%E4%B9%A6/%E5%A4%B4%E5%83%8F/%E7%94%A8%E6%88%B7%E5%A4%B4%E5%83%8F/6.jpg",
            "deleted": 0
          },
          {
            "created": "2023-04-25T11:41:09.000+00:00",
            "updated": "2023-04-25T15:39:39.000+00:00",
            "id": 24,
            "userId": 34,
            "goodsId": 12,
            "comment": "便宜并且耐用！下次还来",
            "username": "阿棒的觅食计划",
            "headphoto": "https://tanhua-zxm.oss-cn-hangzhou.aliyuncs.com/%E5%B0%8F%E7%BA%A2%E4%B9%A6/%E5%A4%B4%E5%83%8F/%E7%94%A8%E6%88%B7%E5%A4%B4%E5%83%8F/50.jpg",
            "deleted": 0
          }
        ]
      },
      // videoJS m3u8播放器
      // videoOptions: {
      //   autoplay: true,
      //   controls: true,
      //   sources: [
      //   {
      //       src: require("@/assets/video/测试视频.mp4"),
      //       type: 'application/x-mpegURL'
      //     },
      //     {
      //       src: require("@/assets/video/测试视频.mp4"),
      //       type: 'video/mp4'
      //     }
      //   ]
      // },
      headphoto: require("@/assets/小红书头像.png"),
      // 对话框的展示与否
      dialogVisible : false,
      // 所有商品数据
      data: 
      {
        "所有商品": [
          {
            "created":"2023-04-30T06:19:17.000+00:00",
            "updated":null,
            "id":1,
            "goodsName":"创意家居生活用品",
            "price":18.5,
            "goodsContent":"品牌: 小凡家居风格: 时尚包装种类:",
            "goodsTag":"家居",
            "picture":"https://tanhua-zxm.oss-cn-hangzhou.aliyuncs.com/%E...",
            "deleted":0
           },
        ],
        "推荐商品":[
           {
            "created":"2023-04-30T06:19:17.000+00:00",
            "updated":null,
            "id":1,
            "goodsName":"创意家居生活用品",
            "price":18.5,
            "goodsContent":"品牌: 小凡家居风格: 时尚包装种类:",
            "goodsTag":"家居",
            "picture":"https://tanhua-zxm.oss-cn-hangzhou.aliyuncs.com/%E...",
            "deleted":0
           },
        ],
      },
      // 当前要展示的商品数据，按上方按钮切换
      show_data: [
          {
            "created":"2023-04-30T06:19:17.000+00:00",
            "updated":null,
            "id":1,
            "goodsName":"创意家居生活用品",
            "price":18.5,
            "goodsContent":"品牌: 小凡家居风格: 时尚包装种类:",
            "goodsTag":"家居",
            "picture":"https://tanhua-zxm.oss-cn-hangzhou.aliyuncs.com/%E...",
            "deleted":0
          },
      ],
    }
  },
  mounted () {
    this.getData();
  },
  methods: {

    // 获取首页数据
     getData() {
       this.$http({
         url: '/shopping',
         method: 'get'
       }).then(res => {
          //  console.log(res)
           this.data = res.data.data
           this.show_data = this.data.推荐商品
          //  console.log(this.show_data)
       }).catch(res => {
         console.log(res);
       })
    },


    // 查看详情 http://localhost:8080/shopping/content/{goodsId}
    openInfo (id) {
      // console.log(id)
      this.$http({
        url: '/shopping/content/'+id,
        method: 'get'
      }).then(res => {
          // console.log(res)
          this.targetData = res.data.data
          // console.log(this.targetData)
      }).catch(res => {
        console.log(res);
      })

      this.dialogVisible = true
    },


    // 关闭对话框
    handleClose(done) {
      done();
    },


    // 切换 瀑布流内容展示
    changeShow (type_str) {
      // 推荐   家居 平价 潮流 其他
      if ("推荐" == type_str) {
        this.show_data = this.data.推荐商品
      }
      else{
        var new_show_data = [];
        for (var i = 0; i < this.data.所有商品.length; i++) {
          var item = this.data.所有商品[i];
          if (item.goodsTag == type_str) {
            new_show_data.push(item)
          }
        }
        this.show_data = new_show_data;
      }
    },

    // 提供给父组件调用的搜索方法 http://localhost:8080/shopping/search
    children_search_note (search_text) {
      // console.log('调用成功')
      // console.log(search_text)
      this.$http({
        url: '/shopping/search',
        method: 'get',
        params: {
          param: search_text
        }
      }).then(res => {
        this.show_data = res.data.data
      }).catch(res => {
        console.log(res);
      })
    },
    
    // 选择商品数量监听
    handleChange(value) {
        console.log(value);
    },

    // 将商品加入购物车 http://localhost:3000/shoppingCart/add/{goodsId}
    addShoppingCart () {
      this.$http({
        url: '/shoppingCart/add/' + this.targetData.goods.id,
        method: 'post',
        params: {
          count: this.goodsCount
        }
      }).then(res => {
        this.$message.success(res.data.data)
      }).catch(res => {
        console.log(res);
      })
    }

  }
}
</script>
<style lang="less">
.opt {
  height: 40px;
  margin-bottom: 5px;
  .el-menu-item {
     height: 40px;
     line-height: 40px;
     border-radius: 20px;
     border: none;
     font-size: 16px;
     background-color: #fff;
     color: rgba(51,51,51,.8);
  }
  .el-menu-item.is-active {
     height: 40px;
     line-height: 40px;
     border-radius: 20px;
     border: none;
     background-color: #F8F8F8!important;
     color: #333;
     font-weight: 600;
  }
}

// 去除下划线，文本装饰线
.opt .el-menu--horizontal>.el-menu-item.is-active {
  border-bottom: none;
  text-decoration: none;
}
.opt .el-menu.el-menu--horizontal {
  border-bottom: none
}
.opt .el-menu--horizontal.el-menu {
  border-bottom: none
}

// 瀑布流布局
.waterful {
  padding-left: 10px;
  column-count: 5;//想要排成的列数
  column-gap: 0; // 列间距
  margin-bottom: 150px;
}

.watch_item {
  break-inside: avoid; //避免“瀑布流”内部的内容被断开
  width: 175px;
  margin-bottom: 12px;
  border-radius: 5px;
  // padding-bottom: 5px;
  img {
    border-radius: 10px;
  }
  .watch_item_middle {
    padding: 5px;
  }
  .watch_item_bottom {
    padding: 5px;
    height: 25px;
    line-height: 25px;
    text-align: center;
    font-weight: 500;
    font-size: 14px;
    color: #333;
    display: flex;
    justify-content: space-around;
    .name {
      padding-left: 10px;
      color: #666666;
      font-size: 14px;
      font-weight: 800;
    }
    .item-content {
      font-size: 10px;
      font-weight: 500;
      color: #333;
      padding: 5px;
    }
    .zan {
      padding-left: 10px;
    }
  }
}

.watch_item:hover {
  cursor: pointer;
  transform: scale(1.02);
  transition-duration:0.1s;
  transition-timing-function:linear;
  transition-delay:0s;
  transition-property:all;
	box-shadow:5px 5px 20px 5px rgba(0,0,0,0.15);
  filter: contrast(1.25);
}

.el-dialog {
  border-radius: 15px;
  // overflow: hidden;
}

// 笔记详情对话框
.dialog_conten {
  width: 100%;
  height: 600px;
  // display: flex;
  position: relative;

  // 笔记媒体区域
  .dialog_conten_media {
    width: 60%;
    height: 100%;
    // background-color: burlywood;
    position: absolute;
    left: 0;
    top: 0;
    .media_position {
      border-radius: 5px;
      overflow: hidden;
      width: 100%;
      height: 100%;
      position: absolute;
      top: 50%;
      left: 0;
      transform: translateY(-50%);
      // background-color: #333;
    }
  }
  // 笔记信息
  .dialog_conten_imfo {
    width: 40%;
    height: 100%;
    // background-color: cadetblue;
    // border: 1px solid red;
    position: absolute;
    right: 0;
    top: 0;
    // 第一行
    .one_imfo {
      width: 100%;
      height: 40px;
      line-height: 40px;
      position: relative;
      // 头像 写定 行内样式
      
      // 用户名
      .one_imfo_username_span {
        height: 40px;
        line-height: 40px;
        color: #303133;
        font-size: 23px;
        font-weight: 800;
        position: absolute;
        left: 30%;
        top: 0;
        transform: translateX(-50%)
      }
      // 关注按钮
      .el-button.el-button--primary.is-round {
         position: absolute;
         right: 20px;
         top: 50%;
         transform: translateY(-50%);
      }
    }
    // 第二行
    // 去除滚动栏，保留滚动效果
    .two_imfo::-webkit-scrollbar {
      width: 0;
      height: 0;
      background-color: transparent;
    }
    .two_imfo {
      box-sizing: border-box;
      padding: 10px;
      width: 100%;
      height: 75%;
      // background-color: #f2c0c0;
      overflow-y: scroll;
      .two_imfo_title {
        color: rgb(51, 51, 51);
        display: block;
        font-family: system-ui, -apple-system, "Segoe UI", Roboto, Ubuntu, Cantarell, "Noto Sans", sans-serif, BlinkMacSystemFont, "Helvetica Neue", Arial, "PingFang SC", "PingFang TC", "PingFang HK", "Microsoft Yahei", "Microsoft JhengHei";
        font-size: 20px;
        font-weight: 600;
        text-align: center;
      }
      .two_imfo_content {
        margin-top: 6px;
        color: rgb(51, 51, 51);
        font-family: system-ui, -apple-system, "Segoe UI", Roboto, Ubuntu, Cantarell, "Noto Sans", sans-serif, BlinkMacSystemFont, "Helvetica Neue", Arial, "PingFang SC", "PingFang TC", "PingFang HK", "Microsoft Yahei", "Microsoft JhengHei";
        font-size: 16px;
        font-weight: 400;
      }
      .two_imfo_created {
        margin-top: 6px;
        color: rgba(51, 51, 51, 0.6);
        font-family: system-ui, -apple-system, "Segoe UI", Roboto, Ubuntu, Cantarell, "Noto Sans", sans-serif, BlinkMacSystemFont, "Helvetica Neue", Arial, "PingFang SC", "PingFang TC", "PingFang HK", "Microsoft Yahei", "Microsoft JhengHei";
        font-size: 12px;
      }
    }

    // 第三行
    .three_comment {
        // position: absolute;
        // bottom: 0;
        width: 100%;
        height: 100px;
        // background-color: #f2c0c0;
        position: relative;
        padding-left: 10px;
        .three_icon {
          font-size: 26px;
          font-weight: 800;
          height: 36px;
          line-height: 36px;
          span {
            font-size: 10px;
            font-weight: 400;
            line-height: 36px;
          }
        }
        .goods_three_input {
          position: absolute;
          bottom: 0px;
          width: 96%;
        }
    }
  }
}
</style>