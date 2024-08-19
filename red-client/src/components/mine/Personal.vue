<template>
    <div class="personal">
        <div class="container">

          <!-- 个人资料 -->
          <div class="imfo">
            <!-- 头像 -->
            <div class="imfo_one">
              <img :src="imfo.headphoto" style="height: 100%; width: auto; border-radius: 50%; border: 1px solid azure;"/>
            </div>
            <!-- 信息 -->
            <div class="imfo_two">
               <div class="imfo_two_username">{{ imfo.username }}</div>

               <div class="imfo_two_id"> 小红书号：{{ imfo.id }} &nbsp;| &nbsp; IP属地：福建 </div>

               <div class="imfo_two_introduction">个性签名：{{ imfo.introduction }}</div>

               <div class="imfo_two_tag">
                <el-tag v-if="imfo.gender == 0" ><i class="el-icon-female"></i></el-tag>
                <el-tag v-if="imfo.gender == 1" type="danger"><i class="el-icon-male"  ></i></el-tag>
               </div>

               <div class="imfo_two_others">
                 余额：<el-tag type="success">{{ imfo.money }}</el-tag> 
                 &nbsp;| &nbsp; 
                 年龄：<el-tag type="warning">{{ imfo.age }}</el-tag> 
                 &nbsp;| &nbsp; 
                 待返金额：<el-tag type="danger">{{ imfo.returnMoney }}</el-tag>
               </div>
            </div>
          </div>

          <!-- 收藏/点赞 -->
          <div class="note_and_star">
             <!-- 切换按钮 -->
             <div class="changeShow">
              <el-menu default-active="1" mode="horizontal">
                <el-menu-item index="1" @click="changeShow('点赞')">点赞</el-menu-item>
                <el-menu-item index="2" @click="changeShow('收藏')">收藏</el-menu-item>
              </el-menu>
             </div>

             <!-- 核心内容 -->
             <div class="waterful">
                <div class="watch_item"  v-for="item in show_data"  >
                    <img :src="item.note.surfacePicture" alt="" srcset="" width="175px" height="auto">

                    <div class="watch_item_middle"><span>{{ item.note.title }}</span></div>

                    <div class="watch_item_bottom">
                     <div>
                        <el-avatar :src="item.user.headphoto" size="small"> user </el-avatar>
                     </div>
                     <div>
                       <span class="name">{{ item.user.username }} </span>
                     </div>
                     <div >
                       <i class="el-icon-star-on" ></i>{{item.user.praisenum}}
                     </div>
                    </div>
                </div>
             </div>
          </div>
        </div>

        <!-- 抽屉--修改个人资料 -->
        <el-drawer
          title="修改个人资料"
          :visible.sync="drawer"
          :with-header="true"
          append-to-body
          >
    
          <h1 style="text-align: center">修改个人资料</h1>
    
          <div style="padding: 20px; margin-top: 60px;">

          <div style="text-align: center;">
            <el-upload class="avatar-uploader" action="" :http-request="upload" :show-file-list="false"
                :on-success="handleAvatarSuccess" :before-upload="beforeAvatarUpload">
                <img v-if="alter_imfo.headphoto" :src="alter_imfo.headphoto" class="avatar">
                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
          </div>
            
          <!-- <div style="margin-bottom: 10px;">
              <el-input
                placeholder="请输入内容"
                v-model="alter_imfo.goodsName">
                <template slot="prepend">用户头像</template>
              </el-input>
          </div> -->
    
          <div style="margin-bottom: 10px;">
            <el-input
              placeholder="请输入内容"
              v-model="alter_imfo.username">
              <template slot="prepend">用户名</template>
            </el-input>
          </div>
    
          <div style="margin-bottom: 10px;">
            <el-input
              placeholder="请输入内容"
              v-model="alter_imfo.introduction">
              <template slot="prepend">个人简介</template>
            </el-input>
          </div>
    
          <div style="margin-bottom: 10px;">
            <el-input
              placeholder="请输入内容"
              v-model="alter_imfo.password">
              <template slot="prepend">密码</template>
            </el-input>
          </div>
          
          <div style="margin-bottom: 10px;">
            <el-input
              placeholder="请输入内容"
              v-model="alter_imfo.gender">
              <template slot="prepend">性别</template>
            </el-input>
          </div>

          <div style="margin-bottom: 10px;">
            <el-input
              placeholder="请输入内容"
              v-model="alter_imfo.age">
              <template slot="prepend">年龄</template>
            </el-input>
          </div>
         
          <el-button type="primary" plain @click="send_alter">提交修改</el-button>
          </div>
        </el-drawer>
        
        <!-- 抽屉按钮 -->
        <div class="fixed_box">
          <el-button type="primary" plain @click="openDrawer" style="margin-bottom: 4px;">修改资料</el-button> 
          <br>
          <el-button type="warning" plain @click="rebate_to_money" style="margin-bottom: 4px;">金额提现</el-button>
          <br>
          <el-tooltip class="item" effect="dark" content="哦哦，显然正确入口是修改资料按钮" placement="bottom-start">
            <el-button type="danger" plain>修改头像</el-button>
          </el-tooltip>
        </div>
    </div>
