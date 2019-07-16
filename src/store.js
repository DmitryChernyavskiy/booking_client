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
    GET_EVENTS: async (context, payload) => {
      let tmp = Object.assign({}, state.curData);
      let year = tmp.getFullYear();
      let mounth = tmp.getMonth();
      tmp.setMonth(mounth+1); //tmp.setDate(0);
      //let countDay = tmp.getMonth();
      let Date1 = Date.UTC(year, mounth, 1);
      let Date2 = Date.UTC(tmp.getFullYear(), tmp.getMonth(), 1);

      let test = [{id: 1, date_start: '2019-07-17 15:30:00', date_end: '2019-07-17 18:30:00'},
      {id: 2, date_start: '2019-07-17 18:30:00', date_end: '2019-07-17 20:00:00'},
      {id: 3, date_start: '2019-07-17 10:15:00', date_end: '2019-07-17 11:00:00'}]

      for (key in state.listday) {
          for (let i=0; i<6; i++){
            state.listday[key][i]
          }
      }
    },
    GET_EVENT: async (context, payload) => {
      let tmp = Object.assign({}, state.curData);
      let year = tmp.getFullYear();
      let mounth = tmp.getMonth();
      tmp.setMonth(mounth+1); //tmp.setDate(0);
      //let countDay = tmp.getMonth();
      let Date1 = Date.UTC(year, mounth, 1);
      let Date2 = Date.UTC(tmp.getFullYear(), tmp.getMonth(), 1);

      let { data } = await Axios.get('http://173.212.224.161/booking/server/api/events/Events', {
            date_start: Date1,
            date_end: Date12
        }, {headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
            }})
      if (data.status === 200) {
        context.commit('ADD_MOUNTH', data)
      }
    },


    SAVE_TODO: async (context, payload) => {
      // let { data } = await Axios.post('http://xxx.com/api/todo')
      context.commit('ADD_MOUNTH', payload)
    }
 
  }
})
