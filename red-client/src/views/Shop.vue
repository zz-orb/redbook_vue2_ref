<template>
  <div class="SportsShopMain">
    <el-container style="height:100%">
    <!-- 头部 -->
    <el-header style="background-color:#373F41;position: relative;">
       <div class="header-loge"> <div class="header-loge-pic"></div> <div class="header-loge-name">运动商城系统</div> </div>
       <div class="header-Out"><el-button type="danger" @click="logout">退出</el-button></div>
    </el-header>

    <el-container style="height:100%">
      <!-- 侧边栏 -->
         <el-aside width="200px" style="background-color:#333744">
            <el-menu
               @open="handleOpen"
               @close="handleClose"
               default-active="/sportsShop/goods"
               class="el-menu-vertical-demo"
               background-color="#333744"
               text-color="#fff"
               active-text-color="#ffd04b"
               :router="true">


               <el-menu-item index="/Shop/Goods">
                 <i class="el-icon-s-goods"></i>
                 <span slot="title">潮品闲逛</span>
               </el-menu-item>
               <el-menu-item index="/Shop/ShopCar">
                 <i class="el-icon-shopping-cart-1"></i>
                 <span slot="title">购物车</span>
               </el-menu-item>
               <el-menu-item index="/Shop/Orders" >
                 <i class="el-icon-document"></i>
                 <span slot="title">我的订单</span>
               </el-menu-item>
               <el-menu-item index="/Shop/Settings">
                 <i class="el-icon-setting"></i>
                 <span slot="title">个人中心</span>
               </el-menu-item>
            </el-menu>
         </el-aside>
      <!-- 内容主体区域 -->
      <el-main style="background-color: #f5f5f5;"> 
        <router-view ></router-view>
      </el-main>
    </el-container>
  </el-container>
  </div>
</template>

<script>
export default {
 data() {
 return {
   username: '',
   password:'',
   passwordCheck: '',
   remember:false
 }
},
methods : {
    // 退出登录
    logout: function () {
      // window.sessionStorage.removeItem('token')
      window.sessionStorage.clear()
      this.$message.success('安全退出系统')
      this.$router.push('/login/coreLogin')
    },
    handleOpen(key, keyPath) {
        console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
        console.log(key, keyPath);
    }
}
}
</script>

<style>
.SportsShopMain {
    width: 100%;
    height: 100%;
}

.header-loge {
    position: absolute;
    left: 3%;
    height: 60px;
    width: 300px;
    line-height: 60px;
    font-size: 20px;
    text-shadow: 0px 0px 8px rgba(231, 104, 20, 0.565);
    font-size: 30px;
    color: #ecf0f8;
    display: flex;
}
.header-loge-pic {
    width: 59px;
    height: 59px;
    border-radius: 50%;
    overflow: hidden;
    border: 1px solid white;
    box-sizing: border-box;
    background-image: url('../assets/mypic/mainUserPic.jpg');
    background-repeat: no-repeat;
    background-size: cover;
}
.header-loge-name {
    padding-left: 10px;
}
.header-Out {
    position: absolute;
    top:50%;
    right: 10px;
    transform: translateY(-50%);
}
</style>