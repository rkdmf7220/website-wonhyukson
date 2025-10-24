<template>
  <div id="rendered">
    <GlobalNav/>
    <MobileGlobalNav/>
    <RouterView/>
    <Copyright/>
  </div>
</template>

<style lang="scss">
@import url('https://fonts.googleapis.com/css2?family=Noto+Sans+KR:wght@400;700&display=swap');
@import "/src/assets/css/reset.css";

body{
  font-size: 16px;
  overscroll-behavior-y: none;
  height: auto;

  &.show-slider {
    height: 100vh;
    overflow: hidden;
  }
}

h1, h2{
  font-weight: 400;
}
h1{
  font-size: 1.25em
}
h2{
  font-size: 1.125em;
}

a, div, button{
  -webkit-tap-highlight-color: transparent;
}

::-webkit-scrollbar{
  width:10px;
  background-color:#fff
}
::-webkit-scrollbar-thumb{
  background-color:#000
}

.wrap{
  padding: 116px 0 80px 240px;

  &>h1{
    margin-bottom: 32px;
  }
}

@media screen and (max-width: 767px){
  .wrap{
    margin: 0;
    padding: 80px 16px 0 16px;
  }
}
</style>

<script>
import {defineComponent} from "vue";
import GlobalNav from "./components/GlobalNav.vue";
import MobileGlobalNav from "./components/MobileGlobalNav.vue";
import Copyright from "./components/Copyright.vue";
import {useStore} from "./stores/index.js";
import {LanguagePathHandler} from "./utils/language-path-handler.js";

export default defineComponent({
  components: {Copyright, MobileGlobalNav, GlobalNav},
  mounted() {
    window.addEventListener('popstate', () => LanguagePathHandler(this.$route, this.$router));
  },
  watch: {
    '$route.params': {
      /**
       * App에 처음 접속시에만 작동하는 함수.
       * router params에 언어가 있을 경우 사이트 언어를 변경.
       * mounted 단계에선 params 감지 불가하여 watch에서 작동
       *
       * @param {{ lang?: 'ko' | 'en' }} newVal
       * @param {{ lang?: 'ko' | 'en' }} oldVal
       */
      handler: function (newVal, oldVal) {
        if (!oldVal.lang && newVal.lang) {  // 최초에만 실행 위해 !oldval.lang이 조건
          useStore().setLang(newVal.lang);
          document.querySelector('html').setAttribute('lang', newVal.lang);
        }
      }
    },
  }
})

</script>
