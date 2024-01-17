import { createApp } from 'vue'
import 'vant/lib/index.css';
import '@/assets/style/css/reset.css';
import '@/config/rem.js'
import Router from './router';
import { createPinia } from 'pinia';
import { Button, List, PickerGroup, Popup,DatePicker,Icon } from 'vant';
import App from './App.vue'

const app = createApp(App)
const pinia = createPinia()

app.use(Button)
app.use(List)
app.use(PickerGroup)
app.use(Popup)
app.use(DatePicker)
app.use(Icon)

app.use(pinia)
app.use(Router)

app.mount('#app')
