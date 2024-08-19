<template>
    <div id="app" style="overflow: hidden;">
       <!-- 头部 -->
       <div class="header">
              <!-- logo -->
              <div class="logo">
                <a href="#">
                  <img :src="require('../assets/小红书log.png')" alt="小红书" width="67" height="24">
                </a>
              </div>
              <!-- 搜索框 -->
              <div class="header_search">
                <el-input placeholder="搜索小红书" v-model="search_text">
                    <el-button slot="append" icon="el-icon-search" @click="search_note"></el-button>
                </el-input>
              </div>
              <!-- 菜单栏 -->
              <div class="header_setting" v-if="userType == 'admin'">
                <el-button icon="el-icon-setting" circle @click="goto_admin"></el-button>&nbsp; 后台管理
              </div>
              <!-- <div class="header_setting" v-if="userType == 'normal'">
                <el-tooltip class="item" effect="dark" content="哦哦，显然正确入口是修改资料按钮" placement="bottom-start">
                  <el-button type="danger" plain>普通用户</el-button>
                </el-tooltip>
              </div> -->
       </div>
  
       <!-- 主体 -->
       <el-container class="container">
         <!-- 侧边 -->
         <el-aside width="220px" >
          <el-menu
             class="aside_menu"
             default-active="/Red/Explore"
             :router="true">
              <el-menu-item index="/Red/Explore">
                <i class="el-icon-ship"></i>
                <span slot="title">发现</span>
              </el-menu-item>
              <el-menu-item index="/Red/PubNote">
                <i class="el-icon-edit-outline"></i>
                <span slot="title">发布</span>
              </el-menu-item>
              <!-- 购物车 -->
              <el-submenu index="/Red/Shop">
                 <template slot="title">
                   <i class="el-icon-shopping-bag-1"></i>
                   <span>购物</span>
                 </template>
                 <el-menu-item-group>
                   <el-menu-item index="/Red/Shop/Goods">
                     <i class="el-icon-s-goods"></i>
                     <span slot="title">潮品闲逛</span>
                   </el-menu-item>
                   <el-menu-item index="/Red/Shop/ShopCar">
                     <i class="el-icon-shopping-cart-1"></i>
                     <span slot="title">购物小车</span>
                   </el-menu-item>
                   <el-menu-item index="/Red/Shop/Orders">
                     <i class="el-icon-document"></i>
                     <span slot="title">我的订单</span>
                   </el-menu-item>
                   <!-- <el-menu-item index="/Red/Shop/Settings">
                     <i class="el-icon-setting"></i>
                     <span slot="title">个人中心</span>
                   </el-menu-item> -->
                 </el-menu-item-group>
               </el-submenu>
              <!-- <el-menu-item index="/Red/About">
                <el-avatar :src="user_image" size="medium"></el-avatar>
                <span slot="title"> &nbsp; 我</span>
              </el-menu-item> -->

              <!-- 我 -->
              <el-submenu index="/Red/Mine">
                 <template slot="title">
                  <el-avatar :src="user_image" size="medium"></el-avatar>
                  <span slot="title"> &nbsp; 我</span>
                 </template>
                 <el-menu-item-group>
                   <el-menu-item index="/Red/Mine/Personal">
                     <i class="el-icon-document"></i>
                     <span slot="title">个人资料</span>
                   </el-menu-item>
                   <!-- <el-menu-item index="/Red/Mine/Rebate">
                     <i class="el-icon-setting"></i>
                     <span slot="title">返利报表</span>
                   </el-menu-item> -->
                 </el-menu-item-group>
               </el-submenu>
          </el-menu>
         </el-aside>
         <!-- 内容 -->
         <el-main >
           <div class="main_router">
            
            <!-- 过渡效果 -->
            <transition name="scale-slide" mode="in-out">
              <router-view ref="child"></router-view>
            </transition>

            <!-- 缩放过渡 -->
            <!-- <router-view v-slot="{ Component }">
              <transition name="scale-slide">
                <component :is="Component" />
              </transition>
            </router-view> -->


           </div>
         </el-main>
       </el-container>
    </div>
  </template>
  
  <script>
  // 导入组件
  
  export default {
    name: 'App',
    data() { 
      return {
        user_image: require('../assets/user.webp'),
        search_text: '',
        userType: window.sessionStorage.getItem('userType')
      }
    },
    methods: {
      search_note () {
        this.$refs.child.children_search_note(this.search_text);
      },
      goto_admin () {
        this.$router.push('/Admin');
      }
    },
  }
  </script>
  
  <style lang="less">
  #app {
    /* font-family: Avenir, Helvetica, Arial, sans-serif; */
    position: relative;
    height: 100%;
    width: 100%;
    background-color: hsla(0,0%,100%,.98);
    overflow: hidden;
  }
  
  // 头部
  .header {
    width: 93%;
    height: 71px;
    position: absolute;
    top: 0;
    left: 50%;
    transform: translateX(-50%);
    // border: 1px solid red;
    /* line-height: 71px; 不能加，不然搜索框会继承跳出div*/
    border-bottom-color: rgb(48, 52, 54);
    // border-bottom: 1px solid black;
    .logo {
      height: 100%;
      width: 67px;
      line-height: 71px;
      margin-left: 20px;
    }
    .header_search {
      width: 40%;
      height: 40px;
      position: absolute;
      left: 50%;
      top: 50%;
      transform: translate(-50%,-50%);
      .el-input__inner {
        border-top-left-radius: 15px;
        border-bottom-left-radius: 15px;
      }
      .el-input-group__append {
        border-top-right-radius: 15px;
        border-bottom-right-radius: 15px;
      }
    }
    .header_setting {
      width: 150px;
      height: 42px;
      line-height: 71px;
      position: absolute;
      top: 0;
      right: 10px;
      .el-input-group__append {
        border: none;
      }
    }
  }
  // 主体
  .container {
    width: 93%;
    height: 95%;
    position: absolute;
    top: 71px;
    left: 50%;
    transform: translateX(-50%);
    // border: 1px solid red;
  }
  // 侧边栏
  .aside_menu {
    font-size: 16px;
    font-weight: 600;
    color: #333;
    overflow: hidden;

    .el-submenu__title {
      border-radius: 18px;
      margin-top: 1px;
    }
    
    .el-menu-item.is-active {
      color: rgb(255, 36, 66);
      background-color: rgb(255, 233, 236)!important;
      border-radius: 18px;
    }
    .el-menu-item {
      border-radius: 18px;
      margin-top: 1px;
    }
    border: none;
    padding-left: 6px;
  }
  .main_router {
    width: 100%;
    height: 100%;
    overflow: scroll;
  }
  .main_router::-webkit-scrollbar {
    width: 0;
    height: 0;
    background-color: transparent;
  }



  // 过渡效果
.slide-enter-active, .slide-leave-active {
  transition: all 0.1s ease-out;
}


.slide-enter-to {
  position: absolute;
  right: 0;
}


.slide-enter-from {
  position: absolute;
  right: -100%;
}


.slide-leave-to {
  position: absolute;
  left: -100%;
}


.slide-leave-from {
  position: absolute;
  left: 0;
}

</style>