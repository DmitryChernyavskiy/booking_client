import axios from 'axios'
import Vue from 'vue'

const base = axios.create({
  baseURL: 'http://173.212.224.161/booking/server/api'// config.BASE_API_URL
})

Vue.prototype.$http = base

export default {
  get (url, user) {
    debugger
    return Vue.$http.get('url', { auth: user }, {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
      } })
  }
}
/*
export default {
    get(url, request) {
        return Vue.http.get(url, request)
            .then((response) => Promise.resolve(response.body.data))
            .catch((error) => Promise.reject(error));
    },
    post(url, request) {
        return Vue.http.post(url, request)
            .then((response) => Promise.resolve(response))
            .catch((error) => Promise.reject(error));
    },
    put(url, request) {
        return Vue.http.put(url, request)
            .then((response) => Promise.resolve(response))
            .catch((error) => Promise.reject(error));
    },
    delete(url, request) {
        return Vue.http.delete(url, request)
            .then((response) => Promise.resolve(response))
            .catch((error) => Promise.reject(error));
    }
}

import api from '../../utils/api.js'

const actions = {
    getIncrementers (context) => {
        return api.get('/incrementers')
            .then((response) => context.commit('GET_INCREMENTERS', response))
            .catch((error) => context.commit('API_FAILURE', error));
    },
    createIncrementer (context, data) => {
        return api.post(data.url, data.request)
            .then((response) => context.commit('CREATE_INCREMENTER', response))
            .catch((error) => context.commit('API_FAILURE', error));
    },
    updateIncrementer (context, data) => {
        return api.patch(data.url, data.request)
            .then((response) => context.commit('UPDATE_INCREMENTER', response))
            .catch((error) => context.commit('API_FAILURE', error));
    },
    deleteIncrementer (context, url) => {
        return api.delete(url)
            .then((response) => context.commit('DELETE_INCREMENTER', response))
            .catch((error) => context.commit('API_FAILURE', error));
    }
}; */
