<template>
  <div class="slide-toolbar">
    <div class="slide-counter">
      <span>{{ currentIndex }} / {{ maxIndex }}</span>
    </div>
    <button :class="{'is-zoom': pinchZoom}" @click="onClickZoomBtn" class="slide-btn slide-zoom-btn">
      🔍︎
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
    pinchZoom: Boolean
  },
  methods: {
    onClickCloseBtn() {
      this.$emit('close:slider')
    }
  }
}
</script>

<style scoped>

</style>