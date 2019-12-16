<template>
  <div class="app">
    <com-header></com-header>
    <com-list></com-list>
    <router-view></router-view>
    <com-footer></com-footer>
  </div>
</template>

<script>
import ComHeader from "components/Header.vue"
import ComFooter from "components/Footer.vue"
import ComList from "components/List.vue"

import "beta-scss/packages/global.scss"

export default {
  components: { ComHeader, ComList, ComFooter },
  events: {
    randomize: function(teams) {
      this.$broadcast("teamsUpdate", teams)
    },
    loadPlayers: function(players) {
      this.$broadcast("playersUpdate", players)
    },
    newPlayersList: function() {
      this.$broadcast("renderPlayersList")
    },
    updatePlayersList: function() {
      this.$broadcast("renderPlayersList")
    }
  }
}
</script>
