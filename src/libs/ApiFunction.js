import Vue from 'vue'

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
};
