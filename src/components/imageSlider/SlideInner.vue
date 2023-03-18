<template>
  <div class="slide-inner">
    <div :class="{'is-disable': this.currentIndex === 1}" class="slide-btn-wrap prev-btn-wrap">
      <SlideBtn v-show="!isTouchDevice || !pinchZoom" @click="onClickPrevBtn" icon-type="prevIcon" class="slide-prev-btn"/>
    </div>
    <div :class="{'is-disable': this.currentIndex === maxIndex}" class="slide-btn-wrap next-btn-wrap">
      <SlideBtn v-show="!isTouchDevice || !pinchZoom" @click="onClickNextBtn" icon-type="nextIcon" class="slide-next-btn"/>
    </div>
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
import SlideBtn from "./SlideBtn.vue";

export default {
  name: "SlideInner",
  components: {SlideBtn},
  props: {
    imgList: Array,
    currentIndex: Number,
    pinchZoom: Boolean,
    pinchZoomScale: Number,
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
    },
    zoomHorizontalMovable() {
      // return document.getElementById(`slide-img-${this.currentIndex}`).offsetWidth * this.pinchZoomScale;
      // let offsetWidth = document.getElementById(`slide-img-${this.currentIndex}`).offsetWidth * this.pinchZoomScale
      // let contentsWidth = this.$refs['slide-contents'].offsetWidth
      // console.log('checkWidth >>', offsetWidth, 'and', contentsWidth)
      return (document.getElementById(`slide-img-${this.currentIndex}`).offsetWidth * this.pinchZoomScale) > this.$refs['slide-contents'].offsetWidth;
    },
    zoomVerticalMovable() {
      // return document.getElementById(`slide-img-${this.currentIndex}`).offsetHeight * this.pinchZoomScale;
      return (document.getElementById(`slide-img-${this.currentIndex}`).offsetHeight * this.pinchZoomScale) > this.$refs['slide-contents'].offsetHeight;
    },
    zoomHorizontalDistance() {
      return Math.abs((document.getElementById(`slide-img-${this.currentIndex}`).offsetWidth * this.pinchZoomScale) - this.$refs['slide-contents'].offsetWidth) / 2;
    },
    zoomVerticalDistance() {
      return Math.abs((document.getElementById(`slide-img-${this.currentIndex}`).offsetHeight * this.pinchZoomScale) - this.$refs['slide-contents'].offsetHeight) / 2;
    }
  },
  mounted() {
    window.addEventListener('keydown', (e) => this.onKeydownSlide(e));
    window.addEventListener('resize', this.applyMovedSliderPosition);
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
    window.removeEventListener('resize', this.applyMovedSliderPosition);
/*    if (this.isTouchDevice) {
      this.$parent.$refs["image-slider"].removeEventListener('touchstart', this.onSwipeStartSlider)
      this.$parent.$refs["image-slider"].removeEventListener('touchmove', this.onHandleSwipeDirect)
      this.$parent.$refs["image-slider"].removeEventListener('touchmove', this.onSwipeSlider)
      this.$parent.$refs["image-slider"].removeEventListener('touchend', this.onDropSlider)
    }*/
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
      currentZoomPositionX: 0,
      currentZoomPositionY: 0,
      prevZoomScale: null,
    }
  },
  methods: {
    onClickPrevBtn() {
      if (this.currentIndex > 1) {
        this.isDrag = false
        this.resetZoomScale()
        this.$emit('decrease:index')
      }
      // let testWidth = document.getElementById(`slide-img-${this.currentIndex}`).offsetWidth
      // let testHeight = document.getElementById(`slide-img-${this.currentIndex}`).offsetHeight
      // console.log('가로 확인 >>', testWidth, testHeight)
      // this.applyMovedSliderPosition()
    },
    onClickNextBtn() {
      if (this.currentIndex < this.maxIndex) {
        this.isDrag = false
        this.resetZoomScale()
        this.$emit('increase:index')
      }
      // this.applyMovedSliderPosition()
    },
    applyMovedSliderPosition() {
      this.$refs["slide-contents"].style.transform = `translateX(${(this.currentIndex - 1) * -this.$refs["slide-contents"]?.clientWidth}px)`
    },
    onDragStartSlider(e) {
      this.isDrag = true
      // console.log('start >>', e)
      if (this.pinchZoom) {
        this.startDragPointX = e.clientX
        this.startDragPointY = e.clientY
      } else {
        this.startDragPointX = e.clientX
        this.swipeDirection = 'horizontal'
      }
      // console.log('dragStart >>', this.startDragPointX)
    },
    onDragSlider(e) {
      e.preventDefault()
      e.dataTransfer.dropEffect = "move";
      if (this.pinchZoom) {
        this.moveZoomPosition(e)
      } else {
        /*if (!this.isDrag) {
          return
          // 이 부분이 필요한가?
        }*/
        this.moveSliderPosition(e)
      }
    },
    moveZoomPosition(e) {
      let currentDragPointX
      let currentDragPointY
      if (this.isTouchDevice) {
        currentDragPointX = e.touches[0].clientX;
        currentDragPointY = e.touches[0].clientY;
        // console.log('dragXY', e, currentDragPointX, currentDragPointY)
      } else {
        currentDragPointX = e.clientX;
        currentDragPointY = e.clientY;
      }
      let movedDragDistanceX = currentDragPointX - this.startDragPointX;
      let movedDragDistanceY = currentDragPointY - this.startDragPointY;
      let movedDragPositionX;
      let movedDragPositionY;

      if (this.zoomHorizontalMovable) {
        if (this.zoomHorizontalDistance >= Math.abs(this.currentZoomPositionX + movedDragDistanceX)) {
          movedDragPositionX = this.currentZoomPositionX + movedDragDistanceX;
        } else {
          movedDragPositionX = (this.currentZoomPositionX + movedDragDistanceX) > 0 ? this.zoomHorizontalDistance : -this.zoomHorizontalDistance;
        }
      } else {
        movedDragPositionX = 0
        // console.log('작동 4')
      }

      if (this.zoomVerticalMovable) {
        // console.log('Y 숫자 확인 >>', this.zoomVerticalDistance, Math.abs(this.currentZoomPositionY + movedDragDistanceY))
        if (this.zoomVerticalDistance >= Math.abs(this.currentZoomPositionY + movedDragDistanceY)) {
          movedDragPositionY = this.currentZoomPositionY + movedDragDistanceY;
          // console.log('work1')
        } else {
          movedDragPositionY = (this.currentZoomPositionY + movedDragDistanceY) > 0 ? this.zoomVerticalDistance : -this.zoomVerticalDistance;
          // console.log('work2')
        }
      } else {
        movedDragPositionY = 0
        // console.log('work3')
      }
      /*      document.getElementById(`slide-img-wrap-${this.currentIndex}`).style.transform =
                `translate(
                ${this.currentZoomPositionX + movedDragDistanceX}px,
                ${this.currentZoomPositionY + movedDragDistanceY}px)`*/
      document.getElementById(`slide-img-wrap-${this.currentIndex}`).style.transform =
          `translate(
          ${movedDragPositionX}px,
          ${movedDragPositionY}px)`
    },
    moveSliderPosition(e) {
      let currentDragPoint = e.clientX
      let movedDragDistance = currentDragPoint - this.startDragPointX
      let sliderPosition = (this.currentIndex - 1) * -this.$refs["slide-contents"]?.clientWidth
      this.$refs["slide-contents"].style.transform = `translateX(${movedDragDistance + sliderPosition}px)`
      // TODO: 이전/다음 슬라이드가 없을 땐 드래그 거리를 10% 감소
    },
    onSwipeStartSlider(e) {
      this.startDragPointX = e.touches[0].clientX;
      this.startDragPointY = e.touches[0].clientY;
      this.isDrag = true;
    },
    onHandleSwipeDirect(e) {
      if (!this.swipeDirection && !this.pinchZoom) {
        let currentDragPointX = e.touches[0].clientX;
        let currentDragPointY = e.touches[0].clientY;
        let movedDragDistanceX = currentDragPointX - this.startDragPointX;
        let movedDragDistanceY = currentDragPointY - this.startDragPointY;

        if (Math.abs(movedDragDistanceX) > 5) {
          // 가로로 움직임
          this.swipeDirection = 'horizontal';
        } else if (movedDragDistanceY > 5) {
          // 세로로 움직임
          this.swipeDirection = 'vertical';
        }
      }
    },
    onSwipeSlider(e) {
      if (this.pinchZoom) {
        this.moveZoomPosition(e)
      } else {
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
      }
    },
    onDropSlider(e) {
      if (this.pinchZoom) {
        this.saveZoomPosition(e)
      } else {
        if (this.swipeDirection === 'horizontal') {
          this.onCheckHorizontalMove(e)
        } else if (this.swipeDirection === 'vertical') {
          this.onHandleSliderClose(this.onCheckVerticalMove(e))
        }
        this.resetSwipeDirection()
      }
    },
    saveZoomPosition(e) {
      let currentDragPointX
      let currentDragPointY
      if (this.isTouchDevice) {
        currentDragPointX = e.changedTouches[0].clientX;
        currentDragPointY = e.changedTouches[0].clientY;
      } else {
        currentDragPointX = e.clientX;
        currentDragPointY = e.clientY;
      }
      let movedDragDistanceX = currentDragPointX - this.startDragPointX;
      let movedDragDistanceY = currentDragPointY - this.startDragPointY;

      if (this.zoomHorizontalDistance > Math.abs(this.currentZoomPositionX + movedDragDistanceX)) {
        this.currentZoomPositionX = this.currentZoomPositionX + movedDragDistanceX
        // console.log('drop if', this.currentZoomPositionX)
      } else {
        this.currentZoomPositionX = this.currentZoomPositionX + movedDragDistanceX > 0 ? this.zoomHorizontalDistance : -this.zoomHorizontalDistance
        // console.log('drop else', this.currentZoomPositionX)
      }

      if (this.zoomVerticalDistance > Math.abs(this.currentZoomPositionY + movedDragDistanceY)) {
        this.currentZoomPositionY = this.currentZoomPositionY + movedDragDistanceY
      } else {
        this.currentZoomPositionY = this.currentZoomPositionY + movedDragDistanceY > 0 ? this.zoomVerticalDistance : -this.zoomVerticalDistance
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
      /*      if (!this.pinchZoom) {
              console.log('!pinchZoom', this.pinchZoomScale)
              return
            }*/
      this.currentZoomPositionX = this.currentZoomPositionX / this.prevZoomScale * this.pinchZoomScale;
      this.currentZoomPositionY = this.currentZoomPositionY / this.prevZoomScale * this.pinchZoomScale;
      // document.getElementById(`slide-img-wrap-${this.currentIndex}`).style.transform =
      //     `translate(
      //     ${this.currentZoomPositionX / this.prevZoomScale * this.pinchZoomScale}px,
      //     ${this.currentZoomPositionY / this.prevZoomScale * this.pinchZoomScale}px)`;
      document.getElementById(`slide-img-wrap-${this.currentIndex}`).style.transform = `translate(${this.currentZoomPositionX}px, ${this.currentZoomPositionY}px)`;
      document.getElementById(`slide-img-${this.currentIndex}`).style.transform = `scale(${this.pinchZoomScale})`;
    },
    resetZoomScale() {
      this.currentZoomPositionX = 0;
      this.currentZoomPositionY = 0;
      // console.log('pinchScale >>', this.pinchZoomScale);
      // document.getElementById(`slide-img-wrap-${this.currentIndex}`).style.transform = "translate(0px, 0px)";
      // document.getElementById(`slide-img-${this.currentIndex}`).style.transform = 'scale(1, 1)';
      // console.log('정보 확인 >>', this.currentIndex, this.currentZoomPositionX, this.currentZoomPositionY, this.pinchZoomScale)
      document.getElementById(`slide-img-wrap-${this.currentIndex}`).style.transform = `translate(${this.currentZoomPositionX}px, ${this.currentZoomPositionY}px)`;
      document.getElementById(`slide-img-${this.currentIndex}`).style.transform = `scale(1)`;
      this.$emit('change:zoom', 'reset')
    }
  }
}
</script>

<style scoped>

</style>