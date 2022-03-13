<template>
  <div class="contents">
    <ul>
      <li>
        <gallery-list-item/>
      </li>
    </ul>
  </div>
</template>

<script>
import GalleryListItem from "./GalleryListItem";
export default {
  name: "GalleryList",
  components: {GalleryListItem}
}
</script>

<style scoped lang="scss">
  .contents{
    max-width: 1200px;

    ul{
      display: flex;
      flex-direction: row;

      li{
        width: 23%;
        margin-right: 2%;
      }
    }
  }
</style>