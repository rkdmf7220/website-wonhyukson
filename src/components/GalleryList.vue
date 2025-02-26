<template>
  <div class="contents">
    <ul>
      <li
        :class="{ 'is-2-column': this.$route.name === 'Archives' }"
        v-for="item in listData"
        :key="item.id"
      >
        <gallery-list-item :item-data="item" />
      </li>
    </ul>
  </div>
</template>

<script>
import GalleryListItem from "./GalleryListItem";

export default {
  name: "GalleryList",
  components: { GalleryListItem },
  computed: {
    listData() {
      let list = this.$store.state.worksList;
      let listOfCurrentCategory = list.filter(
        (work) => work.type === this.$route.name.toLowerCase()
      );

      let filtered;
      if (this.selectedFilterId === "_ALL_") {
        filtered = listOfCurrentCategory;
      } else {
        filtered = listOfCurrentCategory.filter(
          (work) => work.collectionType === this.selectedFilterId
        );
      }
      return list ? filtered : [];
    },
  },
  props: {
    selectedFilterId: String,
  },
  mounted() {
    this.$store.dispatch("loadWorksList");
  },
};
</script>

<style scoped lang="scss">
.contents {
  width: calc(100% - 80px);

  ul {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;

    li {
      width: 23%;
      margin-right: 2%;
      margin-bottom: 40px;
    }
  }
}

@media screen and (min-width: 1921px) {
  .contents {
    ul {
      li {
        width: 18%;
      }
    }
  }
}

@media screen and (max-width: 1023px) {
  .contents {
    ul {
      li {
        width: 48%;
      }
    }
  }
}

@media screen and (max-width: 767px) {
  .contents {
    width: 100%;

    ul {
      li {
        width: 100%;
        margin-right: 0;
        margin-bottom: 64px;

        &.is-2-column {
          width: 49%;

          &:nth-child(odd) {
            margin-right: 2%;
          }
        }
      }
    }
  }
}
</style>
