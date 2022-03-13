<template>
  <div class="wrap">
    <h1>{{$route.name}}</h1>
    <gallery-list/>
  </div>
</template>

<script>
import GalleryList from "../components/GalleryList";
export default {
  name: "Sculpture",
  components: {GalleryList}
}
</script>

<style scoped lang="scss">
</style>