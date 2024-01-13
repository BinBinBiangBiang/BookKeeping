import { createApp } from 'vue'
import 'vant/lib/index.css';
import '@/assets/style/css/reset.css';
import '@/config/rem.js'
import Router from './router';
import { Button, List, PickerGroup, Popup,DatePicker } from 'vant';
import App from './App.vue'

const app = createApp(App)


app.use(Button)
app.use(List)
app.use(PickerGroup)
app.use(Popup)
app.use(DatePicker)
app.use(Router)
app.mount('#app')
