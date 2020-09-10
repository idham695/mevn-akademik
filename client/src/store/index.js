import Vue from "vue";
import Vuex from "vuex";
import dialog from "./dialog";
import auth from "./auth";
import alert from "./alert";
import createPersistedState from "vuex-persistedstate";
Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    sideBar: false,
  },
  mutations: {
    setSideBar: (state, value) => {
      state.sideBar = value;
    },
  },
  actions: {
    setSideBar: ({ commit }, value) => {
      commit("setSideBar", value);
    },
  },
  getters: {
    sideBar: (state) => state.sideBar,
  },
  modules: {
    alert,
    auth,
    dialog,
  },
  plugins: [createPersistedState()],
});
