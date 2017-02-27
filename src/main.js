import App from './pages/App.vue'
import router from './router'
import Vue from 'vue'
import VueResource from 'vue-resource'
import VueMoment from 'vue-moment'

Vue.use(VueResource)
Vue.use(VueMoment)

router.start(App, '#app')