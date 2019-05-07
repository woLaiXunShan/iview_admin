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
      name: '',
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
    // },
    // {
    //   path: '',
    //   name: '',
    //   component: Main,
    //   children: [
    //     {
    //       path: '/visitLog',
    //       name: 'visitLog',
    //       component: _import_('visitLog/Index'),
    //       meta: {
    //         title: '访问日志'
    //       }
    //     }
    //   ],
    //   meta: {
    //     title: '访问日志'
    //   }
    }
  ]
})
