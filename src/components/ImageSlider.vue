<template>
  <div :class="{'is-show': showSlider}" class="image-slider">
    <div class="slide-toolbar">
      <div class="slide-counter">
        <span>{{ currentIndex }} / {{ maxIndex }}</span>
      </div>
      <button @click="onClickCloseBtn" class="slide-close-btn">✕</button>
    </div>
    <div class="slide-inner">
      <button @click="onClickPrevBtn" :class="{'is-disable': this.currentIndex === 1}" class="slide-btn slide-prev-btn">&lt;</button>
      <button @click="onClickNextBtn" :class="{'is-disable': this.currentIndex === this.maxIndex}" class="slide-btn slide-next-btn">&gt;</button>
      <div
          @dragstart="(e) => onDragStartSlider(e)"
          @dragover="(e) => onDragSlider(e)"
          @dragend="(e) => onDropSlider(e)"
          :class="{'is-drag': isDrag}"
          :style="`transform: translateX(${slideTranslatePosition}px)`"
          ref="slide-contents"
          class="slide-contents"
      >
        <div
            v-for="(item, index) in imgList"
            :key="index" class="slide-img-wrapper"
        >
          <img :src="'/' + item" :alt="this.$route.params.id + ' image ' + (index + 1)">
        </div>
      </div>
    </div>
    <div class="slide-dim"></div>
  </div>
</template>

<script>

export default {
  name: "ImageSlider",
  props: {
    showSlider : Boolean,
    imgList: Array
  },
  computed: {
    slideTranslatePosition() {
      return (this.currentIndex - 1) * -document.body.clientWidth;
    },
    maxIndex() {
      return this.imgList?.length
    },
    isTouchDevice() {
      return navigator.maxTouchPoints || 'ontouchstart' in document.documentElement
    }
  },
  mounted() {
    window.addEventListener('keydown', (e) => this.onKeydownSlide(e));
    window.addEventListener('resize', this.moveSliderPosition);
    if (this.isTouchDevice) {
/*      this.$refs["slide-contents"].addEventListener('touchstart', this.onSwipeStartSlider)
      this.$refs["slide-contents"].addEventListener('touchmove', this.onSwipeSlider)
      this.$refs["slide-contents"].addEventListener('touchend', this.onDropSlider)*/
      window.addEventListener('touchstart', this.onSwipeStartSlider)
      window.addEventListener('touchmove', this.onSwipeSlider)
      window.addEventListener('touchend', this.onDropSlider)
    }
  },
  beforeUnmount() {
    window.removeEventListener('keydown', (e) => this.onKeydownSlide(e));
    window.removeEventListener('resize', this.moveSliderPosition);
    if (this.isTouchDevice) {
/*      this.$refs["slide-contents"].removeEventListener('touchstart', this.onSwipeStartSlider)
      this.$refs["slide-contents"].removeEventListener('touchmove', this.onSwipeSlider)
      this.$refs["slide-contents"].removeEventListener('touchend', this.onDropSlider)*/
      window.removeEventListener('touchstart', this.onSwipeStartSlider)
      window.removeEventListener('touchmove', this.onSwipeSlider)
      window.removeEventListener('touchend', this.onDropSlider)
    }
  },
  data() {
    return {
      currentIndex: 1,
      isDrag: false,
      startDragPoint: null,
      currentDragPoint: null,
    }
  },
  methods: {
    onClickCloseBtn() {
      this.$emit('close:slider')
    },
    onClickDimArea(e) {
      console.log(e)
      // TODO: dim area 클릭시 slider 닫힘
    },
    onClickPrevBtn() {
      if(this.currentIndex > 1)
      this.currentIndex --;
      this.moveSliderPosition()
    },
    onClickNextBtn() {
      if(this.currentIndex < this.maxIndex)
      this.currentIndex ++;
      this.moveSliderPosition()
    },
    moveSliderPosition() {
      this.$refs["slide-contents"].style.transform = `translateX(${(this.currentIndex - 1) * -this.$refs["slide-contents"]?.clientWidth}px)`
      this.$refs["slide-contents"].style.transitionDuration = '300ms'
    },
    onDragStartSlider(e) {
      this.startDragPoint = e.clientX
      this.isDrag = true
    },
    onDragSlider(e) {
      console.log(this.isTouchDevice)
      if (!this.isDrag) {
        return
      }
      let currentDragPoint = e.clientX
      let movedDragDistance = currentDragPoint - this.startDragPoint
      let sliderPosition = (this.currentIndex - 1) * -this.$refs["slide-contents"]?.clientWidth
      this.$refs["slide-contents"].style.transform = `translateX(${movedDragDistance + sliderPosition}px)`
      this.$refs["slide-contents"].style.transitionDuration = '0ms'
    },
    onSwipeStartSlider(e) {
      this.startDragPoint = e.touches[0].clientX
      this.isDrag = true
    },
    onSwipeSlider(e) {
      // console.log(this.isTouchDevice)
/*      if (!this.isDrag) {
        return
      }*/
      let currentDragPoint = e.touches[0].clientX
      let movedDragDistance = currentDragPoint - this.startDragPoint
      let sliderPosition = (this.currentIndex - 1) * -this.$refs["slide-contents"]?.clientWidth
      this.$refs["slide-contents"].style.transform = `translateX(${movedDragDistance + sliderPosition}px)`
      this.$refs["slide-contents"].style.transitionDuration = '0ms'
    },
    onDropSlider(e) {
      let endDragPoint
      if (this.isTouchDevice) {
        endDragPoint = e.changedTouches[0].clientX
        if (Math.abs(this.startDragPoint - endDragPoint) < 10 && e.target.getAttribute('class') === 'slide-img-wrapper') {
          console.log(e)
          setTimeout(this.onTouchDimArea, 10)
          this.moveSliderPosition()
          return
        }
      } else {
        endDragPoint = e.clientX
      }
      this.isDrag = false
      if (this.startDragPoint > endDragPoint + 50 && this.currentIndex < this.maxIndex) {
        this.currentIndex ++;
      } else if (this.startDragPoint < endDragPoint - 50 && this.currentIndex > 1) {
        this.currentIndex --;
      }
      this.moveSliderPosition()
      this.$refs["slide-contents"].style.transitionDuration = '300ms'
    },
    onTouchDimArea() {
      this.$emit('close:slider')
    },
    onKeydownSlide(e) {
      let key = e.which || e.key;
      if (key === 27) {
        this.onClickCloseBtn()
      } else if (key === 37) {
        this.onClickPrevBtn()
      } else if (key === 39) {
        this.onClickNextBtn()
      }
    }
  }
}
</script>

