<template>
  <div :class="{'is-show': showSlider}" :style="{opacity: sliderOpacity}" ref="image-slider" class="image-slider">
    <SlideInner @decrease:index="decreaseCurrentIndex"
                @increase:index="increaseCurrentIndex"
                @close:slider="closeSlider"
                ref="slide-inner"
                :img-list="imgList"
                :current-index="currentIndex"/>
    <SlideToolbar @close:slider="closeSlider"
                  :max-index="maxIndex"
                  :current-index="currentIndex"
                  :pinch-zoom="pinchZoom"/>
    <div class="slide-dim"></div>
  </div>
</template>

<script>

import SlideToolbar from "./imageSlider/SlideToolbar.vue";
import SlideInner from "./imageSlider/SlideInner.vue";

export default {
  name: "ImageSlider",
  components: {SlideInner, SlideToolbar},
  props: {
    showSlider: Boolean,
    imgList: Array
  },
  computed: {
    slideTranslatePosition() {
      return (this.currentIndex - 1) * -document.body.clientWidth;
    },
    maxIndex() {
      return this.imgList?.length
    },
    isTouchDevice() {
      return navigator.maxTouchPoints || 'ontouchstart' in document.documentElement
    }
  },
  data() {
    return {
      currentIndex: 1,
      sliderOpacity: 0,
      pinchZoom: false
    }
  },
  methods: {
    decreaseCurrentIndex() {
      this.currentIndex--;
    },
    increaseCurrentIndex() {
      this.currentIndex++;
    },
    closeSlider() {
      this.sliderOpacity = 0
      this.$emit('close:slider')
      this.$refs["slide-inner"].isDrag = true;
    },
  }
}
</script>

<style lang="scss">
@import "../assets/scss/image-slider";
</style>