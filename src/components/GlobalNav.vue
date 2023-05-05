<template>
  <div id="nav" v-if="this.$route.name !== 'Intro'">
    <router-link to="/main" class="logo">Wonhyuk Son</router-link>
    <ul>
      <li v-for="item in menu" :key="item.name" :class="item?.meta?.cssClass">
        <router-link :to="item.path">{{ item.name }}</router-link>
      </li>
      <li class="contact-wrap margin-to-infos">
        <h4>Contact</h4>
        <div class="contact-icon-list">
          <div @click="onClickEmailIcon" :style="{backgroundImage: 'url(' + svgIcon.get('emailIcon') + ')'}" class="contact-icon-item contact-email-icon"></div>
          <a :style="{backgroundImage: 'url(' + svgIcon.get('instagramIcon') + ')'}" href="https://www.instagram.com/wonhyuk_son/"  target="_blank" class="contact-icon-item contact-instagram-icon"></a>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
import svgIcon from "../../public/img/svgIcon";
export default {
  name: "GlobalNav",
  computed: {
    svgIcon() {
      return svgIcon
    }
  },
  mounted() {
    this.menu = this.$router.options.gnb;
  },
  data() {
    return {
      menu: []
    }
  },
  methods: {
     onClickEmailIcon() {
       navigator.clipboard.writeText("xg6033@gmail.com")
       alert('이메일 주소가 복사되었습니다.')
     }
  }
}
</script>

<style scoped lang="scss">
#nav {
  width: 240px;
  height: 100vh;
  position: fixed;
  top: 0;
  left: 0;
  padding: 100px 0 0 32px;
  box-sizing: border-box;
  z-index: 99;

  .logo {
    font-weight: 700;
    font-size: 1.25em;
    line-height: 1.4em;
    padding: 16px;
    display: inline-block;
  }

  ul {
    font-size: 1em;
    margin-top: 16px;

    li > a {
      padding-left: 16px;
      padding-bottom: 12px;
      line-height: 1.25em;
      display: block;
    }

    .contact-wrap {
      padding-left: 13px;
      display: flex;
      flex-direction: column;

      h4 {
        padding-left: 3px;
        line-height: 1.25em;
        font-weight: 400;
      }

      .contact-icon-list {
        display: flex;
        flex-direction: row;

        .contact-icon-item {
          width: 30px;
          height: 30px;
          background-size: contain;
          cursor: pointer;

          &.contact-email-icon {
            margin-right: 5px;
          }
        }
      }
    }

    .margin-to-works, .margin-to-infos {
      margin-top: 48px;
    }
  }
}

@media screen and (max-width: 767px) {
  #nav {
    display: none;
  }
}
</style>