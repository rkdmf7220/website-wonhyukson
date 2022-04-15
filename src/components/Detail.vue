<template>
  <div class="wrap">
    <page-title :title="itemData?.title"/>
    <div class="contents">
      <div class="txt-wrap">
        <h2 class="txt-caption">{{itemData?.caption}}</h2>
        <p class="txt-explain">{{itemData?.text}}</p>
      </div>

      <lightgallery :settings="{speed: 500, download: false}" class="img-list">
        <a class="img-item" v-for="(item, index) in itemData?.imgs" :href="'/'+item" :key="index">
          <img :src="'/'+item">
        </a>
      </lightgallery>

<!--      <div class="img-wrap" v-if="itemData?.imgs">
        <ul class="img-list">
          <li class="img-item" v-for="(item, index) in itemData?.imgs" :key="index">
            <img :src="'/'+item" alt="">
          </li>
        </ul>
      </div>-->
      <div class="video-wrap" v-if="itemData?.link">
        <iframe width="100%" height="100%" :src="itemData?.link" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
      </div>
    </div>
  </div>

</template>

<script>
import PageTitle from "./PageTitle";
import Lightgallery from 'lightgallery/vue'
import 'lightgallery/scss/lightgallery.scss';
export default {
  name: "Detail",
  components: {PageTitle, Lightgallery},
  computed: {
    itemData() {
      return this.$store.state.worksList.find(item => item.id === this.$route.params.id)
    }
  },
  mounted() {
    this.$store.dispatch('loadWorksList')
  },
  data() {
    return {

    }
  },
  methods: {

  }
}
</script>

<style scoped lang="scss">
.video-wrap{
  width: 100%;
  height: auto;
  padding-bottom: 56.25%;
  position: relative;

  & > iframe{
    position: absolute;
    z-index: 1;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }
}

.contents {
  max-width: 1200px;
  margin-bottom: 80px;

  .txt-wrap {
    margin-bottom: 120px;
    padding-right: 2%;

    .txt-caption {
      border-bottom: 1px solid black;
      padding-bottom: 32px;
      margin-bottom: 32px;
      line-height: 1.35rem;
      word-break: keep-all;
    }

    .txt-explain {
      font-size: 0.85rem;
      line-height: 1.6rem;
      white-space: pre-wrap;
      word-break: keep-all;
    }
  }

  .img-list {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;

    .img-item {
      width: 23%;
      margin: 0 2% 2% 0;
      padding-bottom: 23%;
      height: 0;
      position: relative;

      img {
        width: 100%;
        height: 100%;
        object-fit: cover;
        position: absolute;
      }
    }
  }
}

@media screen and (max-width: 767px) {
  .wrap{
    .txt-wrap{
      padding-right: 0;
    }
    .img-list {
      .img-item {
        width: 49%;
        margin: 0 0 2% 0;
        padding-bottom: 49%;

        &:nth-child(odd) {
          margin-right: 1%;
        }
        &:nth-child(even) {
          margin-left: 1%;
        }
      }
    }
}
}
</style>