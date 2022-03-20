<template>
  <div class="wrap">
    <h1>{{ detailData.title }}</h1>
    <div class="contents">
      <div class="txt-wrap">
        <h2 class="txt-caption">2021, Mixed media, Dimensions variable (430 x 400 x 140cm)</h2>
        <p class="txt-explain">Circulation of color and expansion of Buddha.
          An infinite white Buddha that expands and converges infinitely,
          whose expressions and shapes are not clearly visible, looks at the transparent Buddha.
          Passing through the transparent Buddha's face, which acts as a prism,
          the white Buddha expands to the original digital color RGB (Red, Green, Blue)
          and the original analog color CMYK (Cyan, Magenta, Yellow, and Black).
          Thus, the color transmitted through the prism circulates back to the infinite Buddha.
          All colors circulate and can implement all colors, expand and converge through the form of Buddha.
          There is no beginning and end, and the Buddha, which constantly expands and converges,
          circulates 4-3-1-∞(infinite) in a color-circulating hourglass structure.
          The Buddha separated by color symbolizes line, the transparent Buddha converges into a prism symbolizes dot,
          and the infinite Buddha with infinite colors symbolizes plane, consisting of dot, line, and plane structures.
        </p>
      </div>
      <div class="img-wrap">
        <ul class="img-list">
          <li class="img-item"><img src="../../public/img/sculpture/buddha/1.jpg" alt=""></li>
          <li class="img-item"><img src="../../public/img/sculpture/buddha/2.jpg" alt=""></li>
          <li class="img-item"><img src="../../public/img/sculpture/buddha/3.jpg" alt=""></li>
          <li class="img-item"><img src="../../public/img/sculpture/buddha/4.jpg" alt=""></li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Detail",
  mounted() {

  },
  computed: {
    detailData() {
      return this.$store.state.worksList.find(item => item.id === this.$route.params.id)
    }
  },
  data() {
    return {}
  },
  methods: {}
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
        width: 100%;
        height: auto;
      }
    }
  }
}
</style>