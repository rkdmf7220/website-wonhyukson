<template>
  <div class="wrap">
    <div class="video-wrap">
      <video src="/video/intro01.mp4" class="background-video" autoplay muted playsinline></video>
    </div>
    <div class="opening-wrap">
      <router-link to="/sculpture">
        <button>Enter</button>
      </router-link>
    </div>
  </div>
</template>

<script>
export default {
  name: "Intro",
  mounted() {
    document.querySelector('.background-video').addEventListener('ended', this.continueNextVideo);
  },
  data() {
    return{
      videoCount: 1
    }
  },
  methods: {
    continueNextVideo() {
      this.videoCount ++;
      if (this.videoCount > 2) {
        this.videoCount = 1;
      }
      let nextVideo = "/video/intro0"+this.videoCount+".mp4";
      let videoPlayer = document.querySelector('.background-video');
      videoPlayer.src = nextVideo;
      videoPlayer.play();
    }
  }
}
</script>

<style scoped lang="scss">
  .wrap{
    width: 100%;
    height: 100%;
    position: absolute;
    overflow: hidden;
    margin: 0;
    padding: 0;
    z-index: 100;
    background-color: #999;

    .video-wrap{
      position: absolute;
      object-fit: cover;
      width: 100%;
      height: 100%;
      background-color: #999;

      .background-video{
        width: 100%;
      }
    }

    .opening-wrap{
      position: absolute;
      width: 100%;
      height: 100%;
      display: flex;
      justify-content: center;
      align-items: center;

      button{
        border: 1px solid white;
        background-color: transparent;
        color: white;
        font-size: 2.25em;
        padding: 16px 32px;
        cursor: pointer;
        transition: 0.3s all;

        &:hover{
          background-color: white;
          color: black;
        }
      }
    }
  }
  
  @media screen and (max-aspect-ratio: 16/9) {
    .wrap{
      .video-wrap{
        .background-video {
          width: auto;
          height: 100%;
        }
      }

      .opening-wrap button{
        font-size: 2em;
      }
    }
  }
</style>