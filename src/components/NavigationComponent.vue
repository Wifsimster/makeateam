<template keep-alive>
  <div id="nav">
    <a href="#" class="nav-menu-button">Menu</a>
    <div class="nav-inner">
      <div class="pure-menu">
        <h1 class="pure-menu-heading">Lists</h1>
        <ul class="pure-menu-list" v-for="list in playersList">
          <li class="pure-menu-item">
            <a class="pure-menu-link">
              <span v-on:click="loadPlayers(list)">
                <span
                  class="label"
                  v-bind:style="{ 'background-color': list.color }"
                ></span>
                {{ list.name }} ({{ list.list.length }})
              </span>
              <i class="material-icons delete" v-on:click="remove(list)"
                >delete</i
              >
            </a>
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
      playersList: {}
    }
  },
  ready() {
    this.getPlayers()
  },
  methods: {
    getPlayers() {
      var localPlayers = JSON.parse(localStorage.getItem("playersList")) || []
      this.$set("playersList", localPlayers)
    },
    loadPlayers(list) {
      this.$dispatch("loadPlayers", list)
    },
    remove(list) {
      var array = this.playersList.filter(function(obj) {
        return obj.id !== list.id
      })
      localStorage.setItem("playersList", JSON.stringify(array))
      this.$dispatch("newPlayersList")
    }
  },
  events: {
    renderPlayersList() {
      this.getPlayers()
    }
  }
}
</script>

<style lang="sass" scoped>
#nav {
  width: 100%;
  height: 40px;
  position: relative;
  background: rgb(37, 42, 58);
  text-align: center;
  pre {
    background-color: white;
    }
  .nav-menu-button {
    display: block;
    top: 0.5em;
    right: 0.5em;
    position: absolute;
    }
  &.active {
    height: 80%;
    }
  .nav-inner {
    display: none;
    }
  &.active .nav-inner {
    display: block;
    padding: 2em 0;
    }
  .pure-menu {
    background: transparent;
    border: none;
    text-align: left;
    }
  .pure-menu-link:hover, .pure-menu-link:focus {
    background: rgb(55, 60, 90);
    }
  .pure-menu-link {
    color: #fff;
    margin-left: 3px;
    cursor: pointer;
    .label {
      width: 15px;
      height: 15px;
      display: inline-block;
      margin-right: 5px;
      border-radius: 3px;
      }
    .delete {
      display: none;
      position: absolute;
      top: 8px;
      right: 3px;
      font-size: 18px;
      }
    &:hover .delete {
      display: inline-block;
      }
    }
  .pure-menu-heading {
    border-bottom: none;
    font-size:110%;
    color: rgb(75, 113, 151);
    }
  }

@media (min-width: 40em) {
  #nav {
    position: fixed;
    top: 0;
    bottom: 0;
    overflow: auto;
    margin-left: -500px;
    width: 150px;
    height: 100%;
    .nav-inner {
      display: block;
      padding: 2em 0;
      }
    }

  #nav .nav-menu-button {
    display: none;
    }
  }
</style>
