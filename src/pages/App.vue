<template>
<div class="app">  
  <div class="content pure-g" id="layout">
    <com-navigation></com-navigation>
    <com-list></com-list>
    <com-header></com-header>
    <router-view></router-view>
  </div>
</template>

<script>
  import ComHeader from './../components/HeaderComponent.vue'
  import ComNavigation from './../components/NavigationComponent.vue'  
  import ComList from './../components/ListComponent.vue'  
  import normalize from 'normalize.css'
  import purecss from 'purecss'
  import gridcss from '../../node_modules/purecss/build/grids-responsive.css'
  import material from '../../node_modules/material-design-icons/iconfont/material-icons.css'
  export default {
    components: { ComHeader, ComNavigation, ComList},
    events: {
      'randomize': function(teams) {
        this.$broadcast('teamsUpdate', teams);
      },
      'loadPlayers': function(players) {
        this.$broadcast('playersUpdate', players);
      },
      'newPlayersList': function() {
        this.$broadcast('renderPlayersList');
      },
      'updatePlayersList': function() {
        this.$broadcast('renderPlayersList');
      }
    }
  }
</script>

<style lang="sass" scoped>
.content {
  margin: 0 auto;
  padding: 0 20px;
  max-width: 1024px;
  }

@media (min-width: 40em) {
  #layout {
    padding-left: 500px;
    position: relative;
    }
  }
</style>