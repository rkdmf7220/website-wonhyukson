<template>
  <div class="header">
    <h1>{{detailTitle}}</h1>
    <div class="lang-container">
        <button :class='{active : currentLang === Constants.lang.kr}' @click="onClickLang(Constants.lang.kr)"><span>KR</span></button>
        <button :class='{active : currentLang === Constants.lang.en}' @click="onClickLang(Constants.lang.en)"><span>EN</span></button>
    </div>
  </div>
</template>

<script>
import Constants from "../contants/constants";
export default {
  name: "PageTitle",
  props: {
    title: String
  },
  computed: {
    currentLang() {
      return this.$store.state.lang;
    },
    detailTitle() {
      return this.title || this.$route.name
    }
  },
  data() {
    return{
      Constants,
      // currentLang : "en"
    }
  },
  methods: {
    onClickLang(lang) {
      this.$store.dispatch('setLang', lang)
      this.currentLang = lang
    }
  }
}
</script>

<style scoped lang="scss">
  .header{
    display: flex;
    margin-bottom: 32px;
    max-width: 1200px;

    .lang-container{
      margin-left: auto;
      margin-right: 2%;

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

  @media screen and (max-width: 767px){
    .lang-container{
      display: none;
    }
  ;
  }
</style>