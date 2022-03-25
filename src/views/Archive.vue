<template>
  <div class="wrap">
    <page-title/>
    <gallery-list/>
  </div>
</template>

<script>
import PageTitle from "../components/PageTitle";
import GalleryList from "../components/GalleryList";
export default {
  name: "Archive",
  components: {GalleryList, PageTitle}
}
</script>

<style scoped>

</style>