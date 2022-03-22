<template>
  <div class="header">
    <h1>{{$route.name}}</h1>
    <div class="lang-container">
      <ul>
        <li @click="onClickLang(Constants.lang.kr)"><span>kr</span></li>
        <li class="active" @click="onClickLang(Constants.lang.en)"><span>en</span></li>
      </ul>
    </div>
  </div>
</template>

<script>
import Constants from "../contants/constants";
export default {
  name: "PageTitle",
  data() {
    return{
      Constants
    }
  },
  methods: {
    onClickLang(lang) {
      this.$store.dispatch('setLang', lang)
    }
  }
}
</script>

<style scoped lang="scss">
  .header{
    display: flex;

    .lang-container{
      margin-left: auto;

      ul{
        display: flex;

        li{
          color: #999;
          cursor: pointer;

          &.active{
            color: #000;
          }
        }
      }
    }
  }
</style>