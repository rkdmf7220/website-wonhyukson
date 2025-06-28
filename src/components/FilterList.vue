<template>
  <ul v-if="filterListData && filterListData.length > 1" class="filter-list">
    <li
      v-for="item in filterListData"
      :key="item.id"
      @click="() => onclickFilterList(item.id)"
      :class="{ 'is-active': item.id === selectedFilterId }"
      class="filter-item"
    >
      {{ item.name }}
    </li>
  </ul>
</template>

<script>
import {useStore} from "../stores/index.js";

export default {
  name: "FilterList",
  computed: {
    filterListData() {
      let list = useStore().filterList;
      let currentPath = this.$route.name.toLowerCase();
      return list[currentPath] ? list[currentPath] : null;
    },
  },
  props: {
    selectedFilterId: String,
  },
  mounted() {
    // useStore().loadFilterList();
  },
  methods: {
    onclickFilterList(id) {
      this.$emit("filterData", id);
    },
  },
};
</script>

<style scoped lang="scss">
.filter-list {
  display: flex;
  gap: 16px;
  margin-bottom: 24px;

  .filter-item {
    color: #bbb;
    cursor: pointer;

    &:hover {
      color: #999;
    }

    &.is-active {
      color: #000;
    }
  }
}
</style>
