import Vue from 'vue'
import Router from 'vue-router'
import Main from '@/components/main'

Vue.use(Router)
const _import_ = file => () => import('./views/' + file + '.vue')
// const Main = '@/components/main/Index'

export default new Router({
  routes: [
    {
      path: '/login',
      name: 'login',
      component: () => import('./views/login/Index.vue'),
      meta: {
        title: '登录'
      }
    },
    {
      path: '',
      name: 'home_',
      component: Main,
      // redirect: '/',
      children: [
        {
          path: '/',
          name: 'home',
          component: _import_('Home'),
          meta: {
            title: '首页'
          }
        }
      ]
    },
    {
      path: 'WeChatUser',
      name: 'WeChatUser',
      component: Main,
      meta: {
        title: '微信用户管理',
        icon: 'ios-navigate'
      },
      children: [
        {
          path: '/WeChatUser',
          name: 'WeChatUserList',
          component: _import_('WeChatUser/Index'),
          meta: {
            title: '微信用户列表'
          }
        }
      ]
    },
    // {
    //   path: 'WeChatUser',
    //   name: 'WeChatUser1',
    //   component: Main,
    //   meta: {
    //     title: '微信用户管理',
    //     icon: 'ios-navigate'
    //   },
    //   children: [
    //     {
    //       path: '/WeChatUser',
    //       name: 'WeChatUserList1',
    //       component: _import_('WeChatUser/Index'),
    //       meta: {
    //         title: '微信用户列表'
    //       }
    //     }
    //   ]
    // },
  ]
})
