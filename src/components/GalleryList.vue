<template>
  <div class="contents">
    <ul>
      <li v-for="item in listData" :key="item.id">
        <gallery-list-item :item-data="item"/>
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
      return this.$store.state.worksList
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
  }
}
</script>

<style scoped lang="scss">
.contents {
  max-width: 1200px;

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
</style>
