import Vue from 'vue'
import Vuex from 'vuex'
import { 
  UPDATE_API_URL,
  UPDATE_API_KEY
} from './mutation-types';

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    apiUrl: '',
    apiKey: '',
  },
  mutations: {
    [UPDATE_API_URL](state, url) {
      state.apiUrl = url;
    },
    [UPDATE_API_KEY](state, key) {
      state.apiKey = key;
    },
  },
  actions: {
    updateApiUrl({ commit }, url) {
      commit(UPDATE_API_URL, url);
    },
    updateApiKey({ commit }, key) {
      commit(UPDATE_API_KEY, key);
    },
  },
  getters: {
    getApiUrl: (state) => {
      return state.apiUrl;
    },
    getApiKey: (state) => {
      return state.apiKey;
    },
  },
  modules: {
  }
})
