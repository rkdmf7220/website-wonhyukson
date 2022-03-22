<template>
  <div class="wrap">
    <page-title/>
    <gallery-list @visable="invisibleList"/>
  </div>
</template>

<script>
import GalleryList from "../components/GalleryList";
import PageTitle from "../components/PageTitle";
export default {
  name: "Sculpture",
  components: {PageTitle, GalleryList},
  data() {
    return {
      visibleList: true
    }
  },
  methods: {
    invisibleList(show) {
      this.visibleList = show;
    }
  }
}
</script>

<style scoped lang="scss">
</style>