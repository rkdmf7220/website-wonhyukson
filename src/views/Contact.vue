<template>
  <div class="wrap">
    <page-title/>
    <h2>{{contact?.name}}안녕</h2>
    <div class="text-wrap">
      <p v-for="(info, index) in contact?.contactAddress" :key="index">{{info}}</p>
    </div>
    <img :src="contact.profileImage" alt="">
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

<style scoped>

</style>