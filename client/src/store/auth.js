export default {
  namespaced: true,
  state: {
    mahasiswa: [],
  },
  mutations: {
    set: (state, payload) => {
      state.user = payload;
    },
  },
  actions: {
    set: ({ commit }, payload) => {
      commit("set", payload);
    },
  },
  getters: {
    mahasiswa: (state) => state.mahasiswa,
  },
};
