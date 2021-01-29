import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import '@/assets/iconfont/iconfont.css'
import '@/assets/iconfont2/iconfont.css'
import '@/assets/iconfont3/iconfont.css'
import '@/assets/iconfont4/iconfont.css'
import '@/assets/iconfont5/iconfont.css'

import installElementPlus from '@/plugins/element'

const app = createApp(App)

installElementPlus(app)
app.use(store).use(router).mount('#app')
