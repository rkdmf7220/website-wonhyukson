<template>
  <div :class="{'is-show': showMobileSearchBar}" class="mobile-search-bar-wrap">
    <div class="mobile-search-content">
      <input ref="searchInput" v-model="inputText" @keydown.enter="onHandleSearch" type="text"
             :placeholder="'search'" class="search-input">
      <button @click="onHandleSearch" class="search-btn">
        <span :style="{backgroundImage: 'url(' + svgIcon.get('searchIcon') + ')'}" class="search-icon"></span>
      </button>
    </div>
    <div class="mobile-search-bar-dim"></div>
  </div>
</template>

<script>
import svgIcon from "../../../public/img/svgIcon.js";

export default {
  name: "MobileSearchBarWrap",
  computed: {
    svgIcon() {
      return svgIcon
    }
  },
  props: {
    showMobileSearchBar: Boolean,
  },
  data() {
    return {
      inputText: ''
    }
  },
  methods: {
    onHandleSearch() {
      if (!this.inputText || this.inputText.length === 0) {
        return;
      }
      this.$router.push(`/search/${this.inputText}`);
      this.$emit('closeSearchBar');
    }
  }
}
</script>

<style scoped lang="scss">
.mobile-search-bar-wrap {
  width: 100%;
  height: 100svh;
  visibility: hidden;
  position: fixed;
  z-index: 10;
  top: 68px;
  box-sizing: border-box;
  transition: visibility 0.15s;
  backdrop-filter: blur(1px);

  .mobile-search-content {
    height: 0;
    box-sizing: border-box;
    display: flex;
    align-items: center;
    background-color: #fff;
    padding: 0 8px;
    border-top: 1px solid #000;
    overflow: hidden;
    transition: height 0.15s, padding 0.15s;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);

    input.search-input {
      width: 0;
      height: 24px;
      border: none;
      border-bottom: 1px solid #666;
      padding: 0 0 0 4px;
      margin-left: 0;
      transition: width 0.3s, margin 0.3s;
      overflow: hidden;
      flex: 1 1 0;
      margin-right: 4px;
      position: relative;
      background-color: transparent;

      &:focus {
        outline: none;
      }

      &.is-show {
        width: 150px;
        margin-left: 4px;
      }

      &::after {
        content: '×';
        position: absolute;
        top: 0;
        right: 0;
        width: 16px;
        height: 16px;
        color: #333;
      }
    }

    button.search-btn {
      height: 28px;
      border: none;
      background-color: transparent;
      padding: 0;
      cursor: pointer;

      .search-icon {
        display: inline-block;
        width: 24px;
        height: 24px;
      }
    }
  }

  .mobile-search-bar-dim {
    width: 100%;
    height: calc(100svh - 128px); // 100svh - #mobild-nav.height - .mobile-search-bar-wrap.height
    background: #fff;
    position: absolute;
    top: 59px;
    left: 0;
    z-index: 5;
    opacity: 0;
    pointer-events: none;
    transition: opacity 0.15s;
    backdrop-filter: blur(4px);
  }


  // search bar transition
  &.is-show {
    visibility: visible;

    .mobile-search-content {
      height: 60px;
      padding: 16px 8px;
    }

    .mobile-search-bar-dim {
      opacity: 0.5;
    }
  }
}
</style>