<template>
  <div class="wrap">
    <page-title :title="itemData?.title" />
    <div class="contents">
      <div class="txt-wrap">
        <h2 class="txt-caption">{{ itemData?.caption }}</h2>
        <div
          v-if="this.$route.params.works === 'archive' || 'news'"
          class="info-list"
        >
          <div
            v-for="(item, index) in itemData?.info"
            :key="index"
            class="info-item"
          >
            <template v-if="item.type === 'PDF'">
              <span class="info-title">PDF</span>
              <a :href="'/' + item.link" class="info-text" target="_blank">
                <u>{{ item.fileName }}</u>
              </a>
            </template>
            <template v-else>
              <span class="info-title">{{ item.title }}</span>
              <span class="info-text">{{ item.text }}</span>
            </template>
          </div>
        </div>
      </div>

      <image-slider
        @close:slider="onClickCloseBtn"
        :show-slider="this.showSlider"
        :img-list="itemData?.imgs"
        ref="slider-component"
      />

      <div :class="{ 'is-disable': this.showSlider }" class="img-list">
        <div
          @click="onClickThumbnail(index)"
          v-for="(item, index) in itemData?.imgs"
          :key="index"
          class="img-item"
        >
          <img
            :src="'/' + item"
            :alt="`${this.$route.params.id} img ${index + 1}`"
          />
        </div>
      </div>
      <div class="video-wrap" v-if="itemData?.link">
        <iframe
          width="100%"
          height="100%"
          :src="itemData?.link"
          title="YouTube video player"
          frameborder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowfullscreen
        ></iframe>
      </div>
    </div>
  </div>
</template>

<script>
import PageTitle from "./PageTitle.vue";
import ImageSlider from "./ImageSlider.vue";
import {useStore} from "../stores/index.js";
export default {
  name: "Detail",
  components: { ImageSlider, PageTitle },
  computed: {
    itemData() {
      return useStore().worksList.find(
          (item) => item.id === this.$route.params.id
      )
    },
  },
  mounted() {
    useStore().loadWorksList()
  },
  data() {
    return {
      showSlider: false,
    };
  },
  methods: {
    onClickThumbnail(index) {
      if (this.showSlider) {
        return;
      }
      this.$refs["slider-component"].currentIndex = index + 1;
      this.$refs["slider-component"].sliderOpacity = 1;
      this.showSlider = true;
      document.body.classList.add("show-slider");
      setTimeout(
        () =>
          (this.$refs["slider-component"].$refs[
            "slide-inner"
          ].isPreventTransition = false),
        10
      );
    },
    onClickCloseBtn() {
      this.showSlider = false;
      document.body.classList.remove("show-slider");
    },
  },
};
</script>

<style scoped lang="scss">
.video-wrap {
  width: 100%;
  height: auto;
  padding-bottom: 56.25%;
  position: relative;

  & > iframe {
    position: absolute;
    z-index: 1;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }
}

.wrap {
  min-height: calc(100vh - 256px);

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
        line-height: 1.5em;
        word-break: keep-all;
      }

      .txt-explain {
        font-size: 0.85em;
        line-height: 1.6em;
        white-space: pre-wrap;
        word-break: keep-all;
      }
    }

    .info-list {
      font-size: 0.85em;
      line-height: 1.88235em;
      white-space: pre-wrap;
      word-break: keep-all;

      .info-item {
        display: flex;

        &:last-child {
          margin-bottom: 0;
        }

        .info-title {
          flex-shrink: 0;
          padding-right: 10px;
          margin-right: 10px;
          position: relative;

          &::after {
            content: "";
            position: absolute;
            right: 0;
            top: 6px;
            width: 1px;
            height: 1.175em;
            background-color: #000;
          }
        }

        .info-text {
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
        height: 0;
        margin: 0 2% 2% 0;
        padding-bottom: 23%;
        position: relative;
        cursor: pointer;
        background-color: #efefef;

        img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          position: absolute;
        }
      }
    }
  }
}

@media screen and (max-width: 1023px) {
  .wrap {
    min-height: calc(calc(var(--vh, 1vh) * 100) - 184px);

    .contents {
      .img-list {
        pointer-events: initial;

        &.is-disable {
          pointer-events: none;
        }

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
