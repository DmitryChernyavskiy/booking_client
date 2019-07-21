import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App),
  created: function () {
    store.dispatch('ROOMS', '')
    store.dispatch('USERS', '')
    // store.dispatch('ADD_MOUNTH', 0)
  }
}).$mount('#app')
