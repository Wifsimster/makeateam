import Vue from "vue"
import Router from "vue-router"

const notFoundPage = () => import("pages/notFoundPage.vue")
const dashboardPage = () => import("pages/dashboardPage.vue")
const userPage = () => import("pages/userPage.vue")
const loginPage = () => import("pages/loginPage.vue")

Vue.use(Router)

let router = new Router({
  scrollBehavior: () => ({ y: 0 }),
  routes: [
    { path: "*", component: notFoundPage },
    { path: "/", component: dashboardPage },
    { path: "/user", component: userPage },
    { path: "/login", component: loginPage }
  ]
})

export default router
