<template>
  <div id="mobile-nav" :class="[{active: this.showMobileNav}, {'open-search': this.showMobileSearchBar}]" v-if="this.$route.name !== 'Intro'">
    <router-link @click="closeMobileMenu(false)" to="/main" class="logo">Wonhyuk Son</router-link>
    <div class="search-bar-wrap">
      <button @click="onClickMobileSearchActiveBtn" class="search-active-btn">
        <span :style="{maskImage: 'url(' + svgIcon.get(!showMobileSearchBar ? 'searchIcon' : 'searchCloseIcon') + ')'}"
              class="search-icon"></span>
      </button>
    </div>
    <button class="btn-hamburger" @click="onClickMenu">
      <span></span>
    </button>
  </div>
  <MobileSearchBarWrap :show-mobile-search-bar="this.showMobileSearchBar" @closeSearchBar="closeMobileSearchBar" ref="mobileSearchBarWarp" />
  <MobileHamburgerMenu :is-active="this.showMobileNav" @removeClass="closeMobileMenu"/>
</template>

<script>
import Constants from "../contants/constants";
import MobileHamburgerMenu from "./MobileHamburgerMenu.vue";
import svgIcon from "../../public/img/svgIcon.js";
import MobileSearchBarWrap from "./search/MobileSearchBarWrap.vue";
import LangContainer from "./LangContainer.vue";

export default {
  name: "MobileGlobalNav",
  components: {LangContainer, MobileSearchBarWrap, MobileHamburgerMenu},
  computed: {
    svgIcon() {
      return svgIcon
    },
  },
  mounted() {
    window.addEventListener('scroll', this.onScrollToggleClass);
  },
  data() {
    return {
      Constants,
      showMobileNav: false,
      currentScrollTop: Number,
      pastScrollTop: Number,
      showMobileSearchBar: false,
    }
  },
  methods: {
    onClickMenu() {
      this.showMobileNav = !this.showMobileNav
      this.showMobileSearchBar = false;
      this.handleBodyOverflow();
    },
    closeMobileMenu() {
      this.showMobileNav = false;
      this.handleBodyOverflow();
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
      this.currentScrollTop = window.scrollY || 0;
      if (this.currentScrollTop > this.pastScrollTop) {
        this.onScrollHideNav("down");
      } else if (this.currentScrollTop < this.pastScrollTop) {
        this.onScrollHideNav("up")
      }
      this.pastScrollTop = this.currentScrollTop;
    },
    onClickMobileSearchActiveBtn() {
      this.showMobileSearchBar = !this.showMobileSearchBar;
      this.showMobileNav = false;
      this.handleBodyOverflow();

      // 검색바 활성화 시 150ms 후 포커스
      if (this.showMobileSearchBar) {
        setTimeout(() => this.$refs.mobileSearchBarWarp.$refs.searchInput.focus(), 150);
      }
    },
    closeMobileSearchBar() {
      this.showMobileSearchBar = false;
      this.handleBodyOverflow();
    },
    handleBodyOverflow() {
      if (this.showMobileSearchBar || this.showMobileNav) {
        document.body.style.overflow = "hidden";
      } else {
        document.body.style.overflow = "auto";
      }
    }
  }
}
</script>

<style scoped lang="scss">
#mobile-nav {
  position: fixed;
  padding: 20px 16px;
  display: flex;
  width: 100%;
  box-sizing: border-box;
  z-index: 99;
  transition: top 0.3s, background-color 0.15s;
  top: 0;
  align-items: center;

  &.scroll {
    top: -60px;
  }

  &.active {
    background-color: transparent;
    backdrop-filter: none;
  }

  &.open-search {
    background-color: #fff;
  }

  .logo {
    font-size: 1.25em;
    font-weight: 700;
    transition: color 0.3s;
  }

  .search-bar-wrap {
    margin: 0 8px 0 auto;

    button.search-active-btn {
      height: 28px;
      border: none;
      background-color: transparent;
      padding: 0;
      cursor: pointer;

      .search-icon {
        display: inline-block;
        width: 24px;
        height: 24px;
        margin-top: 2px;
        background-color: #000;
        transition: background-color 0.3s;
      }
    }
  }

  .lang-container {
    display: flex;
    align-items: center;
    margin-right: 2%;
    flex-shrink: 0;

    button {
      border: none;
      background: transparent;
      font-size: 1em;
      line-height: 1em;
      cursor: pointer;
      transition: all 0.3s;
      color: #bbb;

      &.active {
        color: #000;
      }
    }
  }

  .btn-hamburger {
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

    span, span::before, span::after {
      position: absolute;
      content: '';
      width: 22px;
      height: 2px;
      background: black;
      border-radius: 20px;
      transition: 500ms cubic-bezier(0.77, 0, 0.175, 1), 300ms color;
      left: 0;
    }

    span::before {
      top: -6px;
    }

    span::after {
      top: 6px;
    }
  }

  // hamburger menu transition
  &.active {
    .logo, .lang-container > button.active {
      color: white
    }

    .lang-container > button {
      color: #888
    }

    .lang-container > button:first-child {
      border-right-color: white;
    }

    .btn-hamburger {
      span {
        background-color: transparent;
      }

      span::before, span::after {
        top: 0;
        background-color: white;
      }

      span::before {
        transform: rotate(-225deg);
      }

      span::after {
        transform: rotate(225deg);
      }
    }

    .search-bar-wrap .search-active-btn .search-icon {
      background-color: #fff;
    }
  }

}

@media screen and (min-width: 768px) {
  #mobile-nav {
    display: none;
  }
}
</style>