<template>
  <div class="wrap">
    <page-title />
    <details v-for="(item, index) in reviewData" :key="index">
      <summary>{{ item.title }}</summary>
      <p class="sub-title">{{ item.subTitle }}</p>
      <div
        class="review-wrap"
        v-for="(data, index) in item.contents"
        :key="index"
      >
        <span v-html="data.text"></span>
        <div v-if="data.imgs" class="info-wrap">
          <div class="img-list">
            <div
              class="img-item"
              v-for="(pic, index) in data.imgs"
              :key="index"
            >
              <img :src="pic.src" alt="" />
            </div>
          </div>
          <div
            class="caption-list"
            v-for="(caption, index) in data.imgs"
            :key="index"
          >
            <p class="caption-text">{{ caption.caption }}</p>
          </div>
        </div>
      </div>
    </details>
  </div>
</template>

<script>
import PageTitle from "../components/PageTitle.vue";
import {useStore} from "../stores/index.js";

export default {
  name: "Texts",
  components: { PageTitle },
  computed: {
    reviewData() {
      return useStore().review;
    },
  },
  mounted() {
    useStore().loadReview();
  },
};
</script>

<style lang="scss" scoped>
.wrap {
  min-height: calc(100vh - 256px);

  details {
    width: calc(98% - 80px);
    border-top: 1px solid #ccc;
    padding: 32px 0 32px 16px;
    font-size: 0.75em;
    line-height: 1.6666em;
    margin-right: 2%;
    box-sizing: border-box;

    &:last-child {
      border-bottom: 1px solid #ccc;
    }

    &[open] > summary {
      padding-bottom: 16px;

      &::after {
        content: "−";
      }
    }

    summary {
      list-style: none;
      font-size: 1.6666em;
      line-height: 1.2em;
      font-weight: 700;
      transition: all 0.15s;
      cursor: pointer;
      word-break: keep-all;

      &::-webkit-details-marker {
        display: none;
      }

      &::after {
        content: "+";
        margin-left: 8px;
      }
    }

    .sub-title {
      font-size: 1.135em;
      font-weight: 700;
      margin-bottom: 16px;
      word-break: keep-all;
    }

    .review-wrap {
      margin-bottom: 32px;
      max-width: 750px;

      &:last-child {
        margin-bottom: 0;
      }

      span {
        white-space: pre-wrap;
      }

      .info-wrap {
        margin-top: 16px;

        .img-list {
          display: flex;
          flex-wrap: wrap;

          .img-item {
            width: 24%;
            margin-right: 1%;

            img {
              width: 100%;
              display: block;
            }
          }
        }
      }
    }
  }
}

@media screen and (max-width: 767px) {
  .wrap {
    //min-height: calc(100vh - 184px);
    min-height: calc(calc(var(--vh, 1vh) * 100) - 184px);
    margin-bottom: 64px;

    details {
      width: 100%;
      padding-right: 16px;

      .review-wrap .info-wrap .img-list .img-item {
        width: 49%;

        &:nth-child(even) {
          margin-right: 0;
          margin-left: 1%;
        }
      }
    }
  }
}
</style>
