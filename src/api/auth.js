import router from "router"

export default {
  user: { authenticated: false },

  login(context, creds, redirect) {
    localStorage.setItem("id_token", this.getUID())
    this.user.authenticated = true
    if (redirect) {
      router.go(redirect)
    }
  },

  logout() {
    localStorage.removeItem("id_token")
    this.user.authenticated = false
  },

  checkAuth() {
    if (localStorage.getItem("id_token")) {
      return true
    }
    return false
  },

  getUID() {
    return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function(c) {
      var r = (Math.random() * 16) | 0,
        v = c == "x" ? r : (r & 0x3) | 0x8
      return v.toString(16)
    })
  }
}

// From : https://github.com/auth0-blog/vue-jwt-authentication
