import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import AboutView from '../views/AboutView.vue'
import Contact from '../views/Contact'
import Members from '../views/Members'
import Login from '../views/Login'
import store from '../store/index.js'

const routes = [
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
let routerAuthCheck = false;

if(routerAuthCheck){
  //then commit to the store that user is authenticated
  store.commit('setUserIsAuthenticated', true);

}

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
