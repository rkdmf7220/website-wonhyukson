<template>
  <div class="header">
    <h1>{{$route.name}}</h1>
    <div class="lang-container">
        <button @click="onClickLang(Constants.lang.kr)"><span>KR</span></button>
        <button class="active" @click="onClickLang(Constants.lang.en)"><span>EN</span></button>
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
    margin-bottom: 32px;

    .lang-container{
      margin-left: auto;

      button{
        border: none;
        background: transparent;
        font-size: 1rem;
        line-height: 1rem;
        cursor: pointer;
        padding: 0 12px;
        color: #bbb;

        &:first-child{
          border-right: 2px solid black
        }
        &.active{
          color: #000;
        }
      }
    }
  }
</style>