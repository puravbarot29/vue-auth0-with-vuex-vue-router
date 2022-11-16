import { createStore } from 'vuex'

export default createStore({
  state: {
    userIsAuthorized: false,
  },
  getters: {
  },
  mutations: {
    //changing user state programatically
    setUserIsAuthenticated(state, replacement){
      state.userIsAuthorized = replacement;
    }
  },
  actions: {

    auth0Login(){
      //this is being called from Login.vue
      console.log("auth0 login");
      //context.state.auth0.authorize();
    },

  },
  modules: {
  }
})
