<template>
  <div class="wrap">
    <page-title/>
    <h2>{{contact?.name}}</h2>
    <div class="text-wrap">
      <p v-for="(info, index) in contact?.contactAddress" :key="index">{{info}}</p>
    </div>
    <div class="img-wrap">
      <img :src="contact.profileImage" alt="">
    </div>
  </div>
</template>

<script>
import PageTitle from "../components/PageTitle";
export default {
  name: "Contact",
  components: {PageTitle},
  computed: {
    contact() {
      return this.$store.state.contact
    }
  },
  mounted() {
    this.$store.dispatch('loadContact')
  }

}
</script>

<style scoped lang="scss">
  .wrap{
    min-height: calc(100vh - 256px);
    margin-bottom: 64px;

    h2 {
      font-size: 0.75em;
      line-height: 1.5em;
      font-weight: 700;
    }

    .text-wrap {
      p {
        font-size: 0.75em;
        line-height: 1.5em;
      }
    }

    .img-wrap {
      width: 100%;
      max-width: 1200px;

      img {
        width: 100%;
      }
    }
  }
  @media screen and (max-width: 767px) {
    .wrap {
      min-height: calc(calc(var(--vh, 1vh) * 100) - 176px);
    }
  }
</style>