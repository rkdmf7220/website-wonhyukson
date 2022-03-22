<template>
  <div class="wrap">
    <page-title/>
    <gallery-list/>
  </div>
</template>

<script>
import GalleryList from "../components/GalleryList";
import PageTitle from "../components/PageTitle";
export default {
  name: "Video",
  components: {PageTitle, GalleryList},
  data() {
    return {
      visibleList: true
    }
  }
}
</script>

<style scoped>

</style>