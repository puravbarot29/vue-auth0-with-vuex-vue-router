import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import AboutView from '../views/AboutView.vue'
import Contact from '../views/Contact'
import Members from '../views/Members'
import Login from '../views/Login'
import store from '../store/index.js'
import Auth0callback from '../views/Auth0callback'

const routes = [
  {
    path: '/auth0callback',
    name: 'auth0callback',
    component: Auth0callback
  },
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/aboutview',
    name: 'aboutview',
    component: AboutView
  },
  {
    path: '/contact',
    name: 'contact',
    component: Contact
  },
  {
    path: '/login',
    name: 'login',
    component: Login
  },
  {
    path: '/members',
    name: 'members',
    component: Members,
    meta: { requiresAuth: true } //re-authenticate user for protected pages
  }

]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

//basically routes users and ensures that if user is allowed to go or no
router.beforeEach((to,from,next)=>{
  // Allow finishing callback url for logging in
  if(to.matched.some(record=>record.path == "/auth0callback")){
   console.log("router.beforeEach found /auth0callback url");
   store.dispatch('auth0HandleAuthentication');
   next(false);
 }

  // check if user is logged in (start assuming the user is not logged in = false)
  let routerAuthCheck = false;
  // Verify all the proper access variables are present for proper authorization
  if( localStorage.getItem('access_token') && localStorage.getItem('id_token') && localStorage.getItem('expires_at') ){
    console.log('found local storage tokens');
    // Check whether the current time is past the Access Token's expiry time
    let expiresAt = JSON.parse(localStorage.getItem('expires_at'));
    // set localAuthTokenCheck true if unexpired / false if expired
    routerAuthCheck = new Date().getTime() < expiresAt;
  }

   // set global ui understanding of authentication
   store.commit('setUserIsAuthenticated', routerAuthCheck); 

//take the "to" and sends each one of them to the record, which requires auth "meta"
 if (to.matched.some(record => record.meta.requiresAuth)){
   //check if user is authorized
   if(routerAuthCheck){
     //user is authenticated
     next();
   } else {
     //user is not authenticated
     router.replace('/login');
   }

 } else {
   //this is allow page to load, if we dont call next then route never loads
   next();
 }

});

export default router
