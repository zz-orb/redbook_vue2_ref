import Vue from 'vue'
import VueRouter from 'vue-router'

// 组件位置

// 登录注册Login
import Login from '../views/Login.vue'
import CoreLogin from '../components/login/CoreLogin.vue'
import CoreRegister from '../components/login/CoreRegister.vue'

// 核心Red
import Red from '../views/Red.vue'
import Explore from '../components/explore/Explore.vue'
// import About from '../components/explore/About.vue'
import PubNote from '../components/explore/PubNote.vue'

// // 管理员 利用旧的Publish组件
import admin from '../views/Admin.vue'
// import PubNote from '../components/publish/PubNote.vue'
import ManageNote from '../components/admin/ManageNote.vue'
import ManageGoods from '../components/admin/ManageGoods.vue'
import Rebate from '../components/admin/Rebate.vue'

// 购物Shop
import templateVUE from '../components/shop/templateVUE.vue'
import Goods from '../components/shop/Goods.vue'
import Orders from '../components/shop/Orders.vue'
import ShopCar from '../components/shop/ShopCar.vue'
// import Settings from '../components/shop/Settings.vue'

// 我Mine
import templateVUE2 from '../components/mine/templateVUE.vue'
import Personal from '../components/mine/Personal.vue'
// import Rebate from '../components/mine/Rebate.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '',
    redirect:"/login"
  },
  // 登录
  {
    path: '/login',
    component: Login,
    children: [
      {
        path: '/',
        redirect:"coreLogin"
      },
      {
        path: 'coreLogin',
        component: CoreLogin
      },
      {
        path: 'coreRegister',
        component: CoreRegister
      }
    ]
  },
  // 小红书主页
  {
    path: '/Red',
    component: Red,
    children: [
      {
        path: '/',
        redirect:"Explore"
      },
      {
        path: 'Explore',
        component: Explore
      },
      // {
      //   path: 'About',
      //   component: About
      // },
      {
        path: 'PubNote',
        component: PubNote
      },
      // 购物
      {
        path: 'Shop',
        component: templateVUE,
        children: [
          {
            path: '/',
            redirect:"Goods"
          },
          {
            path: 'Goods',
            component: Goods
          },
          {
            path: 'ShopCar',
            component: ShopCar
          },
          {
            path: 'Orders',
            component: Orders
          },
          // {
          //   path: 'Settings',
          //   component: Settings
          // }
        ]
      },
      // 我
      // 购物
      {
        path: 'Mine',
        component: templateVUE2,
        children: [
          {
            path: '/',
            redirect:"Psersonal"
          },
          {
            path: 'Personal',
            component: Personal
          },
          // {
          //   path: 'Rebate',
          //   component: Rebate
          // }
        ]
      }

    ]
  },
  // 管理员
  {
    path: '/Admin',
    component: admin,
    children: [
      {
        path: '/',
        redirect:"ManageNote"
      },
      {
        path: 'ManageNote',
        component: ManageNote
      },
      {
        path: 'ManageGoods',
        component: ManageGoods
      },
      {
        path: 'Rebate',
        component: Rebate
      }
    ]
  }
]

const router = new VueRouter({
  history:'hash',
  routes
})

// 路由导航守卫
router.beforeEach((to, from, next) => {
  if (to.path === '/login') {
    return next()
  }
  if (to.path === '/login/coreLogin') {
    return next()
  }
  if (to.path === '/login/coreRegister') {
    return next()
  }

  const tokenStr = window.sessionStorage.getItem('token')
  if (!tokenStr) {
    return next('/login')
  }

  return next()

})

export default router
