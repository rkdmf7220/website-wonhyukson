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
  name: "News",
  components: {PageTitle, GalleryList},
  data() {
    return {

    }
  }
}
</script>

<style scoped>

</style>