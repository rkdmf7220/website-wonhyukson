<template>
  <div :class="{'is-show': showSlider}" :style="{opacity: sliderOpacity}" ref="image-slider" class="image-slider">
    <SlideInner @decrease:index="decreaseCurrentIndex"
                @increase:index="increaseCurrentIndex"
                @close:slider="closeSlider"
                @change:zoom="changeZoomScale"
                ref="slide-inner"
                :img-list="imgList"
                :current-index="currentIndex"
                :pinch-zoom="pinchZoom"
                :pinch-zoom-scale="pinchZoomScale"/>
    <SlideToolbar @close:slider="closeSlider"
                  @change:zoom="(zoomType) => changeZoomScale(zoomType)"
                  :max-index="maxIndex"
                  :current-index="currentIndex"
                  :pinch-zoom="pinchZoom"
                  :pinch-zoom-scale="pinchZoomScale"/>
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
  beforeUnmount() {
    if (this.$refs["slide-inner"].isTouchDevice) {
      this.$refs["image-slider"].removeEventListener('touchstart', this.$refs["slide-inner"].onSwipeStartSlider)
      this.$refs["image-slider"].removeEventListener('touchmove', this.$refs["slide-inner"].onHandleSwipeDirect)
      this.$refs["image-slider"].removeEventListener('touchmove', this.$refs["slide-inner"].onSwipeSlider)
      this.$refs["image-slider"].removeEventListener('touchend', this.$refs["slide-inner"].onDropSlider)
    }
  },
  data() {
    return {
      currentIndex: 1,
      sliderOpacity: 0,
      pinchZoom: false,
      pinchZoomScale: 1
    }
  },
  methods: {
    decreaseCurrentIndex() {
      this.currentIndex--;
    },
    increaseCurrentIndex() {
      this.currentIndex++;
    },
    changeZoomScale(zoomType) {
      this.$refs["slide-inner"].prevZoomScale = this.pinchZoomScale
      if (zoomType === 'zoom-out') {
        this.$refs["slide-inner"].isDrag = false;
        this.pinchZoomScale--;
      } else if (zoomType === 'zoom-in') {
        this.$refs["slide-inner"].isDrag = false;
        this.pinchZoomScale++;
      } else if (zoomType === 'reset') {
        this.pinchZoomScale = 1;
/*        this.$nextTick(() => {
          this.setZoomMode()
          this.$refs["slide-inner"].resetZoomScale(this.pinchZoomScale);
        })
        return*/
      }
      // this.$refs["slide-inner"].isDrag = false;
      if (this.pinchZoomScale === 1 && this.pinchZoom) {
        this.$nextTick(() => {
          this.setZoomMode()
          this.$refs["slide-inner"].resetZoomScale();
        })
      } else {
        this.$nextTick(() => {
          this.setZoomMode()
          this.$refs["slide-inner"].applyZoomScale();
        })
      }
    },
    setZoomMode() {
      this.pinchZoomScale > 1 ? this.pinchZoom = true : this.pinchZoom = false;
    },
    closeSlider() {
      this.sliderOpacity = 0
      this.$refs["slide-inner"].isDrag = true;
      this.changeZoomScale('reset')
      this.$emit('close:slider')
    },
  }
}
</script>

<style lang="scss">
@import "../assets/scss/image-slider";
</style>