<style scoped lang="scss">
$TOOL_BAR_SIZE: 50px;
$BUTTON_SIZE: 50px;

.image-slider{
  opacity: 0;
  transition: opacity 150ms;
  position: relative;
  z-index: 101;
  pointer-events: none;
  &.is-show{
    opacity: 1;
    pointer-events: initial;
  }

  .slide-toolbar{
    width: 100%;
    height: $TOOL_BAR_SIZE;
    top: 0;
    left: 0;
    position: fixed;
    display: flex;
    color: #cccccc;
    z-index: 110;

    .slide-counter{
      //min-width: $BUTTON_SIZE;
      padding-left: 10px;
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
      transition: color 0.15s, background-color 0.15s;
      &:hover{
        color: #ffffff;
        background-color: rgba(255, 255, 255, 0.15);
      }
    }
  }

  .slide-inner{
    width: 100%;
    height: calc(100% - #{$TOOL_BAR_SIZE});
    position: fixed;
    z-index: 110;
    top: $TOOL_BAR_SIZE;
    left: 0;

    .slide-btn{
      width: $BUTTON_SIZE;
      height: $BUTTON_SIZE;
      padding: 0;
      position: absolute;
      z-index: 110;
      top: 50%;
      margin-top: -$TOOL_BAR_SIZE/2;
      color: #cccccc;
      border: none;
      background-color: transparent;
      font-size: 1.5em;
      cursor: pointer;
      transition: color, background-color 0.15s;

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
      transition-duration: 0ms;
      &.is-drag{
        
        .slide-img-wrapper img{
          cursor: grab;
        }
      }

      .slide-img-wrapper{
        width: 100%;
        height: 100%;
        flex-shrink: 0;
        display: flex;
        justify-content: center;

        img{
          max-width: 100%;
          max-height: 100%;
          width: auto;
          height: auto;
          object-fit: contain;
          cursor: pointer;
          align-self: center;
        }
      }
    }
    
  }

  .slide-dim{
    width: 100%;
    height: 100%;
    position: fixed;
    z-index: 109;
    left: 0;
    top: 0;
    background-color: #000000;
  }
;
}

@media(hover: hover) and (pointer: fine) {
  .image-slider .slide-inner .slide-btn {
    &:hover {
      color: #ffffff;
      background-color: rgba(255, 255, 255, 0.15);
    }

    &.is-disable {
      color: #666666;

      &:hover {
        color: #666666;
        background: transparent;
      }
    }
  }
}
</style>