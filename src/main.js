import { createApp } from 'vue'
import './style.css'
import vuetify from './plugins/vuetify'
import router from './router'
import ToastPlugin from 'vue-toast-notification'
import 'vue-toast-notification/dist/theme-bootstrap.css'

import App from './App.vue'

const app = createApp(App)

app.use(vuetify)
app.use(router)
app.use(ToastPlugin)

app.mount('#app')
