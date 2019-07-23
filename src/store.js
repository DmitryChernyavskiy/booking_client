import Vue from 'vue'
import Vuex from 'vuex'
import Axios from 'axios'
import Calendar from './libs/Calendar'
import Event from './libs/Event'
import * as DateTime from './libs/Date'

Vue.use(Vuex)

const base = Axios.create({
  baseURL: 'http://173.212.224.161/booking/server/api', // config.BASE_API_URL
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
  }
})

var odjData = new Calendar()
odjData.getListDay()

export default new Vuex.Store({
  state: {
    curData: odjData.curData,
    listday: odjData.listDay,
    obj: odjData,
    events: [],
    curEvent: [], // array join base event + all child
    eventsForCreate: [],
    curBaseEvent: undefined,
    user: { name: '', password: '' , id: '0', role: ''},
    rooms: [],
    curRoom: undefined,
    users: [],
    curUser: undefined,
    errorMsg: ""
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
      for (let j = 0; j < state.curEvent.length; j++) {
        let elem = state.curEvent[j]
        cildEvents.push(new Event(elem.id_event, elem.id, DateTime.extractTime(elem.date_start), DateTime.extractTime(elem.date_end), DateTime.extractDate(elem.date_start)))
      }
      return cildEvents
    },
    BASE_EVENT: state => {
      return state.curBaseEvent
    },
    ROOMS: state => {
      return state.rooms
    },
    CUR_ROOM: state => {
      return state.curRoom
    },
    USERS: state => {
      return state.users
    },
    USER: state => {
      return state.user
    },
    CUR_USER: state => {
      return state.curUsers
    },
    ERROR_MSG: state => {
      return state.errorMsg
    }
  },

  mutations: {
    INIT_LIST: (state, payload) => {
      state.obj.getListDay()

      let test = state.events
      let listday = state.listday
      for (let key in listday) {
        for (let i = 0; i < 6; i++) {
          let elem = listday[key][i]
          elem.events.length = 0// elem.events = []//clear

          for (let j = 0; j < test.length; j++) {
            if ((test[j].day_of_month === elem.name) && (!elem.alienday)) {
              elem.events.push(new Event(test[j].id_event, test[j].id, DateTime.extractTime(test[j].date_start), DateTime.extractTime(test[j].date_end)))
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
      state.curBaseEvent = payload[0]
    },
    NEW_BASE_EVENT: (state, payload) => {
      state.curEvent = []
      state.curBaseEvent = payload
    },
    ROOMS: (state, payload) => {
      state.rooms = payload
    },
    CUR_ROOM: (state, payload) => {
      state.curRoom = payload
    },
    USERS: (state, payload) => {
      state.users = payload
    },
    USER: (state, payload) => {
      state.user = payload
    },
    CUR_USER: (state, payload) => {
      state.curUser = payload
    },
    ERROR_MSG: (state, payload) => {
      state.error_msg = payload
    }
  },

  actions: {
    INIT_LIST: (context, payload) => {
      context.commit('INIT_LIST', '')
    },
    ADD_MOUNTH: (context, payload) => {
      context.commit('ADD_MOUNTH', payload)

      let curRoom = context.state.curRoom
      if (typeof (curRoom) !== 'object') {
        return
      }

      let paramApi = { id_room: curRoom.id }
      if (context.state.curUser !== undefined) {
        paramApi['id_user'] = context.state.curUser.id
      }

      let tmp = new Date(context.state.curData)
      let year = tmp.getFullYear()
      let mounth = tmp.getMonth()
      tmp.setMonth(mounth + 1) // tmp.setDate(0);
      // let countDay = tmp.getMonth();
      let dateStart = DateTime.DataToSql(year, mounth + 1, 1)
      let dateEnd = DateTime.DataToSql(tmp.getFullYear(), tmp.getMonth() + 1, 1)
      paramApi['date_start'] = dateStart
      paramApi['date_end'] = dateEnd

      base.get('/events/Events', {
        auth: context.state.user,
        params: paramApi
      })
        .then(function (response) {
          context.state.events = response.data
          context.commit('INIT_LIST', '')
        })
        .catch(function (err) {
          context.state.events = []
          context.commit('INIT_LIST', '')
          console.log('Fetch Error :-S', err)
        })
    },

    REQUEST_EVENT: (context, payload) => {
      base.get('/events/Events', {
        auth: context.state.user,
        params: { id_event: payload }
      })
        .then(function (response) {
          context.commit('BASE_EVENT', response.data)
        })
        .catch(function (err) {
          console.log('Fetch Error :-S', err)
        })
    },

    ROOMS: (context, payload) => {
      base.get('/events/Rooms', {
        auth: context.state.user
      })
        .then(function (response) {
          context.commit('ROOMS', response.data)

          if (response.data.length > 0) {
            // context.commit('CUR_ROOM', response.data[0])
          }
        })
        .catch(function (err) {
          console.log('Fetch Error :-S', err)
        })
    },

    USERS: (context, payload) => {
      base.get('/users/ListUsers', {
        auth: context.state.user,
        params: payload
      })
        .then(function (response) {
          context.commit('USERS', response.data)
        })
        .catch(function (err) {
          console.log('Fetch Error :-S', err)
        })
    },

    RESET_USER: (context, payload) => {
      context.commit('USER', {id: '0', name: '', password: '', role: ''})
    },

    CHECK_USER: (context, payload) => {
        //context.commit('USER', {id: '1', user: 'user10', password: '123', role: 'admin'})
        //return
      base.get('/users/User', {
        auth: context.state.user,
        params: payload
      })
        .then(function (response) {
          let user = response.data[0]
          context.commit('USER', user)
          context.commit('ERROR_MSG', '')
          context.dispatch('USERS', (user.role!=='admin' ? {id : user.id} : ''))
        })
        .catch(function (err) {
          context.commit('ERROR_MSG', 'There is no user with this password.')
        })
    },
    
    ADD_USER: (context, payload) => {
      base.post('/users/User', JSON.stringify({
        auth: context.state.user,
        params: payload
      }))
        .then(function (response) {
          context.dispatch('USERS', '')
        })
        .catch(function (err) {
          console.log('Fetch Error :-S', err)
        })
    },

    UPD_USER: (context, payload) => {
      base.put('/users/User', JSON.stringify({
        auth: context.state.user,
        params: payload
      }))
        .then(function (response) {
          context.dispatch('USERS', '')
        })
        .catch(function (err) {
          console.log('Fetch Error :-S', err)
        })
    },

    USERS_ADMIN: (context, payload) => {
      base.get('/users/AllUsers', {
        auth: context.state.user
      })
        .then(function (response) {
          context.commit('USERS', response.data)
        })
        .catch(function (err) {
          console.log('Fetch Error :-S', err)
        })
    },
 
    SAVE_CHILD_EVENT: (context, payload) => {
      base.post('/events/EventChild', JSON.stringify({
        auth: context.state.user,
        params: payload
      }))
        .then(function (response) {
          payload.created = true
          let event = context.state.eventsForCreate
          let error = false
          let lastTask = true
          for (let i=0; i<event.length; i++){
              let task = event[i]
              if (task.created===undefined){
                lastTask = false
                continue
              }
              if (task.created===false){
                error = true
                break
              }
          }
          if (lastTask){
              if (error){
                  context.commit('ERROR_MSG', "Error: Some of the orders failed to create.")
              }else{
                  context.commit('ERROR_MSG', "")
                  context.dispatch('ADD_MOUNTH', 0)
                  context.dispatch('REQUEST_EVENT', payload.id_event)
              }
          }
        })
        .catch(function (err) {
          payload.created = false
          let event = context.state.eventsForCreate
          let error = false
          let lastTask = true
          for (let i=0; i<event.length; i++){
              let task = event[i]
              if (task.created===undefined){
                lastTask = false
                continue
              }
              if (task.created===false){
                error = true
                break
              }
          }
          if (lastTask && error){
             context.commit('ERROR_MSG', "Error: Some of the orders failed to create.")
          }
          console.log('Fetch Error :-S', err)
        })
    },
 
    SAVE_BASE_EVENT: (context, payload) => {
      base.post('/events/Event', JSON.stringify({
        auth: context.state.user,
        params: {
            date_start: payload.base_date_start,
            date_end: payload.base_date_end,
            note: payload.base_note,
            id_event: payload.id_event,
            id_user: context.state.user.id,
            id_room: payload.id_room
        }
      }))
        .then(function (response) {
          let event = context.state.eventsForCreate
          for (let i=0; i<event.length; i++){
              let task = event[i]
              task.id_event = response.data
              context.dispatch('SAVE_CHILD_EVENT', task)
          }
        })
        .catch(function (err) {
          console.log('Fetch Error :-S', err)
          context.commit('ERROR_MSG', "Error: " + err)
        })
    },

    DELETE_BASE_EVENT: (context, payload) => {
      base.post('/events/DeleteEvent', JSON.stringify({
        auth: context.state.user,
        params: {
            id: payload
        }
      }))
        .then(function (response) {
          context.commit('ERROR_MSG', "")
          //context.dispatch('ADD_MOUNTH', 0)
          //context.dispatch('REQUEST_EVENT', '0')
        })
        .catch(function (err) {
          console.log('Fetch Error :-S', err)
          context.commit('ERROR_MSG', "Error: " + err)
        })
    },

    CHECK_PERIOD: (context, payload) => {
      base.get('/events/CheckPeriod', {
        auth: context.state.user,
        params: payload
      })
        .then(function (response) {
          payload.checked = true
          let event = context.state.eventsForCreate
          let error = false
          let lastTask = true
          for (let i=0; i<event.length; i++){
              let task = event[i]
              if (task.checked===undefined){
                lastTask = false
                continue
              }
              if (task.checked===false){
                error = true
                break
              }
          }
          if (lastTask){
              if (error){
                  context.commit('ERROR_MSG', "Error: Creation of the order is impossible. This time is taken.")
              }else{
                  context.dispatch('SAVE_BASE_EVENT', event[0])
              }
          }
        })
        .catch(function (err) {
          payload.checked = false
          let event = context.state.eventsForCreate
          let error = false
          let lastTask = true
          for (let i=0; i<event.length; i++){
              let task = event[i]
              if (task.checked===undefined){
                lastTask = false
                continue
              }
              if (task.checked===false){
                error = true
                break
              }
          }
          if (lastTask && error){
              context.commit('ERROR_MSG', "Error: Creation of the order is impossible. This time is taken.")
          }
          console.log('Fetch Error :-S', err)
        })
    },
    
    CREATE_EVENTS: (context, payload) => {
        context.state.eventsForCreate = payload
        context.commit('ERROR_MSG', "")
        for (let i=0; i<payload.length; i++){
            let task = payload[i]
            context.dispatch('CHECK_PERIOD', task)
        }
    }

  }
})
