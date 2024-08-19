<template>
  <div>
    <div class="opt">
      <el-menu default-active="1" mode="horizontal">
        <el-menu-item index="1" @click="changeShow('推荐')">推荐</el-menu-item>
        <el-menu-item index="2" @click="changeShow('书籍')">书籍</el-menu-item>
        <el-menu-item index="3" @click="changeShow('美食')">美食</el-menu-item>
        <el-menu-item index="4" @click="changeShow('家居')">家居</el-menu-item>
        <el-menu-item index="5" @click="changeShow('穿搭')">穿搭</el-menu-item>
        <el-menu-item index="6" @click="changeShow('旅行')">旅行</el-menu-item>
        <el-menu-item index="7" @click="changeShow('其他')">其他</el-menu-item>
      </el-menu>
    </div>
    <!-- 核心内容 -->
    <div class="waterful">
       <div class="watch_item"  v-for="item in show_data"  >
           <img :src="item.note.surfacePicture" alt="" srcset="" width="175px" height="auto" @click="openInfo(item.note.id)">

           <div class="watch_item_middle"><span>{{ item.note.title }}</span></div>

           <div class="watch_item_bottom">
            <div>
               <el-avatar :src="item.user.headphoto" size="small"> user </el-avatar>
            </div>
            <div>
              <span class="name">{{ item.user.username }}</span>
            </div>
            <div class="zan">
               <i class="el-icon-star-off" ></i>{{item.note.collectionnum}}
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
              <div v-if="!(targetData.pictureurl.length == 0)">
                <el-carousel width="516px" height="600px" :autoplay="true">
                     <el-carousel-item v-for="item in targetData.pictureurl" :key="item">
                         <el-image :src="item" fit="contain"></el-image>
                     </el-carousel-item>
                  </el-carousel>
              </div>
                  
              <!-- 展示视频 -->
              <div v-if="!(targetData.videourl == null || targetData.videourl == '' )" 
              style="
                     position: absolute;
                     top: 0;
                     left: 50%;
                     transform: translateX(-50%);
              "
              >
                  <video-player :options="videoOptions" />
              </div>
           </div>
        </div>
        
        <!-- 内容信息区域 -->
        <div class="dialog_conten_imfo">

           <!-- 第一行：{头像 姓名，关注} -->
           <div class="one_imfo">
             <el-avatar :src="targetData.headphoto" size="large" style="margin-left: 20px;"> user </el-avatar>
             <div class="one_imfo_username_span">
              <span >{{ targetData.username }}</span>
             </div>
             <!-- <el-button type="primary"  round style="margin-left: 20px;">  </el-button> -->

             <!-- 返利促销 -->
             <div style="margin-left: 10px; float: right;">
              <el-popover
                placement="top-start"
                title="返利广告"
                width="200"
                trigger="hover"
                content="商品滞销，帮帮我们。全网最低价，点击即可选购，购买后博主也可获得收益">
                <el-button slot="reference" @click="rebate_buy_prepare">返利促销</el-button>
              </el-popover>
             </div>
           </div>

           <!-- 第二行（可滚动内容）-->
           <div class="two_imfo">
          
              <!-- 内容: {标题，内容, 创建时间} -->
              <div>
                <div class="two_imfo_title">
                 {{ targetData.title }}
                </div>
                <div class="two_imfo_content">
                 {{ targetData.content }}
                </div>
                <div class="two_imfo_created">
                  {{ targetData.created | dateFormat}}
                </div>
                <div class="two_imfo_created">共计 {{ targetData.comment.length }} 条评论</div>
                <hr>
              </div>

              <!-- 评论：{共计评论数，评论者头像，评论信息} -->
              <div>
                <!-- 使用v-for遍历渲染评论 -->
                <div v-for="item in targetData.comment" >
                  <div style="color: #303133;font-size: 15px;font-weight: 800;">
                    <el-avatar :src="headphoto" size="small" > user </el-avatar>
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
              <i :class="zan_class" @click="change_zan"></i> <span>点赞数 {{ targetData.praisenum }}</span> &nbsp;&nbsp;&nbsp;&nbsp;
              <i :class="star_class" @click="change_star"></i> <span>收藏数 {{ targetData.collectionnum }}</span>
            </div>

            <div class="three_input">
              <el-input placeholder="搜索小红书" v-model="comment_text">
                    <el-button slot="append" icon="el-icon-chat-dot-round" @click="sendComment" ></el-button>
              </el-input>
            </div>
            
           </div>

        </div>
      </div>
    </el-dialog>

    <el-drawer
      title="官方返利促销活动"
      :visible.sync="rebate_buy_drawer"
      :with-header="true"
      append-to-body
      >

      <h3 style="text-align: center">此页购买的商品，博主也可获得推广返利收益</h3>
         
         <!-- 商品图片 -->
         <el-image :src="rebate_goods.goods.picture" fit="contain"></el-image>

         <!-- 商品内容 -->

         <h2 style="text-align: center;">商品名：{{ rebate_goods.goods.goodsName }}</h2>

         <h1 style="text-align: center;"> 价格：{{ rebate_goods.goods.price }}</h1>

         <h3 style="text-align: center;"> 商品内容：{{ rebate_goods.goods.goodsContent }}</h3>
         
         <!-- 商品评论 -->
        <h4>商品评论:</h4>
        <div class="two_imfo_created">
          共计 {{ rebate_goods.goodsComment.length }} 条评论
        </div>
        <div>
           <!-- 使用v-for遍历渲染评论 -->
           <div v-for="item in rebate_goods.goodsComment" >
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
        
         <!-- 购买按钮 -->
         <div style="text-align: center;margin-top: 6px;">
           <el-input-number v-model="goodsCount" :min="1" :max="10" label="商品数量"></el-input-number>  &nbsp;
           <el-button type="primary" icon="el-icon-shopping-cart-1" @click="rebate_buy">购买</el-button>
         </div>
         
    </el-drawer>
  </div>
