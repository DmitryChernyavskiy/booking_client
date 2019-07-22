import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import EventView from './views/EventView.vue'
import AdminView from './views/AdminView.vue'
import LogintView from './views/LoginView.vue'
import store from './store'

Vue.use(Router)

const router = new Router({
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
      props: true,
      meta: {
          requiresAuth: true
      }
    },
    {
      path: '/admin',
      name: 'AdminView',
      component: AdminView,
      meta: {
          requiresAuth: true,
          store: store,
          role: 'admin'
      }
    },
    {
      path: '/Login',
      name: 'LoginView',
      component: LogintView
    }
  ]
})

router.beforeEach((to, from, next) => {
  //console.log(record.meta)
  if(to.matched.some(record => record.meta.requiresAuth)) {
    
      if (store.getters.USER) {
        if (store.getters.USER.role==='admin')
        {
          next()
          return
        }
      }
      next('/')
  } else {
      next()
  }
})

export default router