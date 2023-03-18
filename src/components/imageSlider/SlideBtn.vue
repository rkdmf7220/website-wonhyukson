<template>
  <button :style="{maskImage: 'url(' + svgIcon.get(iconType) + ')'}" class="slide-btn"></button>
</template>

<script>
import svgIcon from "../../../public/img/svgIcon";

export default {
  name: "SlideBtn",
  computed: {
    svgIcon() {
      return svgIcon
    }
  },
  props: {
    iconType: String,
  }
}
</script>

<style scoped>

</style>