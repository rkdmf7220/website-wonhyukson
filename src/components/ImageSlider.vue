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
      // console.log('위치 및 크기 확인 >>>>', this.currentIndex, this.$refs["slide-contents"], this.$refs["slide-contents"]?.clientWidth)
      return (this.currentIndex - 1) * -document.body.clientWidth;
    },
    maxIndex() {
      return this.imgList?.length
    }
  },
  data() {
    return {
      currentIndex: 1,
      isDrag: false,
      startDragPoint: null,
      currentDragPoint: null
    }
  },
  methods: {
    onClickCloseBtn() {
      this.$emit('close:slider')
    },
    onClickPrevBtn() {
      if(this.currentIndex > 1)
      this.currentIndex --;
      // console.log('prev btn >>>>', this.$refs["slide-contents"], this.$refs["slide-contents"]?.clientWidth)
      this.moveSliderPosition()
    },
    onClickNextBtn() {
      if(this.currentIndex < this.maxIndex)
      this.currentIndex ++;
      this.moveSliderPosition()
    },
    moveSliderPosition() {
      this.$refs["slide-contents"].style.transform = `translateX(${(this.currentIndex - 1) * -this.$refs["slide-contents"]?.clientWidth}px)`
    },
    onDragStartSlider(e) {
      // TODO: 최초 드래그 X 좌표 저장
      this.startDragPoint = e.offsetX
      console.log('드래그 시작', e, e.offsetX)
    },
    onDragSlider(e) {
      console.log(e)
      // TODO: 드래그 시작시 저장한 값과 현재 값을 비교하며 translate 값 설정
    },
    onDropSlider(e) {
      let endDragPoint = e.offsetX
      // TODO: 드래그 드랍 시 slide-contents가 이동 혹은 복귀
      // 드래그 시작 X 좌표와 드랍 X 좌표를 비교
      // ??px 이상 이동하면 ++ / -- 적용 및 moveSliderPosition 함수 실행
      // ??px 이하 이동하면 바로 moveSliderPosition 함수 실행
      // console.log(e)
      if (this.startDragPoint > endDragPoint + 50 && this.currentIndex < this.maxIndex) {
        console.log('prev 작동해야 함')
        this.currentIndex ++;
      } else if (this.startDragPoint < endDragPoint + 50 && this.currentIndex > 1) {
        console.log('next 작동해야 함')
        this.currentIndex --;
      }
      this.moveSliderPosition()
      console.log('move 작동함')
    },
    onResizeBrowser() {
      // TODO: 브라우저 리사이즈시 slide-contents의 translateX 값 변경
    }
  }
}
</script>

<style scoped lang="scss">
$TOOL_BAR_SIZE: 50px;
$BUTTON_SIZE: 50px;

.image-slider{
  display: none;
  &.is-show{
    display: block;
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
      transition: color, background-color 0.15s;
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
      &:hover{
        color: #ffffff;
        background-color: rgba(255, 255, 255, 0.15);
      }
      &.is-disable{
        color: #666666;
        &:hover{
          color: #666666;
          background: transparent;
        }
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
      transition: transform 0.25s;
      &.is-drag{
        transition: none;
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
          cursor: grab;
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
</style>