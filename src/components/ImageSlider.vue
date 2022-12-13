<template>
  <div :class="{'is-show': showSlider}" class="image-slider">
    <div class="slide-inner">
      <div class="slide-toolbar">
        <div class="slide-counter">
          <span>{{ currentIndex }} / {{ maxIndex }}</span>
        </div>
        <button @click="onClickCloseBtn" class="slide-close-btn">✕</button>
      </div>
      <button @click="onClickPrevBtn" :class="{'is-disable': this.currentIndex === 1}" class="slide-btn slide-prev-btn">&lt;</button>
      <button @click="onClickNextBtn" :class="{'is-disable': this.currentIndex === this.maxIndex}" class="slide-btn slide-next-btn">&gt;</button>
      <div ref="slide-contents" class="slide-contents" :style="`transform: translateX(${slideTranslatePosition}px)`">
        <div v-for="(item, index) in imgList" :key="index" class="slide-img-wrapper">
          <img :src="'/' + item" :alt="this.$route.params.id + ' image ' + (index + 1)">
        </div>
      </div>
    </div>
    <div class="slide-dim"></div>
  </div>
</template>

<script>
export default {
  name: "ImageSlider",
  props: {
    showSlider : Boolean,
    imgList: Array
  },
  computed: {
    slideTranslatePosition() {
      return (this.currentIndex - 1) * -1920;
    },
    maxIndex() {
      return this.imgList?.length
    }
  },
  data() {
    return {
      currentIndex: 1,
    }
  },
  methods: {
    onClickCloseBtn() {
      this.$emit('close:slider')
    },
    onClickPrevBtn() {
      if(this.currentIndex > 1)
      this.currentIndex --;
      this.$refs["slide-contents"].style.transform = `translateX(${(this.currentIndex - 1) * -1920}px)`
    },
    onClickNextBtn() {
      if(this.currentIndex < this.maxIndex)
      this.currentIndex ++;
      this.$refs["slide-contents"].style.transform = `translateX(${(this.currentIndex - 1) * -1920}px)`
    }
  }
}
</script>

<style scoped lang="scss">
$TOOL_BAR_SIZE: 50px;
$BUTTON_SIZE: 50px;

.image-slider{
  display: none;
  &.is-show{
    display: block;
  }

  .slide-inner{
    width: 100%;
    height: 100%;
    position: fixed;
    z-index: 10;
    top: 0;
    left: 0;

    .slide-toolbar{
      width: 100%;
      height: $TOOL_BAR_SIZE;
      display: flex;
      color: #cccccc;

      .slide-counter{
        //min-width: $BUTTON_SIZE;
        padding-left: 10px;
        margin-right: auto;
        line-height: $BUTTON_SIZE;
        text-align: center;
      }

      .slide-close-btn{
        width: $BUTTON_SIZE;
        padding: 0;
        margin-left: auto;
        color: #cccccc;
        border: none;
        background-color: transparent;
        font-size: 1.5em;
        cursor: pointer;
        transition: color, background-color 0.15s;
        &:hover{
          color: #ffffff;
          background-color: rgba(255, 255, 255, 0.15);
        }
      }
    }

    .slide-btn{
      width: $BUTTON_SIZE;
      height: $BUTTON_SIZE;
      padding: 0;
      position: absolute;
      z-index: 10;
      top: 50%;
      margin-top: -20px;
      color: #cccccc;
      border: none;
      background-color: transparent;
      font-size: 1.5em;
      cursor: pointer;
      transition: color, background-color 0.15s;
      &:hover{
        color: #ffffff;
        background-color: rgba(255, 255, 255, 0.15);
      }
      &.is-disable{
        color: #666666;
        &:hover{
          color: #666666;
          background: transparent;
        }
      }

      &.slide-prev-btn{
        left: 0;
      }

      &.slide-next-btn{
        right: 0;
      }
    }

    .slide-contents{
      //width: calc(100% - (#{$BUTTON_SIZE} * 2));
      //margin: auto;
      width: 100%;
      height: 100%;
      display: flex;
      transition: transform 0.25s;

      .slide-img-wrapper{
        width: 100%;
        height: 100%;
        cursor: grab;
        flex-shrink: 0;
        display: flex;
        justify-content: center;

        img{
          max-width: 100%;
          max-height: 100%;
          width: auto;
          height: auto;
          object-fit: contain;
        }
      }
    }
    
  }

  .slide-dim{
    width: 100%;
    height: 100%;
    position: fixed;
    z-index: 9;
    left: 0;
    top: 0;
    background-color: #000000;
  }
;
}
</style>