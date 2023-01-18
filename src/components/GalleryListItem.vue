<template>
  <div class="item-wrap">
    <router-link :to="`/${itemData.type}/${itemData.id}`" @click="onClickArtworkList">
      <div class="bg-img">
        <img :src="itemData.thumb" alt="">
      </div>
      <p class="txt-title">{{itemData.title}}</p>
      <p class="txt-year">{{itemData.year}}</p>
    </router-link>
  </div>
</template>

<script>
export default {
  name: "GalleryListItem",
  props: {
    itemData: Object
  },
  data() {
    return {
      displayList: true
    }
  },

  methods: {
    onClickArtworkList() {
      this.$emit('invisible', !this.displayList);
    }
  }
}
</script>

<style scoped lang="scss">
  .item-wrap {
    display: flex;
    flex-direction: column;

    .bg-img {
      width: 100%;
      height: 0;
      padding-bottom: 100%;
      position: relative;
      background-color: #efefef;

      img {
        position: absolute;
        width: 100%;
        height: 100%;
        object-fit: cover;
      }
    }

    .txt-title{
      margin: 8px 0 6px 0;
      font-size: 0.75em;
      line-height: 1.3333em;
      word-break: keep-all;
    }
    .txt-year{
      font-size: 0.75em;
      color: #666666;
    }
  }
</style>