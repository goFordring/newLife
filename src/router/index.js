import Vue from 'vue'
import VueRouter from 'vue-router'
// import Login from '../views/Login.vue'


Vue.use(VueRouter)

const routes = [
  {
    path:'/chooseworker',
    name:'chooseworker',
    component:()=>import('../views/chooseWorker.vue')
  },
  {
    path: '/cashdetail',
    name: 'cashdetail',
    component: () => import('../views/wallet/cashDetail.vue')
  },
  {
    path: '/cash',
    name: 'cash',
    component: () => import('../views/wallet/getCash.vue')
  },
  {
    path: "/bill",
    name: 'bill',
    component: () => import('../views/wallet/bill.vue')
  },
  //  这是隐私 页面
  {
    path: "/wallet",
    name: 'wallet',
    component: () => import('../views/wallet/wallet.vue')
    // children:[
    // {
    //   path: "/bill",
    //   name: 'bill',
    //   component: () => import('../views/wallet/bill.vue') 
    // }
    // ]
  },
  {
    path: "/ys",
    name: 'ys',
    component: () => import('../views/ys.vue')
  },
  {
    path: "/about",
    name: 'about',
    component: () => import('../views/About.vue')
  },
  // 二次工时
  // {
  //   path: "/oldworkertime",
  //   name: 'oldworkertime',
  //   component: () => import('../views/oldWorkersTime.vue')
  // },
  {
    path: "/navigation",
    name: 'navigation',
    component: () => import('../views/navigation.vue')
  },
  // 技师修改资料
  {
    path: "/revise",
    name: 'revise',
    component: () => import('../views/revise.vue')
  },
  // 选择时间
  {
    path: "/workershours",
    name: 'workershours',
    component: () => import('../views/workersHours.vue')
  },
  {
    path: "/choosetime",
    name: 'choosetime',
    component: () => import('../views/chooseTime.vue')
  },
  // 订单进程页面
  {
    path: "/orderprocess",
    name: 'orderprocess',
    component: () => import('../views/orderProcess.vue')
  },
  // 订单详情
  {
    path: "/orderdetail",
    name: 'orderdetail',
    component: () => import('../views/orderDetail.vue')
  },
  // 修改密码
  {
    path: "/xiugaipsd",
    name: 'xiugaipsd',
    component: () => import('../views/xiugaiPsd.vue')
  },

  //技师端列表
  {
    path: "/demandarr",
    name: 'demandarr',
    component: () => import('../views/demandArr.vue')
  },
  {
    path: "/resetworkerpsd",
    name: 'resetworkerpsd',
    component: () => import('../views/resetWorkerPsd.vue')
  },
  //  重置密码
  {
    path: "/resetworkerpsd",
    name: 'resetworkerpsd',
    component: () => import('../views/resetWorkerPsd.vue')
  },
  // 技师首页
  {
    path: "/workerhome",
    name: 'workerhome',
    component: () => import('../views/workerHome.vue')
  },
  // 完善技师信息
  {
    path: "/setworkerinfo",
    name: 'setuserinfo',
    component: () => import('../views/setWorkerInfo.vue')
  },
  // 找回密码 输入手机号码
  {
    path: "/findpadp",
    name: 'findpadp',
    component: () => import('../views/findpadP.vue')
  },
  // 找回密码 输入验证码
  {
    path: "/findpadv",
    name: "findpadv",
    component: () => import('../views/findpadV.vue')
  },
  // 输入密码 
  {
    path: '/password',
    name: "password",
    component: () => import('../views/passWord.vue')
  },
  // 输入验证码 
  {
    path: '/verificationcode',
    name: "verificationcode",
    component: () => import('../views/VerificationCode.vue')
  },
  // 验证手机号码页面
  {

    path: '/',
    name: 'inspectNumbers',
    component: () => import('../views/inspectNumbers.vue')


  },
  // {
  //   path: '/',
  //   name: 'login',
  //   component: () =>import('../views/Login.vue')
  // },
  {
    path: '/about',
    name: 'about',
    component: () => import( /* webpackChunkName: "about" */ '../views/About.vue')
  },


]
// 设置全局守卫





const router = new VueRouter({
  mode: 'hash',
  base: process.env.BASE_URL,
  routes,

})
// router.
// router.beforeEach((to, from, next) => {
// const tokensign = localStorage.getItem('token')
// //to.path 目标路由
// //next 必须有否则程序不会继续执行
// // if(to.path !== '/inspectNumbers' && !tokensign) { return next('/inspectNumbers') }else{

// // }
// //     next()

// })
router.beforeEach((to, from, next) => {
  //  判断当前登录状态
  if (localStorage.getItem('token')) {

    next()
  } else {
    // 此时没有登录状态
    //  if(to.path =='/'){
    //    next();
    //  }else{
    //    next('/')
    //  }
    if (to.path == '/password') {
      next();
    } else if (to.path == '/verificationcode') {
      next();
    } else if (to.path == '/findpadp') {
      next();
    } else if (to.path == '/') {
      next();
    } else if(to.path == '/findpadv'){
      next();
    }else if(to.path == '/resetworkerpsd'){
      next();
    }else if(to.path == '/setworkerinfo'){
      next();
    }else {
      next('/')
    }
  }
})

const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}

export default router