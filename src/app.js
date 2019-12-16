import "@babel/polyfill"
import Vue from "vue"
import App from "./pages/App.vue"
import router from "./router"

const vue = new Vue({
  el: "#app",
  router,
  render: h => h(App)
})
