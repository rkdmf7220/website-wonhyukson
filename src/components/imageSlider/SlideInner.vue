<template>
  <div class="slide-inner">
    <div
      :class="{ 'is-disable': this.currentIndex === 1 }"
      class="slide-btn-wrap prev-btn-wrap"
    >
      <SlideBtn
        v-show="!isTouchDevice || !pinchZoom"
        @click="onClickPrevBtn"
        icon-type="prevIcon"
        class="slide-prev-btn"
      />
    </div>
    <div
      :class="{ 'is-disable': this.currentIndex === maxIndex }"
      class="slide-btn-wrap next-btn-wrap"
    >
      <SlideBtn
        v-show="!isTouchDevice || !pinchZoom"
        @click="onClickNextBtn"
        icon-type="nextIcon"
        class="slide-next-btn"
      />
    </div>
    <div
      @mousedown="(e) => onDragStartSlider(e)"
      :class="{ 'is-drag': isPreventTransition }"
      :style="{
        transform: `translateX(${slideTranslatePosition}px)`,
        'transition-duration': slideTransitionDuration,
      }"
      ref="slide-contents"
      class="slide-contents"
    >
      <div v-for="(item, index) in imgList" :key="index" class="slide-img-item">
        <picture :id="`slide-img-wrap-${index + 1}`" class="slide-img-wrap">
          <img
            :id="`slide-img-${index + 1}`"
            :src="'/' + item"
            :alt="this.$route.params.id + ' image ' + (index + 1)"
            :draggable="isTouchDevice"
          />
        </picture>
      </div>
    </div>
  </div>
</template>

<script>
import SlideBtn from "./SlideBtn.vue";

