import { createApp } from 'vue'
import { createPinia } from 'pinia'
import './style.css'
import App from './App.vue'
import { router } from './router'
import 'leaflet/dist/leaflet.css'
import L from 'leaflet'

delete L.Icon.Default.prototype._getIconUrl
L.Icon.Default.mergeOptions({
    iconRetinaUrl: import.meta.url + '/../node_modules/leaflet/dist/images/marker-icon-2x.png',
    iconUrl: import.meta.url + '/../node_modules/leaflet/dist/images/marker-icon.png',
    shadowUrl: import.meta.url + '/../node_modules/leaflet/dist/images/marker-shadow.png',
})

const pinia = createPinia()
const app = createApp(App)

app.use(router)
app.use(pinia)
app.mount('#app')
