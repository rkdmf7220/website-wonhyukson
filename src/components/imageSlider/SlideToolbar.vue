<template>
  <div class="slide-toolbar">
    <div class="slide-counter">
      <span>{{ currentIndex }} / {{ maxIndex }}</span>
    </div>
    <button :class="{'is-disable': pinchZoomScale === 1}" @click="onClickZoomOutBtn('zoom-out')" class="slide-btn slide-zoom-btn slide-zoom-out-btn">
      ─
    </button>
    <button :class="{'is-disable': pinchZoomScale === 4}" @click="onClickZoomInBtn('zoom-in')" class="slide-btn slide-zoom-btn slide-zoom-in-btn">
      +
    </button>
    <button @click="onClickCloseBtn" class="slide-btn slide-close-btn">✕</button>
  </div>
</template>

<script>
export default {
  name: "SlideToolbar",
  props: {
    maxIndex: Number,
    currentIndex: Number,
    pinchZoom: Boolean,
    pinchZoomScale: Number
  },
  methods: {
    onClickZoomOutBtn(zoomType) {
      if (this.pinchZoomScale > 1) {
        this.$emit('change:zoom', zoomType)
      }
    },
    onClickZoomInBtn(zoomType) {
      if (this.pinchZoomScale < 4) {
        this.$emit('change:zoom', zoomType)
      }
    },
    onClickCloseBtn() {
      this.$emit('close:slider')
    }
  }
}
</script>

<style scoped>

</style>