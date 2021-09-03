import Vue from 'vue'
import Vuex from 'vuex'
import ApiModule from './modules/apiModule/index';
import ContactModule from './modules/contactModule/index';

Vue.use(Vuex)

export default new Vuex.Store({
  state: { },
  mutations: { },
  actions: { },
  getters: { },
  modules: {
    ApiModule,
    ContactModule
  }
})
