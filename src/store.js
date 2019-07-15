import Vue from 'vue'
import Vuex from 'vuex'
import Axios from 'axios'
import Calendar from './libs/Calendar'
import Event from './libs/Event'

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
    ADD_MOUNTH: (state, payload) => {
      state.obj.addMonth(payload)
    }
  },

  actions: {
    /*ADD_MOUNT: (mounth) {
      context.commit('ADD_MOUNTH', mounth);

    },*/
    GET_TODO: async (context, payload) => {
      let { data } = await Axios.get('http://xxx.com/api/todo')
      if (data.status === 200) {
        context.commit('ADD_MOUNTH', data)
      }
    },

    SAVE_TODO: async (context, payload) => {
      // let { data } = await Axios.post('http://xxx.com/api/todo')
      context.commit('ADD_MOUNTH', payload)
    }
    /*axios.all([
      axios.get('http://google.com'),
      axios.get('http://apple.com')
  ]).then(axios.spread((googleRes, appleRes) => {
      // do something with both responses
  });*/
  }
})