</template>
<script>
import VideoPlayer from '@/components/explore/VideoPlayer.vue';
// 在组件文件中导入Vue模块
import Vue from 'vue';

export default {
  name: 'VideoExample',
  components: {
    VideoPlayer
  },
  data() { 
    return {
      // 返利商品数量
      goodsCount: 1,
      // 返利商品详情
      rebate_goods:{
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
      //返利促销抽屉
      rebate_buy_drawer: false,
      // 点赞 收藏的样式切换
      zan_class: "el-icon-circle-check",
      star_class:"el-icon-star-off",
      // 笔记详情
      targetData: {
        "created": null,
        "updated": null,
        "username": "xm",
        "content": "看到自己在商场里啦！开心嘿嘿",
        "comment": [
          {
            "created": "2023-04-25T12:19:49.000+00:00",
            "updated": null,
            "id": null,
            "userId": null,
            "noteId": null,
            "comment": "小高宝宝爬树中",
            "username": "驰名",
            "deleted": null,
            "headphoto": "https://tanhua-zxm.oss-cn-hangzhou.aliyuncs.com/%E5%B0%8F%E7%BA%A2%E4%B9%A6/%E5%A4%B4%E5%83%8F/%E7%94%A8%E6%88%B7%E5%A4%B4%E5%83%8F/4.jpg"
          },
          {
            "created": "2023-04-25T12:19:49.000+00:00",
            "updated": null,
            "id": null,
            "userId": null,
            "noteId": null,
            "comment": "小羔春游日记",
            "username": "热爱生活的黄同学",
            "deleted": null,
            "headphoto": "https://tanhua-zxm.oss-cn-hangzhou.aliyuncs.com/%E5%B0%8F%E7%BA%A2%E4%B9%A6/%E5%A4%B4%E5%83%8F/%E7%94%A8%E6%88%B7%E5%A4%B4%E5%83%8F/40.jpg"
          }
        ],
        "pictureurl": [
          "https://tanhua-zxm.oss-cn-hangzhou.aliyuncs.com/%E5%B0%8F%E7%BA%A2%E4%B9%A6/%E7%AC%94%E8%AE%B0/%E7%A9%BF%E6%90%AD/%E5%9B%BE%E7%89%87/2/5.png",
          "https://tanhua-zxm.oss-cn-hangzhou.aliyuncs.com/%E5%B0%8F%E7%BA%A2%E4%B9%A6/%E7%AC%94%E8%AE%B0/%E7%A9%BF%E6%90%AD/%E5%9B%BE%E7%89%87/2/5ec2fe46f780a137a1b88f7ed666124.png"
        ],
        "videourl": null,
        "tag": "穿搭",
        "headphoto": "https://tanhua-zxm.oss-cn-hangzhou.aliyuncs.com/%E5%B0%8F%E7%BA%A2%E4%B9%A6/%E5%A4%B4%E5%83%8F/%E7%94%A8%E6%88%B7%E5%A4%B4%E5%83%8F/4.jpg",
        "title": "小高最近 ",
        "collectionnum": 7898,
        "commentTime": null
      },
      // videoJS m3u8播放器
      videoOptions: {
        autoplay: true,
        controls: true,
        sources: [
        {
            src: require("@/assets/video/测试视频.mp4"),
            type: 'application/x-mpegURL'
          },
          {
            src: require("@/assets/video/测试视频.mp4"),
            type: 'video/mp4'
          }
        ]
      },
      headphoto: window.sessionStorage.getItem('headphoto'),
      // 对话框的展示与否
      dialogVisible : false,
      // 所有博客数据
      data: 
      {
        "推荐笔记": [
        {
          "note": {
            "created": "2023-04-25T12:14:30.000+00:00",
            "updated": "2023-04-29T03:45:09.000+00:00",
            "id": 24,
            "userId": 1,
            "username": "xm",
            "title": "真实经历，这些坑希望你在平潭千万不要踩",
            "content": "血泪教训，想近期平潭环岛游的uu们请收下这份环岛拍照/路线攻略和避坑指南！",
            "tag": "旅行",
            "surfacePicture": "https://tanhua-zxm.oss-cn-hangzhou.aliyuncs.com/%E5%B0%8F%E7%BA%A2%E4%B9%A6/%E7%AC%94%E8%AE%B0/%E6%97%85%E8%A1%8C/%E5%9B%BE%E7%89%87/1/28eb92a6ea0dcfa9819da74027fb81f.png",
            "praisenum": 433,
            "collectionnum": 456,
            "deleted": 0
          },
          "user": {
            "created": "2023-04-24T12:22:55.000+00:00",
            "updated": "2023-05-04T07:17:47.000+00:00",
            "id": 1,
            "username": "xm",
            "password": "123456",
            "phone": "13850429386",
            "headphoto": "https://tanhua-zxm.oss-cn-hangzhou.aliyuncs.com/%E5%B0%8F%E7%BA%A2%E4%B9%A6/%E5%A4%B4%E5%83%8F/%E7%94%A8%E6%88%B7%E5%A4%B4%E5%83%8F/4.jpg",
            "gender": 1,
            "age": 22,
            "introduction": "无",
            "userType": "admin"
          }
        },
        ],
        "所有笔记": [
        {
          "note": {
            "created": "2023-04-25T12:14:30.000+00:00",
            "updated": "2023-04-29T03:49:38.000+00:00",
            "id": 1,
            "userId": 1,
            "username": "xm",
            "title": "趁天还没热再来叠穿下",
            "content": "不然就来不及了",
            "tag": "家居",
            "surfacePicture": "https://tanhua-zxm.oss-cn-hangzhou.aliyuncs.com/%E5%B0%8F%E7%BA%A2%E4%B9%A6/%E7%AC%94%E8%AE%B0/%E6%8E%A8%E8%8D%90/%E8%A7%86%E9%A2%91/1/%E5%B0%81%E9%9D%A2.png",
            "praisenum": 34244,
            "collectionnum": 564,
            "deleted": 0
          },
          "user": {
            "created": "2023-04-24T12:22:55.000+00:00",
            "updated": "2023-05-04T07:17:47.000+00:00",
            "id": 1,
            "username": "xm",
            "password": "123456",
            "phone": "13850429386",
            "headphoto": "https://tanhua-zxm.oss-cn-hangzhou.aliyuncs.com/%E5%B0%8F%E7%BA%A2%E4%B9%A6/%E5%A4%B4%E5%83%8F/%E7%94%A8%E6%88%B7%E5%A4%B4%E5%83%8F/4.jpg",
            "gender": 1,
            "age": 22,
            "introduction": "无",
            "userType": "admin"
          }
        }
        ]
      },
      // 当前要展示的博客数据，按上方按钮切换
      show_data: [
      {
          "note": {
            "created": "2023-04-25T12:14:30.000+00:00",
            "updated": "2023-04-29T03:45:09.000+00:00",
            "id": 24,
            "userId": 1,
            "username": "xm",
            "title": "真实经历，这些坑希望你在平潭千万不要踩",
            "content": "血泪教训，想近期平潭环岛游的uu们请收下这份环岛拍照/路线攻略和避坑指南！",
            "tag": "旅行",
            "surfacePicture": "https://tanhua-zxm.oss-cn-hangzhou.aliyuncs.com/%E5%B0%8F%E7%BA%A2%E4%B9%A6/%E7%AC%94%E8%AE%B0/%E6%97%85%E8%A1%8C/%E5%9B%BE%E7%89%87/1/28eb92a6ea0dcfa9819da74027fb81f.png",
            "praisenum": 433,
            "collectionnum": 456,
            "deleted": 0
          },
          "user": {
            "created": "2023-04-24T12:22:55.000+00:00",
            "updated": "2023-05-04T07:17:47.000+00:00",
            "id": 1,
            "username": "xm",
            "password": "123456",
            "phone": "13850429386",
            "headphoto": "https://tanhua-zxm.oss-cn-hangzhou.aliyuncs.com/%E5%B0%8F%E7%BA%A2%E4%B9%A6/%E5%A4%B4%E5%83%8F/%E7%94%A8%E6%88%B7%E5%A4%B4%E5%83%8F/4.jpg",
            "gender": 1,
            "age": 22,
            "introduction": "无",
            "userType": "admin"
          }
        }
      ],
      comment_text:''
    }
  },
  watch: {
    // 当targetData的数据发生变化，实时更新videoJS的videoOptions数据
    'targetData.videourl'(newVal, oldVal) {
      // 这里可以根据targetData.videourl的值做出相应的操作
      Vue.set(this.videoOptions.sources, 0, {
          src: newVal,
          type: 'video/mp4'
        });
      }
  },
  mounted () {
    // 有网络时解开
    this.getData();
    
    // 一个测试，m3u8，到时候改到触发事件
    // this.videoOptions.sources[0].src = this.targetData.videourl vue2响应式数据修改数组应慎重
    Vue.set(this.videoOptions.sources, 0, {
      src: this.targetData.videourl,
      type: 'video/mp4'
    });
    // console.log(this.videoOptions)
  },
  methods: {

    // 获取首页数据
     getData() {
       this.$http({
         url: '/found',
         method: 'get'
       }).then(res => {
          //  console.log(res)
           this.data = res.data
           this.show_data = this.data.推荐笔记
          //  console.log(this.show_data)
       }).catch(res => {
         console.log(res);
       })
    },


    // 查看详情
    openInfo (id) {
      // console.log(id)
      this.$http({
        url: '/found/content/'+id,
        method: 'get'
      }).then(res => {
          // console.log(res)
          this.targetData = res.data
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
      // 推荐 书籍 美食 家居 穿搭 旅行 其他
      if ("推荐" == type_str) {
        this.show_data = this.data.推荐笔记
      }
      else{
        var new_show_data = [];
        for (var i = 0; i < this.data.所有笔记.length; i++) {
          var item = this.data.所有笔记[i];
          if (item.note.tag == type_str) {
            new_show_data.push(item)
          }
        }
        this.show_data = new_show_data;
      }
    },

    // 提供给父组件调用的搜索方法
    children_search_note (search_text) {
      // console.log('调用成功')
      // console.log(search_text)
      this.$http({
        url: '/found/search',
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


    // 切换点赞
    change_zan () {

      this.$http({
        url: '/praise/'+123456,
        method: 'post'
      }).then(res => {

          var status = ''
          status = res.data.data
          console.log(status)
          if (status == '') {
            this.$message.error('网络请求失败，请重试或联系工作人员');
          }
          else {
            // 取消点赞
            if ("el-icon-success" == this.zan_class) {
              this.zan_class = "el-icon-circle-check"
              this.targetData.praisenum = this.targetData.praisenum -1;
              
            }
            // 启用点赞
            else {
              this.zan_class = "el-icon-success"
              this.targetData.praisenum = this.targetData.praisenum +1;
            }
          }
      }).catch(res => {
        console.log(res);
      })
    },

    // 切换收藏
    change_star () {

      this.$http({
        url: '/collection/'+123456,
        method: 'post'
      }).then(res => {
          var status = ''
          status = res.data.data

          if (status == '') {
            this.$message.error('网络请求失败，请重试或联系工作人员');
          }
          else {
            // 取消收藏
            if ("el-icon-star-on" == this.star_class) {
              this.star_class = "el-icon-star-off"
              this.targetData.collectionnum = this.targetData.collectionnum -1;
            }
            // 启用收藏
            else {
              this.star_class = "el-icon-star-on"
              this.targetData.collectionnum = this.targetData.collectionnum +1;
            }
          }

      }).catch(res => {
        console.log(res);
      })
    },

    // 发送评论
    sendComment () {
      this.$http({
        url: '/found/comment/'+123456,
        method: 'post',
        params: {
          //键值对
          comment: this.comment_text,
        }
      }).then(res => {
        // 评论成功，重新加载数据，清空评论内容
        if ("保存成功" == res.data.data) {
          this.openInfo(123456)
          this.comment_text = ''
        }
      }).catch(res => {
        console.log(res);
      })
    },

    // 返利促销预备
    rebate_buy_prepare () {
      this.rebate_buy_drawer = true
    },

    // 返利购买请求 http://localhost:8080/shopping/settle
    rebate_buy () {
      var my_rebate_buy_data = {
        "goodsId": this.rebate_goods.goods.id+"",
        "price": this.rebate_goods.goods.price+"",
        "count": this.goodsCount+"",
        "userId": this.targetData.noteId+""
      }

      this.$http({
        url: '/shopping/settle',
        method: 'post',
        data: my_rebate_buy_data
      }).then(res => {
        this.$message.success(res.data.data)
        this.rebate_buy_drawer = false
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
      font-size: 12px;
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
        .three_input {
          position: absolute;
          bottom: 0px;
          width: 96%;
          .el-input__inner {
            border-top-left-radius: 15px;
            border-bottom-left-radius: 15px;
          }
          .el-input-group__append {
            border-top-right-radius: 15px;
            border-bottom-right-radius: 15px;
          }
        }
    }
  }
}
</style>