<template>
  <div id="nav">
    <router-link to="/" class="logo">Wonhyuk Son</router-link>
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

<style scoped lang="scss">
  #nav{
    width: 240px;
    height: 100vh;
    position: fixed;
    top: 0;
    left: 0;
    padding: 100px 0 0 32px;
    box-sizing: border-box;

    & .logo{
      font-weight: 700;
      font-size: 1.25rem;
      padding: 16px;
      display: inline-block;
    }

    & ul{
      font-size: 1rem;
      margin-top: 16px;

      & a{
        padding-left: 16px;
        line-height: 2rem;
        display: block;
      }
    }
  }
</style>