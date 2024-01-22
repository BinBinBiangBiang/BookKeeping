import { createApp } from 'vue'
import 'vant/lib/index.css';
import '@/assets/style/css/reset.css';
import '@/config/rem.ts'
import Router from './router';
import { createPinia } from 'pinia';
import { Form, Button, List, PickerGroup, Popup, DatePicker, Icon, NumberKeyboard, Field, CellGroup, Toast,Image as VanImage,Swipe, SwipeItem  } from 'vant';
import App from './App.vue'

const app = createApp(App)
const pinia = createPinia()

app.use(Form)
app.use(Button)
app.use(List)
app.use(PickerGroup)
app.use(Popup)
app.use(DatePicker)
app.use(Icon)
app.use(NumberKeyboard)
app.use(Field)
app.use(CellGroup)
app.use(Toast)
app.use(VanImage)
app.use(Swipe)
app.use(SwipeItem)

app.use(pinia)
app.use(Router)

app.mount('#app')
