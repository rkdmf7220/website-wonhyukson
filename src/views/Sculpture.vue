<template>
  <div class="wrap">
    <h1>{{$route.name}}</h1>
    <gallery-list @visable="invisibleList"/>
  </div>
</template>

<script>
import GalleryList from "../components/GalleryList";
export default {
  name: "Sculpture",
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

<style scoped lang="scss">
</style>