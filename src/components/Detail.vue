<template>
  <div class="wrap">
    <page-title :title="itemData?.title"/>
    <div class="contents">
      <div class="txt-wrap">
        <h2 class="txt-caption" @click="this.showSwiper = !this.showSwiper">{{itemData?.caption}}</h2>
        <div v-if="this.$route.params.works === 'archive'" class="info-list">
          <div v-for="(item, index) in itemData?.info" :key="index" class="info-item">
            <span class="info-title">{{ item.title }}</span>
            <span class="info-text">{{ item.text}}</span>
          </div>
        </div>
      </div>

<!--      <lightgallery :settings="{speed: 500, download: false, showCloseIcon: true}" class="img-list">
        <a class="img-item" v-for="(item, index) in itemData?.imgs" :href="'/'+item" :key="index">
          <img :src="'/'+item">
        </a>
      </lightgallery>-->

<!--      <swiper :pagination="pagination" :option="this.swiperOption" :modules="modules" :class="{'is-show': showSwiper}" ref="swiper">-->
      <swiper :pagination="pagination" :modules="modules" :class="{'is-show': showSwiper}" ref="swiper">
        <div class="swiper-toolbar">
          <button @click="onClickSwiperClose" class="swiper-close">✕</button>
        </div>
        <swiper-slide v-for="(item, index) in itemData?.imgs" :key="index">
          <img :src="'/'+item" alt="">
        </swiper-slide>
        <div class="swiper-dim"></div>
      </swiper>

      <div class="video-wrap" v-if="itemData?.link">
        <iframe width="100%" height="100%" :src="itemData?.link" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
      </div>
    </div>
  </div>

</template>

<script>
import PageTitle from "./PageTitle";
import 'lightgallery/scss/lightgallery.scss';
import { Swiper, SwiperSlide} from "swiper/vue/swiper-vue";
import { Pagination } from "swiper"
import "../assets/scss/swiper.scss"
import "swiper/modules/pagination/pagination.scss"
export default {
  name: "Detail",
  components: {PageTitle, Swiper, SwiperSlide},
  setup() {
    return {
      pagination: {
        clickable: true,
        renderBullet: function (index, className) {
          return '<span class="' + className + '">' + (index + 1) + "</span>";
        },
      },
      modules: [Pagination],
    };
  },
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
      showSwiper: false,
    }
  },
  methods: {
    onClickSwiperClose() {
      this.showSwiper = !this.showSwiper
    },
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
  width: calc(100% - 80px);
  margin-bottom: 80px;

  .txt-wrap {
    margin-bottom: 100px;
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

  .info-list{
    font-size: 0.85rem;
    line-height: 1.6rem;
    white-space: pre-wrap;
    word-break: keep-all;

    .info-item{
      display: flex;
      &:last-child{
        margin-bottom: 0;
      }

      .info-title{
        flex-shrink: 0;
        padding-right: 10px;
        margin-right: 10px;
        position: relative;

        &::after{
          content: '';
          position: absolute;
          right: 0;
          top: 6px;
          width: 1px;
          height: 1rem;
          background-color: #000;
        }
      }

      .info-text{
        word-break: keep-all;
      }
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

  .swiper .swiper-wrapper .swiper-slide img{
    width: 100%;
    height: 100%;
    object-fit: contain;
  }
}
@media screen and (max-width: 1023px) {
  .wrap {
    .contents {
      .img-list {
        .img-item {
          width: 31.3333%;
          padding-bottom: 31.3333%;
        }
      }
    }
  }
}
@media screen and (max-width: 767px) {
  .wrap {
    .contents {
      width: 100%;
      .txt-wrap {
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
}
</style>