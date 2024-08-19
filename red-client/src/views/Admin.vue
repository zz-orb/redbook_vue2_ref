<template>
  <div style="height: 100%; width: 100%;">
    <div id="publish">
        <!-- 导航栏 -->
        <div class="header">
           <div class="real_header">
            <div class="logo">
                  <img :src="require('../assets/小红书log.png')" alt="小红书" width="67" height="24">
                  <span>&nbsp; 后台服务平台</span>
              </div>
              <!-- 头像与退出 -->
              <div class="user_pic">
                <el-avatar :src="user_image" size="medium"></el-avatar>
                <span slot="title"> &nbsp; {{ username }}</span>
              </div>
           </div>
        </div>

        <!-- 内容区 -->
        <div class="publish_container">
              <el-container>
                <!-- 侧边栏 -->
                 <el-aside width="200px">
                     <el-menu
                     class="aside_menu"
                     default-active="/Admin/ManageNote"
                     :router="true"
                     >
                     <el-menu-item index="/Admin/ManageNote">
                       <i class="el-icon-s-management"></i>
                       <span slot="title">管理笔记</span>
                     </el-menu-item>
                     <el-menu-item index="/Admin/ManageGoods" >
                       <i class="el-icon-menu"></i>
                       <span slot="title">管理商品</span>
                     </el-menu-item>
                     <el-menu-item index="/Admin/Rebate">
                       <i class="el-icon-data-line"></i>
                       <span slot="title">返利报表</span>
                     </el-menu-item>
                     <el-menu-item index="/Red/Explore" >
                       <i class="el-icon-ship"></i>
                       <span slot="title">返回主页</span>
                     </el-menu-item>
                   </el-menu>
                 </el-aside>
                 <!-- 内容展示区 -->
                 <el-main>
                  <router-view></router-view>
                 </el-main>
              </el-container>
        </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      user_image: require('../assets/user.webp'),
      username: '冰镇生鲜'
    }
  }
}
</script>

<style lang="less" scoped>
#publish {
  width: 100%;
  height: 100%;
  position: relative;
  background: rgb(238, 241, 248);
}
.header {
  height: 71px;
  width: 100%;
  position: absolute;
  top: 0;
  background-color: white;
  box-shadow: rgb(228, 230, 242) 0px 2px 6px 0px;
  .real_header {
    height: 100%;
    width: 95%;
    position: absolute;
    top: 0;
    left: 50%;
    transform: translateX(-50%);
    // background-color: aquamarine;
    .logo {
      height: 71px;
      line-height: 71px;
      width: 200px;

      font-weight: bold;
      font-size: 20px;
      color: rgb(45, 45, 45);
    }
    .user_pic {
      position: absolute;
      top: 0;
      right: 5px;
      height: 71px;
      width: 120px;
      line-height: 71px;
      span {
        img {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%,-50%);
        }
      }
    }
  }
}

.publish_container {
  width: 100%;
  height: 100%;
  // background-color: antiquewhite;
  position: absolute;
  top: 72px;
  left: 0;

  .el-container .el-aside {
    // height: 95%;
    height: 800px;
    border-radius: 10px;
    background-color: white;
    margin: 3px;
    padding: 1px;
  }

  .el-container .el-main {
    position: relative;
    width: 90%;
    height: 800px;
    // background-color: antiquewhite;
    border-radius: 20px;
  }
}
</style>