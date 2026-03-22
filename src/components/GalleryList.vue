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
import GalleryListItem from "./GalleryListItem.vue";
import {useStore} from "../stores/index.js";

export default {
  name: "GalleryList",
  components: { GalleryListItem },
  computed: {
    /*listData() {
      let list = useStore().worksList;
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
    },*/
    listData() {
      const list = useStore().worksList;
      const currentCategory = this.$route.name.toLowerCase();

      let listOfCurrentCategory = list.filter((work) => {
        switch (currentCategory) {
          case 'works':
            // 두 카테고리 중 하나라도 일치하면 true 반환
            return work.type === 'sculpture' || work.type === 'painting';

          default:
            // 그 외 카테고리는 기존처럼 1:1 매칭
            return work.type === currentCategory;
        }
      });

      // 필터링 로직 (기존과 동일)
      if (this.selectedFilterId !== "_ALL_") {
        listOfCurrentCategory = listOfCurrentCategory.filter(
            (work) => work.collectionType === this.selectedFilterId
        );
      }

      return list ? listOfCurrentCategory : [];
    },
  },
  props: {
    selectedFilterId: String,
  },
  mounted() {
    // useStore().loadWorksList();
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
