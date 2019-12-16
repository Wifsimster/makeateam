<template>
  <div>
    <div>
      <form>
        <div>
          <input v-model="playersList.name" />
        </div>
      </form>
    </div>

    <template v-for="player in playersList.list">
      <form>
        <input type="text" v-model="player.name" placeholder="Player" />
        <a class="delete" @click="remove(player)">
          <i class="material-icons">delete</i>
        </a>
      </form>
    </template>

    <div>
      <button @click="add()">
        New player
      </button>
      <button @click="reset()">New list</button>
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

      <div>
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
