import { createApp } from 'vue'
import { createPinia } from 'pinia'
import CustomerTable from './components/CustomerTable.vue'

const app = createApp(CustomerTable)
app.use(createPinia())
app.mount('#app')
