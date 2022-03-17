<template>
  <div class="wrap">
    <h1>Video</h1>
    <gallery-list/>
  </div>
</template>

<script>
import GalleryList from "../components/GalleryList";
export default {
  name: "Video",
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