<template>
  <div class="lang-container">
    <button :class='{active : currentLang === Constants.lang.ko}' @click="onClickLang(Constants.lang.ko)">
      <span>{{ Constants.lang.ko.toUpperCase() }}</span></button>
    <button :class='{active : currentLang === Constants.lang.en}' @click="onClickLang(Constants.lang.en)">
      <span>{{ Constants.lang.en.toUpperCase() }}</span></button>
  </div>
</template>

<script>
import {useStore} from "../stores/index.js";
import Constants from "../contants/constants.js";

export default {
  name: "LangContainer",
  computed: {
    Constants() {
      return Constants
    },
    currentLang() {
      return useStore().lang;
    }
  },
  methods: {
    onClickLang(lang) {
      if (this.currentLang === lang) return;
      useStore().setLang(lang)
    }
  }
}
</script>

<style scoped lang="scss">
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
    padding: 0 4px;
    color: #bbb;

    &:last-child {
      margin-left: 4px;
      margin-right: -8px; // 라인을 맞추기 위해 버튼의 오른쪽 padding 크기 만큼 보정
    }

    span {
      border-bottom: 1px solid transparent;
    }

    &.active {
      color: #000;

      span {
        border-color: currentColor;
      }
    }
  }

  &.is-mobile {
    justify-content: center;

    button {
      color: #aaa;

      &.active {
        color: #fff;
      }
    }
  }
}
</style>