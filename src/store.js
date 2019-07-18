import Vue from 'vue'
import Vuex from 'vuex'
import Axios from 'axios'
import Calendar from './libs/Calendar'
import Event from './libs/Event'
import Api from './libs/Api'

Vue.use(Vuex)

var odjData = new Calendar()
//odjData.getListDay()

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
    INIT_LIST: (state, payload) => {
      state.obj.getListDay();
    },
    ADD_MOUNTH: (state, payload) => {
      state.obj.addMonth(payload)
    },
    ADD_MOUNTH: (state, payload) => {
      state.obj.addMonth(payload)
    }
  },

  actions: {
    /*ADD_MOUNT: (mounth) {
      context.commit('ADD_MOUNTH', mounth);

    },*/
    ADD_MOUNTH: (context, payload) => {
        
      context.commit('ADD_MOUNTH', payload);
      console.log('tmp');  
      let tmp = new Date(context.getters.CUR_DATA);
      console.log('tmp');
      let year = tmp.getFullYear();
      let mounth = tmp.getMonth();
      tmp.setMonth(mounth+1); //tmp.setDate(0);
      //let countDay = tmp.getMonth();
      let Date1 = Date.UTC(year, mounth, 1);
      let Date2 = Date.UTC(tmp.getFullYear(), tmp.getMonth(), 1);

      let test = [{id: 1, day_of_month: 17, date_start: '2019-07-17 15:30:00', date_end: '2019-07-17 18:30:00'},
      {id: 2, day_of_month: 17, date_start: '2019-07-17 18:30:00', date_end: '2019-07-17 20:00:00'},
     {id: 4, day_of_month: 17, date_start: '2019-07-17 18:30:00', date_end: '2019-07-17 20:00:00'},
     {id: 5, day_of_month: 17, date_start: '2019-07-17 18:30:00', date_end: '2019-07-17 20:00:00'},
     {id: 6, day_of_month: 17, date_start: '2019-07-17 18:30:00', date_end: '2019-07-17 20:00:00'},
     {id: 7, day_of_month: 17, date_start: '2019-07-17 18:30:00', date_end: '2019-07-17 20:00:00'},
     {id: 8, day_of_month: 17, date_start: '2019-07-17 18:30:00', date_end: '2019-07-17 20:00:00'},
     {id: 9, day_of_month: 17, date_start: '2019-07-17 18:30:00', date_end: '2019-07-17 20:00:00'},
     {id: 10, day_of_month: 17, date_start: '2019-07-17 18:30:00', date_end: '2019-07-17 20:00:00'},
      {id: 3, day_of_month: 18, date_start: '2019-07-18 10:15:00', date_end: '2019-07-18 11:00:00'}]
  
      Api.getEvents(Date1, Date2);
    /*let { data } = Axios.get('http://173.212.224.161/booking/server/api/events/Events', {
            //date_start: Date1,
            //date_end: Date12
        }, {headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
            }})
      if (data.status === 200) {
        //context.commit('ADD_MOUNTH', data)
      }*/
                
       /*Axios.get('http://173.212.224.161/booking/server/api/events/Events', {
        auth: {
            username: "user10",
            password: "123"
        }},{
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
            'Access-Control-Allow-Origin': '*'
        }})
        .then(response => (test = response))
        .catch(function(err) {  
          console.log('Fetch Error :-S', err);  
        })*/

        /*fetch('http://173.212.224.161/booking/server/api/events/Events', {
            method: 'GET', // *GET, POST, PUT, DELETE, etc.
            cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
            credentials: 'same-origin', // include, *same-origin, omit
            headers: {
                'Content-Type': 'application/json',
                'Origin': '',
                 //'Content-Type': 'application/x-www-form-urlencoded',
                 'Authorization': 'Basic User10:123',
            },
            redirect: 'follow', // manual, *follow, error
            referrer: 'no-referrer', // no-referrer, *client
        })
        .then(function(response) {
          debugger;
          //response.json()
        })
        .catch(function(err) {  
          console.log('Fetch Error :-S', err);  
        })*/
                
        /*fetch('http://173.212.224.161/booking/server/api/events/Events', {
            method: 'GET', // *GET, POST, PUT, DELETE, etc.
            mode: 'no-cors', // no-cors, cors, *same-origin
            cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
            credentials: 'same-origin', // include, *same-origin, omit
            headers: {
                'Content-Type': 'application/json',
                 //'Content-Type': 'application/x-www-form-urlencoded',
                 'Authorization': 'Basic User10:123',
            },
            auth: {
                username: "user10",
                password: "123"
            },
            redirect: 'follow', // manual, *follow, error
            referrer: 'no-referrer', // no-referrer, *client
            //body: JSON.stringify(data), // тип данных в body должен соответвовать значению заголовка "Content-Type"
        }).then(  
          function(response) {  
            if (response.status !== 200) {  
              console.log('Looks like there was a problem. Status Code: ' +  
                response.status);  
              return;  
            }

            // Examine the text in the response  
            response.json().then(function(data) {  
              console.log(data);  
            });  
          }  
        )  
        .catch(function(err) {  
          console.log('Fetch Error :-S', err);  
        });*/
      
      let listday = context.state.listday
      for (let key in listday) {
          for (let i=0; i<6; i++){
            let elem = listday[key][i];
            
            for (let j=0; j<test.length; j++){
                if ((test[j].day_of_month === elem.name) && (!elem.alienday)){
                    elem.events.push(new Event(test[j].id, test[j].date_start.substr(11,5), test[j].date_end.substr(11,5)))
                    //time "2019-07-18 10:15:00".substr(11,5)        "2019-07-18 10:15:00".slice(11,16)
                    //date "2019-07-18 10:15:00".substr(0,10)        "2019-07-18 10:15:00".slice(0, 10)
                }
              }
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
