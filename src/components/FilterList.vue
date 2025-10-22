<template>
  <ul v-if="filterListData && filterListData.length > 1" class="filter-list">
    <li class="filter-item-empty"></li><!-- filter 목록 앞의 공백 요소-->
    <li
      v-for="item in filterListData"
      :key="item.id"
      @click="() => onclickFilterList(item.id)"
      :class="{ 'is-active': item.id === selectedFilterId }"
      class="filter-item"
    >
      {{ item.name }}
    </li>
    <li class="filter-item-empty"></li><!-- filter 목록 뒤의 공백 요소-->
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
  overflow: auto hidden;
  margin-left: -16px;
  width: calc(100% + 32px);

  // 스크롤바 숨기기
  -ms-overflow-style: none;
  &::-webkit-scrollbar {
    display: none;
  }

  .filter-item {
    color: #bbb;
    cursor: pointer;
    white-space: nowrap;
    line-height: 1.33em;

    &:hover {
      color: #999;
    }

    &.is-active {
      color: #000;
    }
  }
}
</style>
