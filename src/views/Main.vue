<template>
  <div class="wrap">
    <PageTitle v-if="!isTouchDevice" />
    <div
      :style="{ backgroundImage: 'url(img/main/01' + isTouchDevice + '.jpg)' }"
      class="spot"
    ></div>
    <div class="contents">
      <div class="exhibition">
        <router-link to="/archives">
          <h4 class="title">{{ isKorean ? "전시" : "EXHIBITIONS" }}</h4>
          <span
            :style="{
              backgroundImage: 'url(' + svgIcon.get('rightArrowIcon') + ')',
            }"
            class="right-arrow"
          ></span>
        </router-link>
        <ul>
          <li v-for="item in exhibitionListData" :key="item.id">
            <GalleryListItem :item-data="item" />
          </li>
        </ul>
      </div>
      <div class="news">
        <router-link to="/news">
          <h4 class="title">{{ isKorean ? "소식" : "NEWS" }}</h4>
          <span
            :style="{
              backgroundImage: 'url(' + svgIcon.get('rightArrowIcon') + ')',
            }"
            class="right-arrow"
          ></span>
        </router-link>
        <ul>
          <li v-for="item in newsListData" :key="item.id">
            <GalleryListItem :item-data="item" />
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import PageTitle from "../components/PageTitle.vue";
import GalleryListItem from "../components/GalleryListItem.vue";
import svgIcon from "../../public/img/svgIcon";
import {useStore} from "../stores/index.js";

export default {
  name: "Main",
  components: { GalleryListItem, PageTitle },
  computed: {
    svgIcon() {
      return svgIcon;
    },
    isTouchDevice() {
      return navigator.maxTouchPoints ||
        "ontouchstart" in document.documentElement
        ? "_m"
        : "";
    },
    isKorean() {
      return useStore().lang === "kr";
    },
    exhibitionListData() {
      let list = useStore().worksList;
      let filtered = list
        .filter((work) => work.type === "archives")
        .slice(0, 4);
      return list ? filtered : [];
    },
    newsListData() {
      let list = useStore().worksList;
      let filtered = list.filter((work) => work.type === "news").slice(0, 4);
      return list ? filtered : [];
    },
  },
  mounted() {
    // useStore().loadWorksList();
  },
};
</script>

<style lang="scss" scoped>
.wrap {
  margin: 0;
  position: relative;

  .spot {
    width: 100%;
    height: 100vh;
    background-position-x: center;
    background-size: cover;
  }

  .contents {
    width: calc(100% - 80px);
    padding: 80px 0 80px 240px;
    box-sizing: border-box;
    background-color: white;

    .exhibition {
      padding-bottom: 80px;
    }

    a {
      display: inline-block;
      padding: 8px 0;
      margin-bottom: 20px;

      .title {
        display: inline-block;
        font-size: 1.25em;
        font-weight: 700;
      }

      .right-arrow {
        display: inline-block;
        width: 8px;
        height: 1em;
        margin-left: 5px;
        background-position-y: center;
        background-repeat: no-repeat;
      }
    }

    ul {
      display: flex;
      flex-direction: row;
      flex-wrap: wrap;

      li {
        width: 23%;
        margin-right: 2%;
        margin-bottom: 40px;
      }
    }
  }
}

@media screen and (min-width: 1921px) {
  .contents {
    ul {
      li {
        width: 18%;
      }
    }
  }
}

@media screen and (max-width: 1023px) {
  .contents {
    ul {
      li {
        width: 48%;
      }
    }
  }
}

@media screen and (max-width: 767px) {
  .wrap {
    padding: 0;

    .spot {
      max-height: calc(calc(var(--vh, 1vh) * 92));
    }

    .contents {
      width: 100%;
      padding: 32px 16px 0 16px;

      .exhibition {
        padding-bottom: 40px;
      }

      ul {
        li {
          width: 49%;
          margin-right: 0;
          margin-bottom: 64px;
          &:nth-child(odd) {
            margin-right: 2%;
          }
        }
      }
    }
  }
}
</style>
