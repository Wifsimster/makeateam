import Vue from "vue"
import Router from "vue-router"

const notFound = () => import("pages/NotFound.vue")
const dashboard = () => import("pages/Dashboard.vue")
const user = () => import("pages/User.vue")
const login = () => import("pages/Login.vue")

Vue.use(Router)

let router = new Router({
  scrollBehavior: () => ({ y: 0 }),
  routes: [
    { path: "*", component: notFound },
    { path: "/", component: dashboard },
    { path: "/user", component: user },
    { path: "/login", component: login }
  ]
})

export default router
