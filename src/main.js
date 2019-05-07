import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import iView from 'iview'
import 'iview/dist/styles/iview.css'
import './utils/guard'

import fetch from './api'
import date from './utils/date'
Vue.prototype.fetch = fetch
Vue.prototype.$date = date

Vue.config.productionTip = false
Vue.use(iView)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
