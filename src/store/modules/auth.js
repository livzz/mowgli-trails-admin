import {app} from '../../firebase';

const state = {
  isAuthenticated: false,
};

const mutations = {
  mutateAuthState(state, payload) {
    state.isAuthenticated = payload;
  },
};

const getters = {
  getAuthState(state) {
    return state.isAuthenticated;
  },
};

const actions = {
  actionLogin({ commit }, payload) {
    app
      .auth()
      .signInWithEmailAndPassword(payload.email, payload.password)
      .then(() => {
        commit('mutateAuthState', true);
        payload.callback();
      })
      .catch((e) => {
        payload.callback();
        console.log(e);
        alert(e.message);
      });
  },
  actionLogout({ commit }, callback) {
    app
      .auth()
      .signOut()
      .then(() => {
        commit('mutateAuthState', false);
        callback();
      })
      .catch((e) => {
        console.log(e);
        alert('Try Again');
      });
  },
  initAuthState({ commit }) {
    app.auth().onAuthStateChanged((user) => {
      if (user) {
        commit('mutateAuthState', true);
      } else {
        commit('mutateAuthState', false);
      }
    });
  },
};

export default {
  state,
  mutations,
  getters,
  actions,
};
