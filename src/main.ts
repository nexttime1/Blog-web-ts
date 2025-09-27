import ArcoVue from '@arco-design/web-vue';
import '@/assets/base.css'
import '@/assets/theme.css'
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import '@arco-design/web-vue/dist/arco.css';
import App from './App.vue'
import router from './router'
import { useStore } from '@/stores/counter'


const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(ArcoVue)
app.mount('#app')
const store = useStore()
store.loadTheme()