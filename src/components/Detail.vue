<template>
  <div class="wrap">
    <page-title/>
    <div class="contents">
      <div class="txt-wrap">
        <h2 class="txt-caption">{{itemData?.caption}}</h2>
        <p class="txt-explain">{{itemData?.text}}</p>
      </div>
      <div class="img-wrap">
        <ul class="img-list">
          <li class="img-item" v-for="(item, index) in itemData?.imgs" :key="index">
            <img :src="item" alt="">
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import PageTitle from "./PageTitle";
export default {
  name: "Detail",
  components: {PageTitle},
  computed: {
    itemData() {
      return this.$store.state.worksList.find(item => item.id === this.$route.params.id)
    }
  },
  mounted() {
    this.$store.dispatch('loadWorksList')
    console.log(this.itemData)
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
.wrap {
  //margin: 0;
}

.contents {
  max-width: 1200px;

  .txt-wrap {
    margin-bottom: 120px;

    .txt-caption {
      border-bottom: 1px solid black;
      padding-bottom: 32px;
      margin-bottom: 32px;
    }

    .txt-explain {
      font-size: 0.85rem;
      line-height: 1.6rem;
    }
  }

  .img-list {
    display: flex;
    flex-direction: row;

    .img-item {
      width: 23%;
      margin-right: 2%;

      img {
        width: 200px;
        height: 200px;
      }
    }
  }
}
</style>