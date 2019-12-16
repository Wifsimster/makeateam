<template>
  <div>
    <h1>Connexion</h1>
    <input type="text" placeholder="Email" v-model="credentials.mail" />
    <input
      type="password"
      placeholder="Mot de passe"
      v-model="credentials.password"
    />
    <button @click="submit()">Se connecter</button>
  </div>
</template>

<script>
import auth from "api/auth"

export default {
  data() {
    return {
      credentials: {
        mail: "",
        password: ""
      },
      error: ""
    }
  },
  methods: {
    submit() {
      let credentials = {
        mail: this.credentials.mail,
        password: this.credentials.password
      }

      auth.login(this, credentials, "/")
    }
  }
}
</script>
