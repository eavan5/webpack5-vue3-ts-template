import {createApp} from 'vue'

import App from './App.vue'
import router from './router'
import store from './store'
console.log(
  [1, 2, 3].map(n => n ** 2)
);

()=>{console.log(123)}

createApp(App).use(router).use(store).mount('#app')