<template>
  <div class="wrap">
    <h1>typography</h1>
    <gallery-list/>
  </div>
</template>

<script>
import GalleryList from "../components/GalleryList";
export default {
  name: "Typography",
  components: {GalleryList},
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

<style scoped>

</style>