import { createApp } from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify'
import { loadFonts } from './plugins/webfontloader'
import router from './router/index.js'
import store from './store/index.js'

loadFonts()

createApp(App).use(store).use(router)
  .use(vuetify)
  .mount('#app')
