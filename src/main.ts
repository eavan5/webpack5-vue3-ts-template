import { createApp } from "vue";

import App from "./App.vue";
import router from "./router";
import store from "./store";
console.log([1, 2, 3].map((n) => n ** 2));

const d = 3;
console.log(d);

function abc() {
  console.log(34);
}
console.log(abc);

console.log(123);

createApp(App).use(router).use(store).mount("#app");
