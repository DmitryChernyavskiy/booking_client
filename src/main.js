import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import VeeValidate from 'vee-validate'

Vue.use(VeeValidate, {
  mode: 'lazy'
})
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
