import Vue from 'vue'
import VueRouter from 'vue-router'
import notFoundPage from './pages/notFoundPage.vue'
import dashboardPage from './pages/dashboardPage.vue'
import userPage from './pages/userPage.vue'
import loginPage from './pages/loginPage.vue'

// Set router in Vue
Vue.use(VueRouter)

// Create a router instance
var router = new VueRouter({
  hashbang: false,  // Remove '/#!/' from URL
//  history: true,    // Enable HTML5 history mode
  saveScrollPosition: true
})

// Map route to component
router.map({
  '*': {
    component: notFoundPage
  },
  '/': {
    component: dashboardPage
  },

  // User
  '/user': {
    component: userPage
  },
  '/login': {
    component: loginPage
  },
})

export default router