<template>
  <div id="nav">
    <router-link to="/">주소</router-link>
    <ul>
      <li v-for="item in menu" :key="item.name">
        <router-link :to="item.path">{{item.name}}</router-link>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "GlobalNav",

  mounted() {
    console.log(this.$router.getRoutes())
    this.menu = this.$router.getRoutes().filter(item => item.name !== 'Home')
  },

  data() {
    return{
      menu: []
    }
  },

  methods: {

  }
}
</script>

<style scoped>

</style>