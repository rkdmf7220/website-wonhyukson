<template>
  <div class="item-wrap">
    <div class="bg-img">
      <img src="../../public/img/sculpture/buddha/4.jpg" alt="">
    </div>
    <p class="txt-title">Cycle (Lego Buddha</p>
    <p class="txt-year">2021</p>
  </div>
</template>

<script>
export default {
  name: "GalleryListItem"
}
</script>

<style scoped lang="scss">
  .item-wrap {
    display: flex;
    flex-direction: column;

    .bg-img {
      width: 100%;
      height: auto;

      img {
        width: 100%;
      }
    }

    .txt-title{
      margin: 8px 0 6px 0;
      font-size: 0.75rem;
    }
    .txt-year{
      font-size: 0.75rem;
      color: #666666;
    }
  }
</style>