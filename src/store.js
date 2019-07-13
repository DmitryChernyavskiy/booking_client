import Vue from 'vue'
import Vuex from 'vuex'
import Axios from 'axios'
import Calendar from './libs/Calendar'

Vue.use(Vuex)

var odjData = new Calendar()
odjData.getListDay()

export default new Vuex.Store({
  state: {
    curData: odjData.curData,
    listday: odjData.listDay,
    obj: odjData
  },

  getters: {
    CUR_DATA: state => {
      return state.curData
    },
    LIST_DAY: state => {
      return state.listday
    },
    OBJ: state => {
      return state.obj
    }
  },

  mutations: {
    SET_TODO: (state, payload) => {
      state.todos = payload
    },

    ADD_TODO: (state, payload) => {
      state.todos.push(payload)
    }
  },

  actions: {
    GET_TODO: async (context, payload) => {
      let { data } = await Axios.get('http://yourwebsite.com/api/todo')
      if (data.status === 200) {
        context.commit('SET_TODO', data)
      }
    },

    SAVE_TODO: async (context, payload) => {
      // let { data } = await Axios.post('http://yourwebsite.com/api/todo')
      context.commit('ADD_TODO', payload)
    }
  }
})
