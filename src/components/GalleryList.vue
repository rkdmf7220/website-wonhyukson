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
      //return this.$store.state.worksList.filter(work => work.type === this.$route.name.toLowerCase());

      // let list = this.$store.state.worksList;
      // console.log('list는 = ',list, this.$route.name)
      // if (list && list.isArray) {
      //   list = list.filter(work => work.type === this.$route.name.toLowerCase());
      // } else {
      //   list = [];
      // }
      // return list;

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
