import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

import axios from 'axios'
import Maska from 'maska'
import '@/assets/style/global.css'

createApp(App).use(router, axios, Maska).mount('#app')
// const app = createApp(App)
// app.use(router, axios, Maska, ViaCep)
// app.mount('#app')
