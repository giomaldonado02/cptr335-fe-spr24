import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import { currencyFilter } from './currencyFilter'

const app = createApp(App)

app.config.globalProperties.$filters = {
    currency: currencyFilter
  };
  
app.use(createPinia())
app.use(router)

app.mount('#app')
