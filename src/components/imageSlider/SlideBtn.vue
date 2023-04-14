<template>
  <button :style="{maskImage: 'url(' + svgIcon.get(iconType, isTouchDevice) + ')'}" class="slide-btn"></button>
</template>

<script>
import svgIcon from "../../../public/img/svgIcon";

export default {
  name: "SlideBtn",
  computed: {
    svgIcon() {
      return svgIcon
    },
    isTouchDevice() {
      return navigator.maxTouchPoints || 'ontouchstart' in document.documentElement ? 'Mobile' : '';
    }
  },
  props: {
    iconType: String,
  }
}
</script>

<style scoped>

</style>