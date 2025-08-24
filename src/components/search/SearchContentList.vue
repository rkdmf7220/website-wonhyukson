<template>
  <ul v-if="searchedList?.length !== 0" class="search-content-list">
    <SearchContentItem v-for="item in filteredList" :key="item.id" :search-item="item"/>
  </ul>
  <span class="no-result-text" v-else>
    <template v-if="currentLang === Constants.lang.ko">
      검색 결과가 없습니다.<br>다른 검색어를 입력해주세요.
    </template>
    <template v-else>
      No search found.<br>Please try different keyword.
    </template>
  </span>
</template>

<script>
import SearchContentItem from "./SearchContentItem.vue";
import {useStore} from "../../stores/index.js";
import Constants from "../../contants/constants.js";

export default {
  name: "SearchContentsList",
  components: {SearchContentItem},
  props: {
    searchedList: Array,
    selectedType: String,
  },
  computed: {
    Constants() {
      return Constants
    },
    filteredList() {
      if (this.selectedType === '_ALL_') {
        return this.searchedList;
      }
      return this.searchedList.filter(item => item.type === this.selectedType);
    },
    currentLang() {
      return useStore().lang;
    }
  }
}
</script>

<style scoped lang="scss">
.search-content-list {
  padding-right: 2%;
}

.no-result-text {
  line-height: 1.25em;
  color: #333;
}
</style>