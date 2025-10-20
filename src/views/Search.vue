<template>
  <main class="wrap">
    <PageTitle/>
    <div class="search-wrap">
      <SearchFilter @change-filter="onChangeFilter" :searched-list="searchedList" :selectedType="selectedType"/>
      <SearchContentsList :searched-list="searchedList" :selectedType="selectedType"/>
    </div>
  </main>
</template>

<script>
import PageTitle from "../components/PageTitle.vue";
import {useStore} from "../stores/index.js";
import SearchFilter from "../components/search/SearchFilter.vue";
import SearchContentList from "../components/search/SearchContentList.vue";
import searchData from "../utils/search-utils.js";

export default {
  name: "Search",
  components: {SearchContentsList: SearchContentList, SearchFilter, PageTitle},
  computed: {
    searchedList() {
      return searchData(useStore().searchKeyword);
    },
    keywordsInRouteParams() {
      return this.$route.params.keyword;
    }
  },
  watch: {
    keywordsInRouteParams(newValue) {
      // console.log('newvalue >>', newValue)
      if (!newValue || newValue.length === 0) {
        return;
      }
      useStore().updateSearchKeyword(newValue);
    },
    searchedList(newValue) {
      if (!newValue || newValue.length === 0) {
        return;
      }
    }
  },
  data() {
    return {
      selectedType: '_ALL_',
    }
  },
  mounted() {
    // store에 검색어 저장
    useStore().updateSearchKeyword(this.keywordsInRouteParams);
  },
  methods: {
    onChangeFilter(id) {
      this.selectedType = id;
    }
  }
}
</script>

<style scoped lang="scss">
.search-wrap {
  width: calc(100% - 80px);
  display: flex;
  margin-bottom: 64px;
}

@media screen and (max-width: 767px) {
  .search-wrap {
    width: 100%;
    flex-direction: column;
    gap: 24px;
  }
}
</style>