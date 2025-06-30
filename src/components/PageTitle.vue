<template>
  <div :class="{'is-main': this.$route.name === 'Main'}" class="header">
    <h1>{{ detailTitle }}</h1>
    <SearchWrap />
    <div class="lang-container">
      <div class="vertical-bar"></div>
      <button :class='{active : currentLang === Constants.lang.kr}' @click="onClickLang(Constants.lang.kr)">
        <span>KR</span></button>
      <button :class='{active : currentLang === Constants.lang.en}' @click="onClickLang(Constants.lang.en)">
        <span>EN</span></button>
    </div>
  </div>
</template>

<script>
import Constants from "../contants/constants";
import {useStore} from "../stores/index.js";
import SearchBarWrap from "./search/SearchBarWrap.vue";

export default {
  name: "PageTitle",
  components: {SearchWrap: SearchBarWrap},
  props: {
    title: String
  },
  computed: {
    currentLang() {
      return useStore().lang;
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
      useStore().setLang(lang)
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
    display: flex;
    align-items: center;
    margin-right: 2%;
    flex-shrink: 0;

    .vertical-bar {
      width: 2px;
      height: 16px;
      background-color: #666;
      margin-right: 10px;
    }

    button {
      border: none;
      background: transparent;
      font-size: 1em;
      line-height: 1em;
      cursor: pointer;
      padding: 0 4px;
      color: #bbb;

      &:last-child {
        margin-left: 4px;
        margin-right: -8px;  // 라인을 맞추기 위해 버튼의 오른쪽 padding 크기 만큼 보정
      }

      span {
        border-bottom: 1px solid transparent;
      }

      &.active {
        color: #000;

        span {
          border-color: #000;
        }
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