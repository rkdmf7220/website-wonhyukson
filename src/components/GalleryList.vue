<template>
  <div class="contents">
    <ul>
      <li v-for="item in listData" :key="item.id">
        <gallery-list-item :item-data="item"/>
      </li>
    </ul>
<!--    <router-view/>-->
  </div>
</template>

<script>
import GalleryListItem from "./GalleryListItem";
export default {
  name: "GalleryList",
  components: {GalleryListItem},
  computed: {
    listData() {
      let list = this.$store.state.worksList;
      let filtered = list.filter(work => work.type === this.$route.name.toLowerCase());
      return (list) ? filtered : [];
    }
  },
  mounted() {
    // this.loadList()
    this.$store.dispatch('loadWorksList')
  },
  data() {
    return {

    }
  },
  methods: {

  }
}
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
  .contents{
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
      }
    }
  }
}
</style>
