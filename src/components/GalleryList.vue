<template>
  <div class="contents">
    <ul v-if="visibleList">
      <li v-for="item in listData" :key="item.id">
        <gallery-list-item :item-data="item" @invisible="showList"/>
      </li>
    </ul>
    <router-view/>
  </div>
</template>

<script>
import GalleryListItem from "./GalleryListItem";

export default {
  name: "GalleryList",
  components: {GalleryListItem},
  computed: {
    listData() {
      console.log('works list는', this.$store)
      return this.$store.state.worksList
    }
  },
  mounted() {
    // this.loadList()
    this.$store.dispatch('loadWorksList')
  },
  data() {
    return {
      // listData: [],
      visibleList: true
    }
  },
  methods: {
    /*loadList() {
      axios.get("../mockup/data-result.json")
          .then(response => {
            console.log('response 내용은',response);
            if(response.statusText === "OK") {
              // this.listData = response.data;
              this.$store.dispatch('updateWorksList', {list: response.data})
            } else {
              // TODO: error handling.
            }
          }).catch(error => {
            console.log('error', error);
            // TODO: error handling.
          });
    },*/
    showList(show) {
      this.$emit('visable', show);
      this.visibleList = show;
    }
  }
}
</script>

<style scoped lang="scss">
.contents {
  max-width: 1200px;

  ul {
    display: flex;
    flex-direction: row;

    li {
      width: 23%;
      margin-right: 2%;
    }
  }
}
</style>
