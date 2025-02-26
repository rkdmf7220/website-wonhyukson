<template>
  <filter-list
    :selected-filter-id="selectedFilterId"
    @filter-data="setFilterId"
  />
  <gallery-list :selected-filter-id="selectedFilterId" />
</template>

<script>
import FilterList from "./FilterList.vue";
import GalleryList from "./GalleryList.vue";

export default {
  name: "ContentsWithFilter",
  components: { GalleryList, FilterList },
  data() {
    return {
      selectedFilterId: "_ALL_",
    };
  },
  methods: {
    setFilterId(id) {
      this.selectedFilterId = id;
    },
  },
};
</script>

<style scoped lang="scss"></style>
