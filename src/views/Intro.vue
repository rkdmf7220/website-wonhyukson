<template>
  <div class="wrap">
    <div class="video-wrap">
      <video src="/video/intro01.mp4" class="background-video" autoplay loop muted></video>
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
  name: "Intro"
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
    z-index: 99;

    .video-wrap{
      position: absolute;
      object-fit: cover;
      width: 100%;
      height: 100%;

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
        font-size: 2.25rem;
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
    }
  }
</style>