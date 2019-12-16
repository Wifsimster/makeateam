<template keep-alive>
  <div id="list">
    <div>
      <form id="title">
        <div>
          <input v-model="playersList.name" />
        </div>
      </form>
    </div>

    <template v-for="player in playersList.list">
      <div>
        <div>
          <i class="material-icons account">account_box</i>
        </div>
        <div>
          <form>
            <input type="text" v-model="player.name" placeholder="Player" />
            <a class="delete" @click="remove(player)">
              <i class="material-icons">delete</i>
            </a>
          </form>
        </div>
      </div>
    </template>

    <div class="list-item add">
      <div>
        <button @click="add()">
          New player
        </button>
        <button @click="reset()">New list</button>
      </div>
    </div>

    <form id="control">
      <div>
        <label for="nb">Players by team</label>
        <select v-model="playersByTeam" id="nb">
          <option selected>2</option>
          <option>3</option>
          <option>4</option>
          <option>5</option>
          <option>6</option>
          <option>7</option>
          <option>8</option>
        </select>
      </div>

      <div class="control-buttons">
        <button @click="randomize()">
          Randomize
        </button>
      </div>
    </form>
  </div>
</template>

<script>
import img from "img/user.png"
import { getUUID } from "plugins/utils"

export default {
  data() {
    return {
      img: img,
      playersList: {
        name: "Players",
        list: []
      },
      playersByTeam: 2,
      teams: []
    }
  },
  watch: {
    playersList: {
      deep: true,
      handler: function(val, oldVal) {
        this.saveList()
      }
    }
  },
  methods: {
    add() {
      this.playersList.list.push({ id: uuid(), name: "" })
    },
    remove(player) {
      var array = this.playersList.list.filter(function(obj) {
        return obj.id !== player.id
      })
      this.$set("playersList", array)
    },
    reset() {
      this.$set("playersList", { name: "Players", list: [] })
    },
    saveList() {
      var localPlayers = JSON.parse(localStorage.getItem("playersList")) || []
      if (localPlayers.length > 0) {
        var list = this.playersList
        var localList = localPlayers.filter(function(obj) {
          return obj.id === list.id
        })[0]
        // Try to find the list in local storage
        if (localList) {
          localList = this.playersList
          var index = -1

          for (var i = 0; i < localPlayers.length; i++) {
            if (localPlayers[i].id === localList.id) {
              index = i
              break
            }
          }

          if (index !== -1) {
            localPlayers[index] = localList
            localStorage.setItem("playersList", JSON.stringify(localPlayers))
            this.$dispatch("updatePlayersList")
          }
        }
        // List doesn't exist, create it in local storage
        else {
          this.createList()
        }
      }
      // New list, create it in local storage
      else {
        this.createList()
      }
    },
    createList() {
      var localPlayers = JSON.parse(localStorage.getItem("playersList")) || []
      this.playersList.id = this.uuid()
      this.playersList.color = this.randomColor()
      localPlayers.push(this.playersList)
      localStorage.setItem("playersList", JSON.stringify(localPlayers))
      this.$dispatch("newPlayersList")
    },
    randomize() {
      this.$set("teams", [])
      var players = this.shuffle(this.playersList.list)
      var nbTeams = Math.ceil(players.length / this.playersByTeam)
      var teams = []
      for (var i = 1; i <= nbTeams; i++) {
        teams.push({
          name: "Team " + i,
          players: players.slice(
            this.playersByTeam * (i - 1),
            this.playersByTeam * i
          )
        })
      }
      this.$dispatch("randomize", teams)
      this.$set("teams", teams)
    },
    // https://bost.ocks.org/mike/shuffle/
    shuffle(array) {
      var m = array.length,
        t,
        i
      while (m) {
        i = Math.floor(Math.random() * m--)
        t = array[m]
        array[m] = array[i]
        array[i] = t
      }
      return array
    },
    randomColor() {
      return "#" + Math.floor(Math.random() * 16777215).toString(16)
    }
  },
  events: {
    playersUpdate(playersList) {
      this.$set("playersList", playersList)
    }
  }
}
</script>

<style lang="sass" scoped>
#list {
  position: fixed;
  top: 0;
  bottom: 0;
  overflow: auto;
  margin-left: -350px;
  width: 100%;
  height: 33%;
  border-bottom: 1px solid #ddd;
  #title {
    margin-top: 16px;
    text-align: center;
    }
  .list-item {
    padding: 0.9em 1em;
    border-bottom: 1px solid #ddd;
    border-left: 6px solid transparent;
    .pure-form {
      padding-top: 14px;
      input[type='text'] {
        width: calc(100% - 45px);
        }
      }
    .delete {
      font-size: 80%;
      margin: 1px 0 0 4px;
      padding: 4px 6px;
      }
    .account {
      border-radius: 3px;
      margin-right: 5px;
      font-size: 42px;
      padding-top: 10px;
      }
    h1 {
      margin: 20px 0 0 0;
      font-size: 20px;
      }
    }
  }
.add {
  display: block;
  text-align: center;
  i.material-icons {
    float: left;
    margin-top: -4px;
    }
  }
#control {
  padding-top: 12px;
  .control-buttons {
    text-align: center;
    }
  }

@media (min-width: 60em) {
  #list {
    margin-left: -350px;
    width:350px;
    height: 100%;
    border-right: 1px solid #ddd;
    }
  }
</style>
