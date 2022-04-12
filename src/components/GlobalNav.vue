<template>
  <div id="nav">
    <router-link to="/" class="logo">Wonhyuk Son</router-link>
    <ul>
      <li v-for="item in menu" :key="item.name" :class="item?.meta?.cssClass">
        <router-link :to="item.path">{{item.name}}</router-link>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "GlobalNav",

  mounted() {
    // http://api.wonhyukson.com/sculpture/cycle
    // console.log(this.$router.getRoutes().forEach(item => console.log(item, item.meta.isWorks)))
    // this.menu = this.$router.getRoutes().filter(item => item.name !== 'Home')
    this.menu = this.$router.options.gnb;
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
@import "src/assets/scss/global-nav";
</style>