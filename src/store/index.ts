import Vue from 'vue'
import Vuex from 'vuex'
import ApiStore from './modules/apiStore/index';
import ContactStore from './modules/contactStore/index';

Vue.use(Vuex)

export default new Vuex.Store({
  state: { },
  mutations: { },
  actions: { },
  getters: { },
  modules: {
    ApiStore,
    ContactStore
  }
})
