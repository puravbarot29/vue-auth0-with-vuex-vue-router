import { createStore } from 'vuex'
import * as auth0 from 'auth0-js' //import auth0 dependecy
import router from '../router/index.js'

export default createStore({
  state: {
    userIsAuthorized: false,

    //auth0 variable and we telling auth0 which tenants to access
    auth0: new auth0.WebAuth({
        domain: process.env.VUE_APP_AUTH0_CONFIG_DOMAIN,
        clientID: process.env.VUE_APP_AUTH0_CONFIG_CLIENTID,
        redirectUri: process.env.VUE_APP_DOMAINURL + '/auth0callback',//to redirect user back to localhost once user is authenticated
        responseType: process.env.VUE_APP_AUTH0_CONFIG_RESPONSETYPE,
        scope: process.env.VUE_APP_AUTH0_CONFIG_SCOPE,
      }),
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

    auth0Login(context){
      //this is being called from Login.vue
      console.log("auth0 login");
      context.state.auth0.authorize(); //calling auth0
    },
    //this is the dispatch call from router
    auth0HandleAuthentication (context) {
      //authResult variable is populated if auth was successful
      context.state.auth0.parseHash((err, authResult) => {
        if (authResult && authResult.accessToken && authResult.idToken) {
          let expiresAt = JSON.stringify( //expiration varibale to end the session after some time
            authResult.expiresIn * 1000 + new Date().getTime()
          )
          // save the tokens locally so we can send them to the resource server later on
          localStorage.setItem('access_token', authResult.accessToken);
          localStorage.setItem('id_token', authResult.idToken);
          localStorage.setItem('expires_at', expiresAt);

          router.replace('/members'); //send users to their destination
        }
        else if (err) {
          alert('login failed. Error #KJN838');
          router.replace('/login');
          console.log(err);
        }
      })
    },
  //  auth0Logout () {
      // No need to update the bearer in global axiosConfig to null because we are redirecting out of the application
      // Clear Access Token and ID Token from local storage
  //    localStorage.removeItem('access_token');
  //    localStorage.removeItem('id_token');
    //  localStorage.removeItem('expires_at');

      // redirect to auth0 logout to completely log the user out
  //    window.location.href = process.env.VUE_APP_AUTH0_CONFIG_DOMAINURL + "/v2/logout?returnTo=" + process.env.VUE_APP_DOMAINURL + "/login&client_id=" + process.env.VUE_APP_AUTH0_CONFIG_CLIENTID;
//    }

  },
  modules: {
  }
})
