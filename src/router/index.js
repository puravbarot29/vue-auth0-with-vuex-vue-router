import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import AboutView from '../views/AboutView.vue'
import Contact from '../views/Contact'
import Members from '../views/Members'

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
    path: '/members',
    name: 'members',
    component: Members
  }

]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})


export default router
