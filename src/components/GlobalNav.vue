<template>
  <div id="nav" v-if="this.$route.name !== 'Intro'">
    <router-link to="/sculpture" class="logo">Wonhyuk Son</router-link>
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
  #nav{
    width: 240px;
    height: 100vh;
    position: fixed;
    top: 0;
    left: 0;
    padding: 100px 0 0 32px;
    box-sizing: border-box;
    background-color: white;

    .logo{
      font-weight: 700;
      font-size: 1.25em;
      line-height: 1.4em;
      padding: 16px;
      display: inline-block;
    }

    ul{
      font-size: 1em;
      margin-top: 16px;

      a{
        padding-left: 16px;
        padding-bottom: 12px;
        line-height: 1.25em;
        display: block;
      }

      .margin-to-works{
        margin-top: 48px;
      }
    }
  }

  @media screen and (max-width: 767px){
    #nav{
      display: none;
    }
  }
</style>