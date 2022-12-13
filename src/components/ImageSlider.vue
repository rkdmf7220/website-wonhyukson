<template>
  <div class="image-slider is-show">
    <div class="slide-inner">
      <div class="slide-toolbar">
        <div class="slide-counter">
          <span>1 / 1</span>
        </div>
        <button class="slide-close-btn">✕</button>
      </div>
      <button class="slide-btn slide-prev-btn">&lt;</button>
      <button class="slide-btn slide-next-btn">&gt;</button>
      <div class="slide-contents">
        <div class="slide-img-wrapper">
          <img src="/img/sculpture/buddha/01.jpg" alt="">
        </div>
        <div class="slide-img-wrapper">
          <img src="/img/sculpture/buddha/02.jpg" alt="">
        </div>
        <div class="slide-img-wrapper">
          <img src="/img/sculpture/buddha/03.jpg" alt="">
        </div>
        <div class="slide-img-wrapper">
          <img src="/img/sculpture/buddha/04.jpg" alt="">
        </div>
      </div>
    </div>
    <div class="slide-dim"></div>
  </div>
</template>

<script>
export default {
  name: "ImageSlider"
}
</script>

<style scoped lang="scss">
$TOOL_BAR_SIZE: 50px;
$BUTTON_SIZE: 50px;

:root{
  --button-size: 50px;
}

.image-slider{
  display: none;
  &.is-show{
    display: block;
  }

  .slide-inner{
    width: 100%;
    height: 100%;
    position: fixed;
    z-index: 10;
    top: 0;
    left: 0;

    .slide-toolbar{
      width: 100%;
      height: $TOOL_BAR_SIZE;
      display: flex;
      color: #cccccc;

      .slide-counter{
        width: $BUTTON_SIZE;
        margin-right: auto;
        line-height: $BUTTON_SIZE;
        text-align: center;
      }

      .slide-close-btn{
        width: $BUTTON_SIZE;
        padding: 0;
        margin-left: auto;
        color: #cccccc;
        border: none;
        background-color: transparent;
        font-size: 1.5em;
        cursor: pointer;
        transition: color, background-color 0.15s;
        &:hover{
          color: #ffffff;
          background-color: rgba(255, 255, 255, 0.15);
        }
      }
    }

    .slide-btn{
      width: $BUTTON_SIZE;
      height: $BUTTON_SIZE;
      padding: 0;
      position: absolute;
      top: 50%;
      margin-top: -20px;
      color: #cccccc;
      border: none;
      background-color: transparent;
      font-size: 1.5em;
      cursor: pointer;
      transition: color, background-color 0.15s;
      &:hover{
        color: #ffffff;
        background-color: rgba(255, 255, 255, 0.15);
      }

      &.slide-prev-btn{
        left: 0;
      }

      &.slide-next-btn{
        right: 0;
      }
    }

    .slide-contents{
      //width: calc(100% - (#{$BUTTON_SIZE} * 2));
      //margin: auto;
      width: 100%;
      height: 100%;
      display: flex;

      .slide-img-wrapper{
        width: 100%;
        height: 100%;
        cursor: grab;
        flex-shrink: 0;
        display: flex;
        justify-content: center;

        img{
          max-width: 100%;
          max-height: 100%;
          width: auto;
          height: auto;
          object-fit: contain;
        }
      }
    }
    
  }

  .slide-dim{
    width: 100%;
    height: 100%;
    position: fixed;
    z-index: 9;
    left: 0;
    top: 0;
    background-color: #000000;
  }
;
}
</style>