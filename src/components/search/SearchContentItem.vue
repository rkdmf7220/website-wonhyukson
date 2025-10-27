<template>
  <li class="search-content-item">
    <template v-if="searchItem?.type === 'texts'">
      <router-link :to="`/${useStore().lang}/texts`">
        <h4 class="search-item-title">{{ searchItem?.title }}</h4>
        <p class="search-item-text">
          <span>{{ searchItem?.searchedText.before }}</span>
          <span class="search-item-text-highlight">{{ searchItem?.searchedText.highlight }}</span>
          <span>{{ searchItem?.searchedText.after }}</span>
        </p>
        <p class="search-item-type">{{ searchItem?.type }}</p>
      </router-link>
    </template>
    <template v-else>
      <router-link :to="`/${useStore().lang}/${searchItem?.type}/${searchItem?.id}`">
        <h4 class="search-item-title">{{ searchItem?.title }}</h4>
        <p class="search-item-text">
          <span>{{ searchItem?.searchedText.before }}</span>
          <span class="search-item-text-highlight">{{ searchItem?.searchedText.highlight }}</span>
          <span>{{ searchItem?.searchedText.after }}</span>
        </p>
        <p class="search-item-type">{{ searchItem?.type }}</p>
      </router-link>
    </template>
  </li>
</template>

<script>
import {useStore} from "../../stores/index.js";

export default {
  name: "SearchContentItem",
  props: {
    searchItem: Object,
  },
  methods: {
    useStore
  }
}
</script>

<style scoped lang="scss">
li.search-content-item {
  margin-bottom: 64px;

  &:last-child {
    margin-bottom: 0;
  }

  h4.search-item-title {
    font-weight: 700;
    margin-bottom: 4px;
  }

  .search-item-text {
    line-height: 1.5em;

    .search-item-text-highlight {
      background-color: #e0e0e0;
      font-weight: 700;
    }
  }

  .search-item-type {
    margin-top: 4px;
    color: #999999;
    padding-bottom: 8px;
  }
}
</style>