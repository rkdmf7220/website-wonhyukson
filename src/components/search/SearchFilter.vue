<template>
  <ul class="filter-list">
    <template v-for="type in filterList" :key="type.id">
      <li @click="() => onClickFilterItem(type.id)" v-if="type.length"
          :class="{'is-active': this.selectedType === type.id}" class="filter-item" tabindex="0">
        <span class="filter-name">{{ type.title }}</span>
        <span class="filter-length">{{ type.length }}</span>
      </li>
    </template>
    <li v-if="!searchedList?.length" class="filter-item is-active">
      <span class="filter-name">All Results</span>
      <span class="filter-length">0</span>
    </li>
  </ul>
</template>

<script>
import searchData from "../../utils/search-utils.js";
import {useStore} from "../../stores/index.js";

export default {
  name: "SearchFilter",
  props: {
    searchedList: Array,
    selectedType: String,
  },
  data() {
    return {
      filterList: [{
        title: 'All Results',
        id: '_ALL_',
        length: null
      }, {
        title: 'Sculpture',
        id: 'sculpture',
        length: null
      }, {
        title: 'Painting',
        id: 'painting',
        length: null
      }, {
        title: 'Typography',
        id: 'typography',
        length: null
      }, {
        title: 'Texts',
        id: 'texts',
        length: null
      }, {
        title: 'Archives',
        id: 'archives',
        length: null
      }, {
        title: 'News',
        id: 'news',
        length: null
      }]
    }
  },
  watch: {
    searchedList(newValue, oldValue) {
      this.setFilterList(newValue);
    }
  },
  mounted() {
    this.setFilterList(this.searchedList);
  },
  methods: {
    useStore,
    searchData,
    onClickFilterItem(id) {
      this.$emit('change-filter', id);
    },
    setFilterList(list) {
      this.filterList.forEach(item => {
        if (item.id === '_ALL_') {
          item.length = list?.length
          return;
        }
        item.length = list?.filter(searchedItem => searchedItem.type === item.id).length;
      })
    }
  }
}
</script>

<style scoped lang="scss">
.filter-list {
  width: 120px;
  display: flex;
  flex-direction: column;
  row-gap: 12px;
  margin-right: 120px;
  flex-shrink: 0;

  .filter-item {
    color: #999;
    cursor: pointer;
    line-height: 1.25em;

    .filter-name {
      display: inline-block;
      width: 100px;
    }

    &.is-active {
      color: #000;
    }
  }
}
</style>