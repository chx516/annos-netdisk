import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'Home',
      component: () => import(/* webpackChunkName: "home" */ '_v/Home.vue'),
      meta: {
        title:
          'annos 网盘',
        content: {
          description:
            ''
        }
      }
    },

    {
      path: '/login',
      name: 'login',
      component: () =>
        import(/* webpackChunkName: "register" */ '_v/loginRegister.vue'),
      meta: { title: '登录注册' }
    },
    {
      path: '/file',
      name: 'File',
      component: () => import(/* webpackChunkName: "file" */ '_v/File.vue'),
      meta: {
        requireAuth: true, //  当前路由是否需要登录才可进入
        title: '我的网盘',
        content: {
          description: '图片 文档 视频 音乐 其他 回收站 我的分享 anno商城 账户中心'
        }
      }
    },
    {
      path: '/admin',
      name: 'Admin',
      component: () => import(/* webpackChunkName: "file" */ '_v/Admin.vue'),
      meta: {
        // requireAuth: true, //  当前路由是否需要登录才可进入
        Admin: true,       //当前路由是否需要管理员才可进入
        title: '后台管理',
        content: {
          description: '图片 文档 视频 音乐 其他 回收站 我的分享 anno商城 账户中心'
        }
      }
    },

    {
      path: '/share/:shareBatchNum',
      name: 'Share',
      component: () => import(/* webpackChunkName: "share" */ '_v/Share.vue'),
      meta: {
        title: '分享',
        content: {
          description: '查看他人分享'
        }
      },
      props: true
    },
    {
      path: '/repass/:retoken',
      name: 'Repass',
      component: () => import("_v/Repass.vue"),
      title: '重置密码'
    },
    {
      path: '/notice/:noticeId',
      name: 'NoticeDetail',
      component: () =>
        import(
					/* webpackChunkName: "noticeDetail" */ '_v/notice/NoticeDetail.vue'
        ),
      meta: {
        title: '公告详情',
        content: {
          description: '公告详情'
        }
      }
    },
    {
      path: '*',
      name: 'Error_404',
      component: () =>
        import(/* webpackChunkName: "error_404" */ '_v/ErrorPage/404.vue'),
      meta: { title: '链接不存在' }
    }
  ]
})

const originalPush = Router.prototype.push
Router.prototype.push = function push(location) {
  return originalPush.call(this, location).catch((err) => err)
}
