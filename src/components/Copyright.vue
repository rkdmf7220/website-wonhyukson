<template>
<div v-if="this.$route.name !== 'Intro'" class="copyright">
  <span>© 2020. Wonhyuk Son All rights reserved.</span>
</div>
</template>

<script>
export default {
  name: "Copyright"
}
</script>

<style scoped lang="scss">
.copyright{
  width: 100%;
  padding: 0 0 60px 240px;
  color: #666666;
  box-sizing: border-box;
  span{
    font-size: 0.75em;
  }
}
@media screen and (max-width: 767px){
  .copyright{
    width: 100%;
    height: 40px;
    padding: 0 16px 0 16px;
  }
}
</style>