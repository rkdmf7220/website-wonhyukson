<template>
  <ul v-if="searchedList?.length !== 0" class="search-content-list">
    <SearchContentItem v-for="item in filteredList" :key="item.id" :search-item="item"/>
  </ul>
  <span v-else>No search found.<br>Please try different keyword.</span>
</template>

<script>
import SearchContentItem from "./SearchContentItem.vue";

export default {
  name: "SearchContentsList",
  components: {SearchContentItem},
  props: {
    searchedList: Array,
    selectedType: String,
  },
  computed: {
    filteredList() {
      if (this.selectedType === '_ALL_') {
        return this.searchedList;
      }
      return this.searchedList.filter(item => item.type === this.selectedType);
    }
  }
}
</script>

<style scoped lang="scss">
.search-content-list {
  padding-right: 2%;
}
</style>