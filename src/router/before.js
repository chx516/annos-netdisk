import router from '@/router/router'
import store from '@/store/index.js'
import config from '@/config/index.js'
import common from '@/libs/globalFunction/common.js'
import { Message } from "element-ui";
// 路由全局前置守卫
router.beforeEach((to, from, next) => {
  // 当前路由需要登录才可进入
  if (to.matched.some((m) => m.meta.requireAuth)) {
    // 调用获取用户登录状态和信息的接口
    store.dispatch('getUserInfo').then((response) => {
      if (!store.getters.isLogin) {

        if (
          process.env.NODE_ENV !== 'development' &&
          location.origin === ''
        ) {
          common.goAccount(`/login/account`)
        } else {

          Message({
            message: response.message,
            type: 'warning'
          });
          common.removeCookies("Token")
          // 没有登录时，跳转到登录页面
          next({
            path: '/login',
            query: { Rurl: to.fullPath } //  将to参数中的url传递给login页面进行操作
          })
        }
      } else {
        // next()
        if (store.getters.role) {
          next({
            path: '/admin',
            query: { Rurl: to.fullPath } //  将to参数中的url传递给login页面进行操作
          })


        } else {
          next() // 正常跳转
        }

      }
    })
  } else {
    // 正常跳转
    next()
    // 调用获取用户登录状态和信息的接口，以便显示顶部导航栏的用户登录信息
    store.dispatch('getUserInfo')
  }
  if (to.matched.some((m) => m.meta.Admin)) {
    // 调用获取用户登录状态和信息的接口
    store.dispatch('getUserInfo').then(() => {
      if (store.getters.role && store.getters.isLogin) {
        next()
      } else {
        if (!store.getters.role) {

          console.log(store.getters.role)
          next({
            path: '/file',
            query: { fileType: 0, filePath: '/' } //  将to参数中的url传递给login页面进行操作
          })
        } else {
          next()
        }

      }

    })

  }
  // 路由发生变化修改浏览器标签 title
  if (to.meta.title) {
    document.title =
      to.name === 'Home'
        ? `${config.siteName} - ${to.meta.title}`
        : `${to.meta.title} - ${config.siteName}`
  }

  // 路由发生变化修改页面 meta 描述信息
  if (to.meta.content) {
    let head = document.getElementsByTagName('head')
    let meta = document.createElement('meta')
    document
      .querySelector('meta[name="description"]')
      .setAttribute('content', to.meta.content.description)
    meta.content = to.meta.content
    head[0].appendChild(meta)
  }
})
