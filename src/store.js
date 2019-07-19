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
    obj: odjData,
    events: [],
    curEvent: [],
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
    },
    EVENTS: state => {
      return state.events
    },
    CHILD_EVENTS: state => {
      let cildEvents = []
      for (let j=0; j<state.curEvent.length; j++){
        let elem = state.curEvent[j]
        cildEvents.push(new Event(elem.id_elem, elem.date_start.substr(11,5), elem.date_end.substr(11,5)));
      }
      return cildEvents
    },
    BASE_EVENT: state => {
      return state.curEvent[0]
    }
  },

  mutations: {
    INIT_LIST: (state, payload) => {
      state.obj.getListDay();
        
        let test = state.events
        let listday = state.listday
        for (let key in listday) {
            for (let i=0; i<6; i++){
              let elem = listday[key][i];

              for (let j=0; j<test.length; j++){
                  if ((test[j].day_of_month === elem.name) && (!elem.alienday)){
                      elem.events.push(new Event(test[j].id_event, test[j].date_start.substr(11,5), test[j].date_end.substr(11,5)))
                      //time "2019-07-18 10:15:00".substr(11,5)        "2019-07-18 10:15:00".slice(11,16)
                      //date "2019-07-18 10:15:00".substr(0,10)        "2019-07-18 10:15:00".slice(0, 10)
                  }
              }
            }
        }
    },
    ADD_MOUNTH: (state, payload) => {
      state.obj.setMonth(payload)
      state.events = []
    },
    BASE_EVENT: (state, payload) => {
      state.curEvent = payload
    }
  },

  actions: {
    INIT_LIST: (context, payload) => {
      context.commit('INIT_LIST', "");

    },
    ADD_MOUNTH: (context, payload) => {
        
      context.commit('ADD_MOUNTH', payload)
      
      let tmp = new Date(context.state.curData);
      let year = tmp.getFullYear();
      let mounth = tmp.getMonth();
      tmp.setMonth(mounth+1); //tmp.setDate(0);
      //let countDay = tmp.getMonth();
      let Date1 = Date.UTC(year, mounth, 1);
      let Date2 = Date.UTC(tmp.getFullYear(), tmp.getMonth(), 1);
      
      Axios.get('http://173.212.224.161/booking/server/api/events/Events', {
        auth: {
            username: "user101",
            password: "123"
        }},{
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
        }})
        .then(function(response) {
                context.state.events = response.data
                context.commit('INIT_LIST', "")
            }
        )
        .catch(function(err) {  
          console.log('Fetch Error :-S', err);  
        })
      
    },

    REQUEST_EVENT: (context, payload) => {
          
      Axios.get('http://173.212.224.161/booking/server/api/events/Events', {
        auth: {
            username: "user101",
            password: "123"
        },
        params: { id_event: payload }},{
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
        }
        })
        .then(function(response) {
                context.commit('BASE_EVENT', response.data)
            }
        )
        .catch(function(err) {  
          console.log('Fetch Error :-S', err);  
        })
      
    },

    SAVE_TODO: async (context, payload) => {
      // let { data } = await Axios.post('http://xxx.com/api/todo')
      context.commit('ADD_MOUNTH', payload)
    }
 
  }
})
