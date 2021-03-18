import { createStore } from 'vuex';
import api from '@/api';
import axios from 'axios';

//maybe u think that inreface name have to start with I but tslint dont think so
interface AppStore {
  token: string;
  login: string;
}

export default createStore({
  state:{
    token: '',
    login: '',
  },
  mutations: {
    SET_TOKEN(state: AppStore, p: string) {
      state.token = p;
    },
    SET_LOGIN(state: AppStore, p: string) {
      state.login = p;
    },
  },
  actions: {
    async DoLogin({commit}, cred) {
      try {
        const { data } = await axios.post(api.host + api.urls.login, cred);
        if(data.token && data.login) {
          commit('SET_TOKEN', data.token);
          commit('SET_LOGIN', data.login);
          axios.defaults.headers.common['Authorization'] = `Bearer ${data.token}`;
          localStorage.setItem('user', JSON.stringify(data));
        } else {
          throw new Error('Server haven\'t returned token and login');
        }
      } catch(e) {
        if(e.status === 500) {
          e.message = 'Unexpected server error, try to connect later'
        } else {
          e.message = 'Credintials mismatch'
        }
        throw new Error(e);
      }
    }
  },
  modules: {
  }
})
