<template>
  <div class="m-menu-wrap" :class="{active: this.isActive}">
    <ul>
      <li v-for="item in menu" :key="item.name" :class="item?.meta?.cssClass">
        <router-link :to="item.path" @click="closeMobileMenu">{{ item.name }}</router-link>
      </li>
      <li class="contact-wrap">
        <h4>Contact</h4>
        <div class="contact-icon-list">
          <div @click="onClickEmailIcon"
               :style="{backgroundImage: 'url(' + svgIcon.get('emailIcon', false, 'white') + ')'}"
               class="contact-icon-item contact-email-icon"></div>
          <a href="https://www.instagram.com/wonhyuk_son/"
             :style="{backgroundImage: 'url(' + svgIcon.get('instagramIcon', false, 'white') + ')'}"
             class="contact-icon-item contact-instagram-icon"></a>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
import svgIcon from "../../public/img/svgIcon";

export default {
  name: "MobileHamburgerMenu",
  computed: {
    svgIcon() {
      return svgIcon
    }
  },
  props: {
    isActive: Boolean
  },
  mounted() {
    this.menu = this.$router.options.gnb;
  },
  data() {
    return {
      menu: null
    }
  },
  methods: {
    closeMobileMenu() {
      this.$emit('removeClass')
    },
    onClickEmailIcon() {
      navigator.clipboard.writeText("xg6033@gmail.com")
      alert('이메일 주소가 복사되었습니다.')
    }
  }
}
</script>

<style scoped lang="scss">
.m-menu-wrap {
  display: none;
  width: 100%;
  height: 100%;
  position: fixed;
  z-index: 50;
  background: rgba(0, 0, 0, 0.7);
  backdrop-filter: blur(8px);
  opacity: 0;
  transition: all 0.3s;
  visibility: hidden;

  &.active {
    opacity: 1;
    visibility: visible;
  }

  ul {
    margin: 80px auto 0 auto;
    font-size: 1.15em;
    line-height: 1.3em;
    width: 80%;

    li {
      text-align: center;
      padding: 8px 0;

      &.margin-to-works {
        margin-top: 41px;
        position: relative;

        &::before {
          content: '';
          position: absolute;
          width: 60%;
          height: 1px;
          top: -20px;
          left: 20%;
          background-color: white;
        }
      }

      > a {
        color: white;
        padding: 8px 16px;
      }
    }

    .contact-wrap {
      margin-top: 24px;

      h4 {
        font-weight: 400;
        color: white;
      }

      .contact-icon-list {
        display: flex;
        flex-direction: row;
        justify-content: center;
        gap: 5px;

        .contact-icon-item {
          width: 32px;
          height: 32px;
          background-size: contain;
        }

        a {
          display: block;
        }
      }
    }
  }
}

@media screen and (max-width: 767px) {
  .m-menu-wrap {
    display: block;
  }
}
</style>