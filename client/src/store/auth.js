export default {
  namespaced: true,
  state: {
    mahasiswa: [],
    admin: {},
    dosen: {},
  },
  mutations: {
    setMahasiswa: (state, payload) => {
      state.mahasiswa = payload;
    },
    setAdmin: (state, payload) => {
      state.admin = payload;
    },
    setDosen: (state, payload) => {
      state.dosen = payload;
    },
  },
  actions: {
    setMahasiswa: ({ commit }, payload) => {
      commit("setMahasiswa", payload);
    },
    setAdmin: ({ commit }, payload) => {
      commit("setAdmin", payload);
    },
    setDosen: ({ commit }, payload) => {
      commit("setDosen", payload);
    },
  },
  getters: {
    mahasiswa: (state) => state.mahasiswa,
    admin: (state) => state.admin,
    dosen: (state) => state.dosen,
  },
};
