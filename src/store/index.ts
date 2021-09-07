import Vue from 'vue';
import Vuex from 'vuex';
import AppStore from './modules/appStore/index';
import ContactStore from './modules/contactStore/index';

Vue.use(Vuex)

export default new Vuex.Store({
  state: { },
  mutations: { },
  actions: { },
  getters: { },
  modules: {
    AppStore,
    ContactStore
  }
})
