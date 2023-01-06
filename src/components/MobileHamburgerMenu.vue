<template>
  <div class="m-menu-wrap" :class="{active: this.isActive}">
    <ul>
      <li v-for="item in menu" :key="item.name" :class="item?.meta?.cssClass">
        <router-link :to="item.path" @click="closeMobileMenu">{{item.name}}</router-link>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "MobileHamburgerMenu",
  props: {
    isActive : Boolean
  },
  mounted() {
    this.menu = this.$router.options.gnb;
  },
  data() {
    return {
      menu: null
    }
  },
  methods: {
    closeMobileMenu() {
      this.$emit('removeClass', !this.isActive)
    }
  }
}
</script>

<style scoped lang="scss">
  .m-menu-wrap{
    display: none;
    width: 100%;
    height: 100%;
    position: fixed;
    z-index: 50;
    background: rgba(0,0,0,0.7);
    backdrop-filter: blur(8px);
    opacity: 0;
    transition: all 0.3s;
    visibility: hidden;

    &.active{
      opacity: 1;
      visibility: visible;
    }

    ul{
      margin: 80px auto 0 auto;
      font-size: 1.15em;
      line-height: 1.3em;
      width: 80%;

      li{
        text-align: center;
        padding: 8px 0;

        &.margin-to-works{
          margin-top: 41px;
          position: relative;

          &::before{
            content: '';
            position: absolute;
            width: 60%;
            height: 1px;
            top: -20px;
            left: 20%;
            background-color: white;
          }
        }

        a{
          color: white;
          padding: 8px 16px;
        }
      }
    }
  }
  @media screen and (max-width: 767px) {
    .m-menu-wrap{
      display: block;
    }
  }
</style>