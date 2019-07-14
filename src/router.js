import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import EventView from './views/EventView.vue'
import AdminView from './views/AdminView.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/Event/:id',
      name: 'EventView',
      component: EventView,
      props: true
    },
    {
      path: '/admin',
      name: 'AdminView',
      component: AdminView
    }
  ]
})
