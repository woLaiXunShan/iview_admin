import router from '../router'
import store from '../store'
let tags // tag标签

router.beforeEach((to, from, next) => {
  if (sessionStorage.login) {
    // 跳转时添加tags
    if (to.name !== 'login') {
      if (sessionStorage.tags && sessionStorage.tags !== 'undefined') {
        tags = JSON.parse(sessionStorage.tags)
      } else {
        tags = []
      }
      let tagsItem = {
        title: to.meta.title,
        name: to.name,
        url: to.path
      }
      let orPush = true // 是否添加到tags
      if (tags.length === 0) {
        tags.push(tagsItem)
      } else {
        tags.forEach(item => {
          if (to.name === item.name) {
            orPush = false
            if (to.meta.isChange) {
              item.url = to.path
            }
          }
        })
        if (orPush) {
          tags.push(tagsItem)
        }
      }
    }
    sessionStorage.tags = JSON.stringify(tags)
    store.commit('TAG', JSON.stringify(tags))
    next()
  } else {
    if (to.path === '/login') {
      next()
    } else {
      next({ path: '/login' })
    }
  }
})