</template>

<script>
export default {
  data() {
    return {
      imfo: {
        "created": "2023-04-24T12:22:55.000+00:00",
        "updated": "2023-05-22T15:56:27.000+00:00",
        "id": 1,
        "username": "xm",
        "password": "123456",
        "phone": "13850429386",
        "headphoto": "https://tanhua-zxm.oss-cn-hangzhou.aliyuncs.com/%E5%B0%8F%E7%BA%A2%E4%B9%A6/%E5%A4%B4%E5%83%8F/%E7%94%A8%E6%88%B7%E5%A4%B4%E5%83%8F/4.jpg",
        "gender": 1,
        "age": 22,
        "introduction": "无",
        "userType": "admin",
        "money": 8015.5,
        "returnMoney": 498.75
      },
      show_data: [
        {
          "note": {
            "created": "2023-04-25T12:14:30.000+00:00",
            "updated": "2023-05-24T01:31:13.000+00:00",
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
            "updated": "2023-05-31T07:42:19.000+00:00",
            "id": 1,
            "username": "xm",
            "password": "123456",
            "phone": "13850429386",
            "headphoto": "https://tanhua-zxm.oss-cn-hangzhou.aliyuncs.com/%E5%B0%8F%E7%BA%A2%E4%B9%A6/%E5%A4%B4%E5%83%8F/%E7%94%A8%E6%88%B7%E5%A4%B4%E5%83%8F/4.jpg",
            "gender": 1,
            "age": 22,
            "introduction": "无",
            "userType": "admin",
            "money": 9980730.440000001,
            "returnMoney": 10425.710000000003
          }
        },
        {
          "note": {
            "created": "2023-04-25T12:14:30.000+00:00",
            "updated": "2023-04-29T03:45:09.000+00:00",
            "id": 2,
            "userId": 1,
            "username": "xm",
            "title": "巴黎世家特卖会",
            "content": "开心看看买了啥",
            "tag": "家居",
            "surfacePicture": "https://tanhua-zxm.oss-cn-hangzhou.aliyuncs.com/%E5%B0%8F%E7%BA%A2%E4%B9%A6/%E7%AC%94%E8%AE%B0/%E6%8E%A8%E8%8D%90/%E8%A7%86%E9%A2%91/2/%E5%B0%81%E9%9D%A2.png",
            "praisenum": 1423,
            "collectionnum": 68,
            "deleted": 0
          },
          "user": {
            "created": "2023-04-25T11:21:44.000+00:00",
            "updated": "2023-05-24T11:45:03.000+00:00",
            "id": 2,
            "username": "足球张雨绮",
            "password": "123456",
            "phone": "12345678910",
            "headphoto": "https://tanhua-zxm.oss-cn-hangzhou.aliyuncs.com/%E5%B0%8F%E7%BA%A2%E4%B9%A6/%E5%A4%B4%E5%83%8F/%E7%94%A8%E6%88%B7%E5%A4%B4%E5%83%8F/6.jpg",
            "gender": 0,
            "age": 23,
            "introduction": "无",
            "userType": "normal",
            "money": 10000,
            "returnMoney": 520
          }
        },
        {
          "note": {
            "created": "2023-04-25T12:14:30.000+00:00",
            "updated": "2023-04-29T03:38:18.000+00:00",
            "id": 3,
            "userId": 2,
            "username": "足球张雨绮",
            "title": "贴地斩练习",
            "content": "新手足球练习正脚背，就要反复用30.40%的力量重复刻意的练习，慢慢你会拥有自己的射门风格",
            "tag": "家居",
            "surfacePicture": "https://tanhua-zxm.oss-cn-hangzhou.aliyuncs.com/%E5%B0%8F%E7%BA%A2%E4%B9%A6/%E7%AC%94%E8%AE%B0/%E6%8E%A8%E8%8D%90/%E8%A7%86%E9%A2%91/3/%E5%B0%81%E9%9D%A2.png",
            "praisenum": 432,
            "collectionnum": 648,
            "deleted": 0
          },
          "user": {
            "created": "2023-04-12T11:23:32.000+00:00",
            "updated": "2023-04-25T11:23:37.000+00:00",
            "id": 3,
            "username": "21克",
            "password": "123456",
            "phone": "12345678910",
            "headphoto": "https://tanhua-zxm.oss-cn-hangzhou.aliyuncs.com/%E5%B0%8F%E7%BA%A2%E4%B9%A6/%E5%A4%B4%E5%83%8F/%E7%94%A8%E6%88%B7%E5%A4%B4%E5%83%8F/7.jpg",
            "gender": 1,
            "age": 54,
            "introduction": "无",
            "userType": "normal",
            "money": 10000,
            "returnMoney": 100
          }
        }
      ],
      alter_imfo: {
        "headphoto": "http://dummyimage.com/400x400",
        "username": "丁静",
        "introduction": "proident",
        "password": "Duis",
        "gender": 49,
        "age": 88
      },
      // 抽屉控制
      drawer: false
    }
  },
  mounted() {
    // 获取个人资料
    this.get_userimfo()
    this.changeShow("点赞")
  },
  methods: {
    changeShow (type_str) {
      // 点赞 收藏
      if ("点赞" == type_str) {
        // http://localhost:8080/userInfo/praise
        this.$http({
          url: '/userInfo/praise',
          method: 'get'
        }).then(res => {
            this.show_data = res.data.data
        }).catch(res => {
          console.log(res);
        })
      }
      else if ("收藏" == type_str) {
        // http://localhost:8080/userInfo/collection
        this.$http({
          url: '/userInfo/collection',
          method: 'get'
        }).then(res => {
            this.show_data = res.data.data
        }).catch(res => {
          console.log(res);
        })
      }
    },

    // 获取个人资料 http://localhost:8080/userInfo
    get_userimfo () {
      this.$http({
        url: '/userInfo',
        method: 'get'
      }).then(res => {
          this.imfo = res.data.data
          this.$message.success('获取用户信息成功')
      }).catch(res => {
        console.log(res);
      })
    },

    // 上传头像 http://localhost:8080/userInfo/headphoto
    upload(param) {
            const formdate = new FormData()
            formdate.append('headphoto', param.file)
            const url = '/userInfo/headphoto'
            const headers = {
                'Content-Type': 'multipart/form-data'
            }
            // axios.post的构造函数有顺序，不可乱
            this.$http.post(
                url,
                formdate,
                headers
            ).then(res => {
                // console.log(data)
                this.$message.success("图片上传成功")
                this.alter_imfo.headphoto = res.data.data
            }).catch(response => {
                console.log(response)
            })
    },
    handleAvatarSuccess(res, file) {
      this.alter_imfo.headphoto = URL.createObjectURL(file.raw);
    },
    beforeAvatarUpload(file) {
        const isJPG = file.type === 'image/jpeg';
        const isLt2M = file.size / 1024 / 1024 < 2;

        if (!isJPG) {
            this.$message.error('上传头像图片只能是 JPG 格式!');
        }
        if (!isLt2M) {
            this.$message.error('上传头像图片大小不能超过 2MB!');
        }
        return isJPG && isLt2M;
    },

    // 打开抽屉
    openDrawer () {
      this.alter_imfo.headphoto = this.imfo.headphoto
      this.alter_imfo.username = this.imfo.username
      this.alter_imfo.introduction = this.imfo.introduction
      this.alter_imfo.password = this.imfo.password
      this.alter_imfo.gender = this.imfo.gender
      this.alter_imfo.age = this.imfo.age

      this.drawer = true
    },

    // 提现 http://localhost:8080/userInfo/withdraw
    rebate_to_money () {
      this.$http({
        url: '/userInfo/withdraw',
        method: 'put'
      }).then(res => {
          this.$message.warning(res.data.data)
          this.get_userimfo()
      }).catch(res => {
        console.log(res);
      })
    },

    // 发起修改请求 http://localhost:8080/userInfo/update
    send_alter () {
      this.$http({
        url: '/userInfo/update',
        method: 'put',
        data: this.alter_imfo
      }).then(res => {
          this.$message.success(res.data.data)
          this.get_userimfo()
          this.drawer = false
      }).catch(res => {
        console.log(res);
      })
    }
  }
}
</script>

