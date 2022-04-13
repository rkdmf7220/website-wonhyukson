<template>
  <div class="wrap">
    <page-title/>
    <details v-for="(item, index) in reviewData" :key="index">
      <summary>{{item.title}}</summary>
      <p class="sub-title">{{item.subTitle}}</p>
      <div class="review-wrap" v-for="(data, index) in item.contents" :key="index">
        <span>{{data.text}}</span>
        <div v-if="data.imgs" class="info-wrap">
          <div class="img-list">
            <div class="img-item" v-for="(pic, index) in data.imgs" :key="index">
              <img :src="pic.src" alt="">
            </div>
          </div>
          <div class="caption-list" v-for="(caption, index) in data.imgs" :key="index">
            <p class="caption-text">{{caption.caption}}</p>
          </div>
        </div>
      </div>
    </details>
  </div>
</template>

<script>
import PageTitle from "../components/PageTitle";
export default {
  components: {PageTitle},
  data() {
    return{

    }
  },
  computed: {
    reviewData() {
      return this.$store.state.review
    }
  },
  mounted() {
    this.$store.dispatch('loadReview')
  }
}
</script>

<style lang="scss">
.wrap{
  max-width: 1200px;
  details {
    border-top: 1px solid #ccc;
    padding: 32px 0 32px 16px;
    font-size: 0.75rem;
    line-height: 1.25rem;
    margin-right: 2%;

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
      font-size: 1.25rem;
      font-weight: 700;
      transition: all 0.15s;
      cursor: pointer;

      &::-webkit-details-marker {
        display: none;
      }

      &::after {
        content: "+";
        margin-left: 8px;
      }
    }

    .sub-title {
      font-size: 0.85rem;
      font-weight: 700;
      margin-bottom: 16px;
    }

    .review-wrap {
      margin-bottom: 32px;
      &:last-child{
        margin-bottom: 0;
      }

      span {
        white-space: pre-wrap;
      }

      .info-wrap{
        margin-top: 16px;

        .img-list{
          display: flex;
          flex-wrap: wrap;

          .img-item{
            width: 24%;
            margin-right: 1%;

            img{
              width: 100%;
            }
          }
        }
      }
    }
  }
}

@media screen and (max-width: 767px) {
  .wrap details .review-wrap .info-wrap .img-list .img-item{
    width: 49%;

    &:nth-child(even){
      margin-right: 0;
      margin-left: 1%;
    }
  }
}
</style>