import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import axios from 'axios'

axios.defaults.baseURL = process.env.VUE_APP_DEFAULT_URL

axios.defaults.headers.common['token'] = `${localStorage.getItem('token')}` // eslint-disable-line

createApp(App).use(router).mount('#app')
