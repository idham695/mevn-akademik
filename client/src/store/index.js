import Vue from "vue";
import Vuex from "vuex";
import dialog from "./dialog";
import auth from "./auth";
import alert from "./alert";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    sideBar: false,
    prevUrl: "",
  },
  mutations: {
    setSideBar: (state, value) => {
      state.sideBar = value;
    },
    setPrevUrl: (state, value) => {
      state.PrevUrl = value;
    },
  },
  actions: {
    setSideBar: ({ commit }, value) => {
      commit("setSideBar", value);
    },
    setPrevUrl: ({ commit }, value) => {
      commit("setPrevUrl", value);
    },
  },
  getters: {
    sideBar: (state) => state.sideBar,
    prevUrl: (state) => state.prevUrl,
  },
  modules: {
    alert,
    auth,
    dialog,
  },
});
