<template>
  <div id="main">
    <div class="content">
      <p v-show="error">Erreur: {{ error }}</p>
      <div>
        <h2>Teams</h2>
        <ul v-for="team in teams">
          <li>
            {{ team.name }}
            <ul v-for="player in team.players">
              <li>{{ player.name }}</li>
            </ul>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      error: null,
      teams: []
    }
  },
  events: {
    teamsUpdate(teams) {
      this.teams = teams
    }
  }
}
</script>

<style lang="scss" scoped>
#main {
  .content {
    padding: 20px 40px;
  }
}

@media (min-width: 40em) {
  #main {
    position: fixed;
    top: 33%;
    right: 0;
    bottom: 0;
    left: 150px;
    overflow: auto;
    width: auto;
  }
}

@media (min-width: 60em) {
  #main {
    position: static;
    margin: 0;
    padding: 0;
  }
}
</style>