export default {
  name: "SlideInner",
  components: { SlideBtn },
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
      return this.imgList?.length;
    },
    isTouchDevice() {
      return (
        navigator.maxTouchPoints || "ontouchstart" in document.documentElement
      );
    },
    slideTransitionDuration() {
      return this.isPreventTransition ? "0ms" : "300ms";
    },
    zoomHorizontalMovable() {
      return (
        document.getElementById(`slide-img-${this.currentIndex}`).offsetWidth *
          this.pinchZoomScale >
        this.$refs["slide-contents"].offsetWidth
      );
    },
    zoomVerticalMovable() {
      return (
        document.getElementById(`slide-img-${this.currentIndex}`).offsetHeight *
          this.pinchZoomScale >
        this.$refs["slide-contents"].offsetHeight
      );
    },
    zoomHorizontalDistance() {
      return (
        Math.abs(
          document.getElementById(`slide-img-${this.currentIndex}`)
            .offsetWidth *
            this.pinchZoomScale -
            this.$refs["slide-contents"].offsetWidth
        ) / 2
      );
    },
    zoomVerticalDistance() {
      return (
        Math.abs(
          document.getElementById(`slide-img-${this.currentIndex}`)
            .offsetHeight *
            this.pinchZoomScale -
            this.$refs["slide-contents"].offsetHeight
        ) / 2
      );
    },
  },
  mounted() {
    window.addEventListener("keydown", (e) => this.onKeydownSlide(e));
    window.addEventListener("resize", this.applyMovedSliderPosition);
    if (this.isTouchDevice) {
      this.$parent.$refs["image-slider"].addEventListener(
        "touchstart",
        this.onSwipeStartSlider,
        {
          passive: false,
        }
      );
      this.$parent.$refs["image-slider"].addEventListener(
        "touchmove",
        this.onHandleSwipeDirect,
        {
          passive: false,
        }
      );
      this.$parent.$refs["image-slider"].addEventListener(
        "touchmove",
        this.onSwipeSlider,
        {
          passive: false,
        }
      );
      this.$parent.$refs["image-slider"].addEventListener(
        "touchend",
        this.onDropSlider
      );
    } else {
      window.addEventListener("mousemove", this.onDragSlider);
      window.addEventListener("mouseup", this.onDropSlider);
    }
  },
  beforeUnmount() {
    window.removeEventListener("keydown", (e) => this.onKeydownSlide(e));
    window.removeEventListener("resize", this.applyMovedSliderPosition);
    window.addEventListener("mousemove", this.onDragSlider);
    window.addEventListener("mouseup", this.onDropSlider);
  },
  data() {
    return {
      isMouseDown: false,
      isPreventTransition: true,
      startDragPointX: null,
      startDragPointY: null,
      currentDragPointX: null,
      currentDragPointY: null,
      swipeDirection: null,
      sliderOpacity: 0,
      currentZoomPositionX: 0,
      currentZoomPositionY: 0,
      prevZoomScale: null,
    };
  },
  methods: {
    onClickPrevBtn() {
      if (this.currentIndex > 1) {
        this.isPreventTransition = false;
        this.resetZoomScale();
        this.$emit("decrease:index");
      }
      // let testWidth = document.getElementById(`slide-img-${this.currentIndex}`).offsetWidth
      // let testHeight = document.getElementById(`slide-img-${this.currentIndex}`).offsetHeight
      // this.applyMovedSliderPosition()
    },
    onClickNextBtn() {
      if (this.currentIndex < this.maxIndex) {
        this.isPreventTransition = false;
        this.resetZoomScale();
        this.$emit("increase:index");
      }
    },
    applyMovedSliderPosition() {
      this.$refs["slide-contents"].style.transform = `translateX(${
        (this.currentIndex - 1) * -this.$refs["slide-contents"]?.clientWidth
      }px)`;
    },
    onDragStartSlider(e) {
      this.isMouseDown = true;
      this.isPreventTransition = true;
      if (this.pinchZoom) {
        this.startDragPointX = e.clientX;
        this.startDragPointY = e.clientY;
      } else {
        this.startDragPointX = e.clientX;
        this.swipeDirection = "horizontal";
      }
    },
    onDragSlider(e) {
      if (this.pinchZoom && this.isMouseDown) {
        this.moveZoomPosition(e);
      } else {
        if (!this.isMouseDown) {
          return;
        }
        this.moveSliderPosition(e);
      }
    },
    moveZoomPosition(e) {
      let currentDragPointX;
      let currentDragPointY;
      if (this.isTouchDevice) {
        currentDragPointX = e.touches[0].clientX;
        currentDragPointY = e.touches[0].clientY;
      } else {
        currentDragPointX = e.clientX;
        currentDragPointY = e.clientY;
      }
      let movedDragDistanceX = currentDragPointX - this.startDragPointX;
      let movedDragDistanceY = currentDragPointY - this.startDragPointY;
      let movedDragPositionX;
      let movedDragPositionY;

      if (this.zoomHorizontalMovable) {
        if (
          this.zoomHorizontalDistance >=
          Math.abs(this.currentZoomPositionX + movedDragDistanceX)
        ) {
          movedDragPositionX = this.currentZoomPositionX + movedDragDistanceX;
        } else {
          movedDragPositionX =
            this.currentZoomPositionX + movedDragDistanceX > 0
              ? this.zoomHorizontalDistance
              : -this.zoomHorizontalDistance;
        }
      } else {
        movedDragPositionX = 0;
      }

      if (this.zoomVerticalMovable) {
        if (
          this.zoomVerticalDistance >=
          Math.abs(this.currentZoomPositionY + movedDragDistanceY)
        ) {
          movedDragPositionY = this.currentZoomPositionY + movedDragDistanceY;
        } else {
          movedDragPositionY =
            this.currentZoomPositionY + movedDragDistanceY > 0
              ? this.zoomVerticalDistance
              : -this.zoomVerticalDistance;
        }
      } else {
        movedDragPositionY = 0;
      }
      document.getElementById(
        `slide-img-wrap-${this.currentIndex}`
      ).style.transform = `translate(
          ${movedDragPositionX}px,
          ${movedDragPositionY}px)`;
    },
    moveSliderPosition(e) {
      let currentDragPoint = e.clientX;
      let movedDragDistance = currentDragPoint - this.startDragPointX;
      let sliderPosition =
        (this.currentIndex - 1) * -this.$refs["slide-contents"]?.clientWidth;
      this.$refs["slide-contents"].style.transform = `translateX(${
        movedDragDistance + sliderPosition
      }px)`;
      // TODO: 이전/다음 슬라이드가 없을 땐 드래그 거리를 10% 감소
    },
    onSwipeStartSlider(e) {
      this.startDragPointX = e.touches[0].clientX;
      this.startDragPointY = e.touches[0].clientY;
      this.isPreventTransition = true;
    },
    onHandleSwipeDirect(e) {
      if (!this.swipeDirection && !this.pinchZoom) {
        let currentDragPointX = e.touches[0].clientX;
        let currentDragPointY = e.touches[0].clientY;
        let movedDragDistanceX = currentDragPointX - this.startDragPointX;
        let movedDragDistanceY = currentDragPointY - this.startDragPointY;

        if (Math.abs(movedDragDistanceX) > 5) {
          // 가로로 움직임
          this.swipeDirection = "horizontal";
        } else if (movedDragDistanceY > 5) {
          // 세로로 움직임
          this.swipeDirection = "vertical";
        }
      }
    },
    onSwipeSlider(e) {
      if (this.pinchZoom) {
        this.moveZoomPosition(e);
      } else {
        if (this.swipeDirection === "horizontal") {
          // 가로로 움직임
          // TODO: 이전/다음 슬라이드가 없을 땐 드래그 거리를 10% 감소
          let currentDragPointX = e.touches[0].clientX;
          let movedDragDistanceX = currentDragPointX - this.startDragPointX;
          let sliderPosition =
            (this.currentIndex - 1) *
            -this.$refs["slide-contents"]?.clientWidth;
          this.$refs["slide-contents"].style.transform = `translateX(${
            movedDragDistanceX + sliderPosition
          }px)`;
        } else if (this.swipeDirection === "vertical") {
          // 세로로 움직임
          let currentDragPointY = e.touches[0].clientY;
          let movedDragDistanceY = currentDragPointY - this.startDragPointY;
          this.$parent.sliderOpacity = 1.03 - movedDragDistanceY * 0.003;
        }
      }
    },
    onDropSlider(e) {
      if (!this.isTouchDevice && !this.isMouseDown) {
        return;
      }
      if (this.pinchZoom) {
        this.saveZoomPosition(e);
      } else {
        if (this.swipeDirection === "horizontal") {
          this.onCheckHorizontalMove(e);
        } else if (this.swipeDirection === "vertical") {
          this.onHandleSliderClose(this.onCheckVerticalMove(e));
        }
        this.resetSwipeDirection();
      }
    },
    saveZoomPosition(e) {
      this.isMouseDown = false;
      let currentDragPointX;
      let currentDragPointY;
      if (this.isTouchDevice) {
        currentDragPointX = e.changedTouches[0].clientX;
        currentDragPointY = e.changedTouches[0].clientY;
      } else {
        currentDragPointX = e.clientX;
        currentDragPointY = e.clientY;
      }
      let movedDragDistanceX = currentDragPointX - this.startDragPointX;
      let movedDragDistanceY = currentDragPointY - this.startDragPointY;

      if (
        this.zoomHorizontalDistance >
        Math.abs(this.currentZoomPositionX + movedDragDistanceX)
      ) {
        this.currentZoomPositionX =
          this.currentZoomPositionX + movedDragDistanceX;
      } else {
        this.currentZoomPositionX =
          this.currentZoomPositionX + movedDragDistanceX > 0
            ? this.zoomHorizontalDistance
            : -this.zoomHorizontalDistance;
      }

      if (
        this.zoomVerticalDistance >
        Math.abs(this.currentZoomPositionY + movedDragDistanceY)
      ) {
        this.currentZoomPositionY =
          this.currentZoomPositionY + movedDragDistanceY;
      } else {
        this.currentZoomPositionY =
          this.currentZoomPositionY + movedDragDistanceY > 0
            ? this.zoomVerticalDistance
            : -this.zoomVerticalDistance;
      }
    },
    onCheckHorizontalMove(e) {
      let endDragPoint;
      if (this.isTouchDevice) {
        endDragPoint = e.changedTouches[0].clientX;
      } else {
        endDragPoint = e.clientX;
      }
      this.isMouseDown = false;
      this.isPreventTransition = false;
      if (
        this.startDragPointX > endDragPoint + 50 &&
        this.currentIndex < this.maxIndex
      ) {
        this.$emit("increase:index");
      } else if (
        this.startDragPointX < endDragPoint - 50 &&
        this.currentIndex > 1
      ) {
        this.$emit("decrease:index");
      }
    },
    onCheckVerticalMove(e) {
      if (this.isTouchDevice) {
        let endDragPoint = e.changedTouches[0].clientY;
        return endDragPoint - this.startDragPointY > 30;
      }
    },
    onHandleSliderClose(moved) {
      if (moved) {
        this.$emit("close:slider");
        this.sliderOpacity = 0;
      } else {
        this.sliderOpacity = 1;
      }
    },
    resetSwipeDirection() {
      this.swipeDirection = null;
    },
    onKeydownSlide(e) {
      let key = e.which || e.key;
      if (key === 27) {
        this.$emit("close:slider");
      } else if (key === 37) {
        this.onClickPrevBtn();
      } else if (key === 39) {
        this.onClickNextBtn();
      }
    },
    // zoom 관련
    applyZoomScale() {
      this.currentZoomPositionX =
        (this.currentZoomPositionX / this.prevZoomScale) * this.pinchZoomScale;
      this.currentZoomPositionY =
        (this.currentZoomPositionY / this.prevZoomScale) * this.pinchZoomScale;
      document.getElementById(
        `slide-img-wrap-${this.currentIndex}`
      ).style.transform = `translate(${this.currentZoomPositionX}px, ${this.currentZoomPositionY}px)`;
      document.getElementById(
        `slide-img-${this.currentIndex}`
      ).style.transform = `scale(${this.pinchZoomScale})`;
    },
    resetZoomScale() {
      this.currentZoomPositionX = 0;
      this.currentZoomPositionY = 0;
      document.getElementById(
        `slide-img-wrap-${this.currentIndex}`
      ).style.transform = `translate(${this.currentZoomPositionX}px, ${this.currentZoomPositionY}px)`;
      document.getElementById(
        `slide-img-${this.currentIndex}`
      ).style.transform = `scale(1)`;
      this.$emit("change:zoom", "reset");
    },
  },
};
</script>

<style scoped></style>
