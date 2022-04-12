<template>
  <div id="mobile-nav">
    <router-link to="/" class="logo">Wonhyuk Son</router-link>
    <button class="btn-hamburger">
      <span></span>
    </button>
  </div>
</template>

<script>
export default {
  name: "MobileGlobalNav"
}
</script>

<style scoped lang="scss">
  #mobile-nav{
    position: fixed;
    padding: 20px 16px;

    .btn-hamburger{
      width: 22px;
      height: 18px;
      position: relative;
      vertical-align: middle;
      border: 0;
      background-color: transparent;
      cursor: pointer;
      outline: none;
      font-size: 14px;
      line-height: 1.27;
      padding: 0;

      span, span::before, span::after{
        position: absolute;
        content: '';
        width: 22px;
        height: 2px;
        background: black;
        border-radius: 20px;
        transition: 500ms cubic-bezier(0.77, 0, 0.175, 1), 300ms color;
        left: 0;
      }
      span::before{
        top: -6px;
      }
      span::after{
        top: 6px;
      }
    }
  }
  @media screen and (min-width: 768px){
    #mobile-nav{
      display: none;
    }
  }
</style>