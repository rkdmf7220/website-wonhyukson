<template>
  <div :class="{'is-main': this.$route.name === 'Main'}" class="header">
    <h1>{{ detailTitle }}</h1>
    <div class="lang-container">
      <button :class='{active : currentLang === Constants.lang.kr}' @click="onClickLang(Constants.lang.kr)">
        <span>KR</span></button>
      <button :class='{active : currentLang === Constants.lang.en}' @click="onClickLang(Constants.lang.en)">
        <span>EN</span></button>
    </div>
  </div>
</template>

<script>
import Constants from "../contants/constants";

export default {
  name: "PageTitle",
  props: {
    title: String
  },
  computed: {
    currentLang() {
      return this.$store.state.lang;
    },
    detailTitle() {
      return this.title || this.$route.name
    }
  },
  data() {
    return {
      Constants
    }
  },
  methods: {
    onClickLang(lang) {
      this.$store.dispatch('setLang', lang)
      // this.currentLang = lang
      this.$store.state.lang = lang
    }
  }
}
</script>

<style scoped lang="scss">
.header {
  display: flex;
  margin-bottom: 32px;
  width: calc(100% - 80px);

  h1 {
    line-height: 1.4em;
  }

  .lang-container {
    margin: 6px 2% 0 auto;
    flex-shrink: 0;

    button {
      border: none;
      background: transparent;
      font-size: 1em;
      line-height: 1em;
      cursor: pointer;
      padding: 0 12px;
      color: #bbb;

      &:last-child {
        border-left: 2px solid black;
        margin-right: -12px;
      }

      &.active {
        color: #000;
      }
    }
  }
}

.is-main {
  width: calc(100% - 320px);
  position: absolute;
  top: 116px;
  left: 240px;

  h1 {
    display: none;
  }
}

@media screen and (max-width: 767px) {
  .lang-container {
    display: none;
  }
}
</style>