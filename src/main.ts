import { createApp } from 'vue'
import { createPinia } from 'pinia';

import App from './App.vue'
import router from './router'

import 'bootstrap/dist/css/bootstrap.css'
// import bootstrap from 'bootstrap/dist/js/bootstrap.js'
import 'bootstrap-icons/font/bootstrap-icons.min.css'

import '@openattitude/other-gps-generic/style.css'

import { installPanelMath } from '@openattitude/core'

installPanelMath();


const app = createApp(App);
const pinia = createPinia();

app.use(pinia)
app.use(router)
app.mount('#app')
