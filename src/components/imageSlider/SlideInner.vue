<template>
  <div class="slide-inner">
    <button
        v-show="!isTouchDevice || !pinchZoom"
        @click="onClickPrevBtn"
        :class="{'is-disable': this.currentIndex === 1}"
        class="slide-btn slide-prev-btn">
      &lt;
    </button>
    <button
        v-show="!isTouchDevice || !pinchZoom"
        @click="onClickNextBtn"
        :class="{'is-disable': this.currentIndex === this.maxIndex}"
        class="slide-btn slide-next-btn">
      &gt;
    </button>
    <div
        @dragstart="(e) => onDragStartSlider(e)"
        @dragover="(e) => onDragSlider(e)"
        @dragend="(e) => onDropSlider(e)"
        :class="{'is-drag': isDrag}"
        :style="{
         'transform': `translateX(${slideTranslatePosition}px)`,
         'transition-duration': slideTransitionDuration
        }"
        ref="slide-contents"
        class="slide-contents"
    >
      <div
          v-for="(item, index) in imgList"
          :key="index" class="slide-img-item"
      >
        <picture :id="`slide-img-wrap-${index + 1}`" class="slide-img-wrap">
          <img :id="`slide-img-${index + 1}`" :src="'/' + item" :alt="this.$route.params.id + ' image ' + (index + 1)">
        </picture>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "SlideInner",
  props: {
    imgList: Array,
    currentIndex: Number,
    pinchZoom: Boolean,
    pinchZoomScale: Number
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
    },
    slideTransitionDuration() {
      return this.isDrag ? '0ms' : '300ms';
    }
  },
  mounted() {
    window.addEventListener('keydown', (e) => this.onKeydownSlide(e));
    window.addEventListener('resize', this.moveSliderPosition);
    if (this.isTouchDevice) {
      this.$parent.$refs["image-slider"].addEventListener('touchstart', this.onSwipeStartSlider, {
        passive: false
      })
      this.$parent.$refs["image-slider"].addEventListener('touchmove', this.onHandleSwipeDirect, {
        passive: false
      })
      this.$parent.$refs["image-slider"].addEventListener('touchmove', this.onSwipeSlider, {
        passive: false
      })
      this.$parent.$refs["image-slider"].addEventListener('touchend', this.onDropSlider)
    }
  },
  beforeUnmount() {
    window.removeEventListener('keydown', (e) => this.onKeydownSlide(e));
    window.removeEventListener('resize', this.moveSliderPosition);
    if (this.isTouchDevice) {
      this.$parent.$refs["image-slider"].removeEventListener('touchstart', this.onSwipeStartSlider)
      this.$parent.$refs["image-slider"].removeEventListener('touchmove', this.onHandleSwipeDirect)
      this.$parent.$refs["image-slider"].removeEventListener('touchmove', this.onSwipeSlider)
      this.$parent.$refs["image-slider"].removeEventListener('touchend', this.onDropSlider)
    }
  },
  data() {
    return {
      isDrag: true,
      startDragPointX: null,
      startDragPointY: null,
      currentDragPointX: null,
      currentDragPointY: null,
      swipeDirection: null,
      sliderOpacity: 0,
    }
  },
  methods: {
    onClickPrevBtn() {
      if (this.currentIndex > 1) {
        this.isDrag = false
        this.resetZoomScale()
        this.$emit('decrease:index')
      }
      this.moveSliderPosition()
    },
    onClickNextBtn() {
      if (this.currentIndex < this.maxIndex) {
        this.isDrag = false
        this.resetZoomScale()
        this.$emit('increase:index')
      }
      this.moveSliderPosition()
    },
    moveSliderPosition() {
      this.$refs["slide-contents"].style.transform = `translateX(${(this.currentIndex - 1) * -this.$refs["slide-contents"]?.clientWidth}px)`
    },
    onDragStartSlider(e) {
      if (!this.pinchZoom) {
        this.startDragPointX = e.clientX
        this.isDrag = true
        this.swipeDirection = 'horizontal'
        console.log(e.clientX, this.isDrag, this.swipeDirection)
      }
    },
    onDragSlider(e) {
      e.preventDefault()
      e.dataTransfer.dropEffect = "move";
      if (!this.pinchZoom) {
        if (!this.isDrag) {
          return
        }
        let currentDragPoint = e.clientX
        let movedDragDistance = currentDragPoint - this.startDragPointX
        let sliderPosition = (this.currentIndex - 1) * -this.$refs["slide-contents"]?.clientWidth
        this.$refs["slide-contents"].style.transform = `translateX(${movedDragDistance + sliderPosition}px)`
        // TODO: 이전/다음 슬라이드가 없을 땐 드래그 거리를 10% 감소
      }
    },
    onSwipeStartSlider(e) {
      this.startDragPointX = e.touches[0].clientX
      this.startDragPointY = e.touches[0].clientY
      this.isDrag = true
    },
    onHandleSwipeDirect(e) {
      if (!this.swipeDirection) {
        let currentDragPointX = e.touches[0].clientX
        let currentDragPointY = e.touches[0].clientY
        let movedDragDistanceX = currentDragPointX - this.startDragPointX
        let movedDragDistanceY = currentDragPointY - this.startDragPointY

        if (Math.abs(movedDragDistanceX) > 5) {
          // 가로로 움직임
          this.swipeDirection = 'horizontal'
        } else if (movedDragDistanceY > 5) {
          // 세로로 움직임
          this.swipeDirection = 'vertical'
        }
      }
    },
    onSwipeSlider(e) {
      if (this.swipeDirection === 'horizontal') {
        // 가로로 움직임
        // TODO: 이전/다음 슬라이드가 없을 땐 드래그 거리를 10% 감소
        let currentDragPointX = e.touches[0].clientX
        let movedDragDistanceX = currentDragPointX - this.startDragPointX
        let sliderPosition = (this.currentIndex - 1) * -this.$refs["slide-contents"]?.clientWidth
        this.$refs["slide-contents"].style.transform = `translateX(${movedDragDistanceX + sliderPosition}px)`
      } else if (this.swipeDirection === 'vertical') {
        // 세로로 움직임
        let currentDragPointY = e.touches[0].clientY
        let movedDragDistanceY = currentDragPointY - this.startDragPointY
        this.$parent.sliderOpacity = 1.03 - (movedDragDistanceY * 0.003)
      }
    },
    onDropSlider(e) {
      if (!this.pinchZoom) {
        if (this.swipeDirection === 'horizontal') {
          this.onCheckHorizontalMove(e)
        } else if (this.swipeDirection === 'vertical') {
          this.onHandleSliderClose(this.onCheckVerticalMove(e))
        }
        this.resetSwipeDirection()
      }
    },
    onCheckHorizontalMove(e) {
      let endDragPoint
      if (this.isTouchDevice) {
        endDragPoint = e.changedTouches[0].clientX
      } else {
        endDragPoint = e.clientX
      }
      this.isDrag = false
      if (this.startDragPointX > endDragPoint + 50 && this.currentIndex < this.maxIndex) {
        this.$emit('increase:index')
      } else if (this.startDragPointX < endDragPoint - 50 && this.currentIndex > 1) {
        this.$emit('decrease:index')
      }
    },
    onCheckVerticalMove(e) {
      if (this.isTouchDevice) {
        let endDragPoint = e.changedTouches[0].clientY
        return endDragPoint - this.startDragPointY > 30;
      }
    },
    onHandleSliderClose(moved) {
      if (moved) {
        this.$emit('close:slider')
        this.sliderOpacity = 0
      } else {
        this.sliderOpacity = 1
      }
    },
    resetSwipeDirection() {
      this.swipeDirection = null
    },
    onKeydownSlide(e) {
      let key = e.which || e.key;
      if (key === 27) {
        this.$emit('close:slider')
      } else if (key === 37) {
        this.onClickPrevBtn()
      } else if (key === 39) {
        this.onClickNextBtn()
      }
    },
    // zoom 관련
    applyZoomScale() {
      console.log('applyZoomScale start', this.pinchZoomScale)
      document.getElementById(`slide-img-wrap-${this.currentIndex}`).style.transform = "translate(0px, 0px)";
      document.getElementById(`slide-img-${this.currentIndex}`).style.transform = `scale(${this.pinchZoomScale})`;
      console.log('applyZoomScale end', this.pinchZoomScale);
    },
    resetZoomScale() {
      document.getElementById(`slide-img-wrap-${this.currentIndex}`).style.transform = "translate(0px, 0px)";
      document.getElementById(`slide-img-${this.currentIndex}`).style.transform = 'scale(1, 1)';
      this.$emit('change:zoom', 'reset')
    }
  }
}
</script>

<style scoped>

</style>