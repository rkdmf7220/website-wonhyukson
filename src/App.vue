<template>
  <div id="app">
    <global-nav/>
    <mobile-global-nav/>
    <router-view/>
    <Copyright/>
  </div>
</template>

<style lang="scss">
@import url('https://fonts.googleapis.com/css2?family=Noto+Sans+KR:wght@400;700&display=swap');
@import "src/assets/css/reset";

h1, h2{
  font-weight: 400;
}
h1{
  font-size: 1.25rem
}
h2{
  font-size: 1.125rem;
}

::-webkit-scrollbar{
  width:10px;
  background-color:#fff
}
::-webkit-scrollbar-thumb{
  background-color:#000
}

.wrap{
  margin: 116px 0 80px 240px;

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
import GlobalNav from "./components/GlobalNav";
import MobileGlobalNav from "./components/MobileGlobalNav";
import Copyright from "./components/Copyright";
export default {
  components: {Copyright, MobileGlobalNav, GlobalNav}
}
</script>