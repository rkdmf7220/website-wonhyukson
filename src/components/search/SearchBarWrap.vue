<template>
  <div class="search-bar-wrap">
    <button @click="onClickSearchBtn" class="search-btn">
      <span :style="{backgroundImage: 'url(' + svgIcon.get('searchIcon') + ')'}" class="search-icon"></span>
    </button>
    <input ref="searchInput" v-model="inputText" @keydown.enter="onHandleSearch" type="text"
           :class="{'is-show': showSearchInput}" :placeholder="'search'" class="search-input">
  </div>
</template>

<script>
import svgIcon from '../../../public/img/svgIcon.js';
import {useStore} from "../../stores/index.js";

export default {
  name: "SearchBarWrap",
  computed: {
    svgIcon() {
      return svgIcon;
    },
    searchKeywordInStore() {
      return useStore().searchKeyword;
    }
  },
  data() {
    return {
      showSearchInput: false,
      inputText: ''
    }
  },
  watch: {
    // store에 값이 있을 때(search 페이지에 params가 있을 때) 검색어 기본 값 설정
    searchKeywordInStore(newValue) {
      if (!newValue || newValue.length === 0) {
        return;
      }
      this.inputText = newValue;
      this.showSearchInput = true;
    }
  },
  mounted() {
    document.getElementById('app').addEventListener('click', this.hideSearchInput);
  },
  unmounted() {
    document.getElementById('app').removeEventListener('click', this.hideSearchInput);
  },
  methods: {
    useStore,
    onClickSearchBtn() {
      // show searchBar or do search
      if (!this.showSearchInput) {
        this.showSearchInput = true;
        this.$refs.searchInput.focus();
      } else {
        this.onHandleSearch();
      }
    },
    onHandleSearch() {
      if (!this.inputText || this.inputText.length === 0) {
        return;
      }

      this.$router.push(`/${useStore().lang}/search/${this.inputText}`);
    },
    hideSearchInput(e) {
      if (e.target.closest('.search-bar-wrap')) return;
      if (this.inputText.length !== 0) return;

      this.showSearchInput = false;
      this.inputText = '';
    },
    setKeywordInSearchPage() {
      let keyword = useStore().searchKeyword;
      if (keyword) {
        this.inputText = keyword;
        this.showSearchInput = true;
      }
    }
  },
}
</script>

<style scoped lang="scss">
.search-bar-wrap {
  display: flex;
  justify-content: center;
  margin: 0 16px 0 auto;

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

  .search-input {
    width: 0;
    height: 24px;
    border: none;
    border-bottom: 1px solid #666;
    padding: 0;
    margin-left: 0;
    transition: width 0.3s, margin 0.3s;
    overflow: hidden;
    background-color: transparent;

    &:focus {
      outline: none;
    }

    &.is-show {
      width: 150px;
      margin-left: 4px;
    }
  }
}

@media screen and (max-width: 768px) {
  .search-bar-wrap {
    display: none;
  }
}
</style>