<style lang="less" scoped>
.personal {
  width: 100%;
  height: 100%;
  position: relative;
  // overflow: scroll;
}
// .personal:-webkit-scrollbar {
//     width: 0;
//     height: 0;
//     background-color: transparent;
// }

.container {
  width: 60%;
  height: 100%;
  // background-color: bisque;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%,-50%);
  overflow: scroll;
}

.container::-webkit-scrollbar {
    width: 0;
    height: 0;
    background-color: transparent;
}

.imfo {
  width: 100%;
  height: 30%;
  // border: 1px solid black;
  .imfo_one {
    width: 40%;
    height: 100%;
    // background-color: cadetblue;
    float: left;
    padding-left: 40px;
    box-sizing: border-box;
  }
  .imfo_two {
    width: 60%;
    height: 100%;
    // background-color: burlywood;
    float: left;
    padding-left: 20px;
    box-sizing: border-box;
    .imfo_two_username {
      padding-top: 10px;
      font-weight: 600;
      font-size: 27px;
      color: #333;
    }
    .imfo_two_id {
      padding-top: 5px;
      font-size: 12px;
      color: rgba(51,51,51,.6);
    }
    .imfo_two_introduction {
      padding-top: 14px;
      font-size: 18px;
      color: #333;
    }
    .imfo_two_tag {
      padding-top: 10px;
      .el-tag.el-tag--light {
        border-radius: 50%;
      }
    }
    .imfo_two_others {
      padding-top: 10px;
      font-weight: 400;
      font-size: 12px;
      color: #333;
    }
  }
}

.note_and_star {
  margin-top: 10px;
  width: 100%;
  position: relative;
}

.changeShow {
    position: absolute;
    top: 0;
    left: 50%;
    transform: translateX(-50%);
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
    // 去除下划线，文本装饰线
      .el-menu--horizontal>.el-menu-item.is-active {
      border-bottom: none;
      text-decoration: none;
    }
    .el-menu.el-menu--horizontal {
      border-bottom: none
    }
    .el-menu--horizontal.el-menu {
      border-bottom: none
    }
  }
  // 瀑布流布局
.waterful {
  margin-top: 20px;
  padding-left: 10px;
  column-count: 3;//想要排成的列数
  column-gap: 0; // 列间距
  margin-bottom: 150px;
  position: absolute;
  top: 30px;
  left: 50%;
  transform: translateX(-50%);
}

.watch_item {
  break-inside: avoid; //避免“瀑布流”内部的内容被断开
  width: 175px;
  margin-bottom: 12px;
  margin-right: 4px;
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

.fixed_box {
  position: fixed;
  top: 30px;
  right: 30px;
}
</style>