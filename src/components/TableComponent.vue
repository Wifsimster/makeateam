<template>
<table>
  <thead>
    <tr>
      <th v-for="key in columns" 
          @click="sortBy(key)" 
          :class="{active: sortKey == key}">
        {{key | capitalize}}
        <span class="arrow"
              :class="sortOrders[key] > 0 ? 'asc' : 'dsc'">
  </span>
  </th>
  </tr>
  </thead>
  <tbody>
    <tr v-for="
               entry in data
               | filterBy filterKey
               | orderBy sortKey sortOrders[sortKey]">
      <td v-for="key in columns">
        {{entry[key]}}
  </td>
  </tr>
  </tbody>
  </table>
</template>

<script>
  export default {
    props: {
      data: Array,
      columns: Array,
      filterKey: String
    },
    data() {
      var sortOrders = {}
      this.columns.forEach(function (key) {
        sortOrders[key] = 1
      })
      return {
        sortKey: '',
        sortOrders: sortOrders
      }
    },
    methods: {
      sortBy: function (key) {
        this.sortKey = key
        this.sortOrders[key] = this.sortOrders[key] * -1
      }
    }
  }
</script>

<style lang="sass" scoped>
.arrow {
  display: inline-block;
  vertical-align: middle;
  width: 0;
  height: 0;
  margin-left: 5px;
  opacity: 0.66;
  }
.arrow.asc {
  border-left: 4px solid transparent;
  border-right: 4px solid transparent;
  border-bottom: 4px solid #fff;
  }

.arrow.dsc {
  border-left: 4px solid transparent;
  border-right: 4px solid transparent;
  border-top: 4px solid #fff;
  }
</style>