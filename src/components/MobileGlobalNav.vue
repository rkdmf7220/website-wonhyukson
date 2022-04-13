<template>
  <div id="mobile-nav" :class="{active: !this.isActive}" >
    <router-link to="/" class="logo">Wonhyuk Son</router-link>
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
    },
  },
  data() {
    return{
      Constants,
      isActive: Boolean
    }
  },
  methods: {
    onClickLang(lang) {
      this.$store.dispatch('setLang', lang)
      this.currentLang = lang
    },
    onClickMenu() {
      this.isActive = !this.isActive
    },
    closeMobileMenu(close) {
      console.log('close 테스트',close)
      this.isActive = !close;
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
    z-index: 100;
/*    background-color: rgba(255, 255, 255, 0.5);
    backdrop-filter: blur(4px);*/

    &.active{
      background-color: transparent;
      backdrop-filter: none;
    }

    .logo{
      font-size: 1.25rem;
      font-weight: 700;
      transition: color 0.3s;
    }

    .lang-container{
      margin-left: auto;
      margin-right: 2%;

      button{
        border: none;
        background: transparent;
        font-size: 1rem;
        line-height: 1rem;
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