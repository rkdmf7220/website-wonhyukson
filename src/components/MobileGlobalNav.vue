<template>
  <div id="mobile-nav" :class="{active: !this.isActive}" v-if="this.$route.name !== 'Intro'">
    <router-link to="/sculpture" class="logo">Wonhyuk Son</router-link>
    <div class="lang-container">
      <button :class='{active : currentLang === Constants.lang.kr}' @click="onClickLang(Constants.lang.kr)"><span>KR</span></button>
      <button :class='{active : currentLang === Constants.lang.en}' @click="onClickLang(Constants.lang.en)"><span>EN</span></button>
    </div>
    <button class="btn-hamburger" @click="onClickMenu">
      <span></span>
    </button>
  </div>
  <MobileHamburgerMenu :is-active="!this.isActive" @removeClass="closeMobileMenu"/>
</template>

<script>
import Constants from "../contants/constants";
import MobileHamburgerMenu from "./MobileHamburgerMenu";
export default {
  name: "MobileGlobalNav",
  components: {MobileHamburgerMenu},
  computed: {
    currentLang() {
      return this.$store.state.lang;
    }
  },
  mounted() {
    window.addEventListener('scroll', this.onScrollToggleClass);
  },
  data() {
    return{
      Constants,
      isActive: Boolean,
      currentScrollTop: Number,
      pastScrollTop: Number
    }
  },
  methods: {
    onClickLang(lang) {
      this.$store.dispatch('setLang', lang)
      // this.currentLang = lang
      this.$store.state.lang = lang
    },
    onClickMenu() {
      this.isActive = !this.isActive
    },
    closeMobileMenu(close) {
      this.isActive = !close;
    },
    onScrollHideNav(direction) {
      let nav = document.querySelector("#mobile-nav");
        if (direction === "up") {
          nav.className = "";
        } else if (direction === "down") {
          nav.className = "scroll"
        }
    },
    onScrollToggleClass() {
      this.currentScrollTop = window.pageYOffset || 0;
      if (this.currentScrollTop > this.pastScrollTop) {
        this.onScrollHideNav("down");
      } else if (this.currentScrollTop < this.pastScrollTop) {
        this.onScrollHideNav("up")
      }
      this.pastScrollTop = this.currentScrollTop;
    }
  }
}
</script>

<style scoped lang="scss">
  #mobile-nav{
    position: fixed;
    padding: 20px 16px;
    display: flex;
    width: 100%;
    box-sizing: border-box;
    z-index: 99;
    transition: top 0.3s;
    top: 0;

    &.scroll{
      top: -60px;
    }

    &.active{
      background-color: transparent;
      backdrop-filter: none;
    }

    .logo{
      font-size: 1.25em;
      font-weight: 700;
      transition: color 0.3s;
    }

    .lang-container{
      margin-left: auto;
      margin-right: 2%;

      button{
        border: none;
        background: transparent;
        font-size: 1em;
        line-height: 1em;
        cursor: pointer;
        transition: all 0.3s;
        color: #bbb;

        &:first-child{
          border-right: 2px solid black
        }
        &.active{
          color: #000;
        }
      }
    }

    .btn-hamburger{
      width: 22px;
      height: 18px;
      position: relative;
      vertical-align: middle;
      border: 0;
      background-color: transparent;
      cursor: pointer;
      outline: none;
      font-size: 14px;
      line-height: 1.27;
      padding: 0;

      span, span::before, span::after{
        position: absolute;
        content: '';
        width: 22px;
        height: 2px;
        background: black;
        border-radius: 20px;
        transition: 500ms cubic-bezier(0.77, 0, 0.175, 1), 300ms color;
        left: 0;
      }
      span::before{
        top: -6px;
      }
      span::after{
        top: 6px;
      }
    }

    // hamburger menu transition
    &.active{
      .logo, .lang-container > button.active{
        color: white
      }
      .lang-container > button{
        color: #888
      }
      .lang-container > button:first-child{
        border-right-color: white;
      }

      .btn-hamburger{
          span{
            background-color: transparent;
          }
          span::before, span::after{
            top: 0;
            background-color: white;
          }
          span::before{
            transform: rotate(-225deg);
           }
          span::after{
            transform: rotate(225deg);
          }
      }
    }

  }
  @media screen and (min-width: 768px){
    #mobile-nav{
      display: none;
    }
  }
</style>