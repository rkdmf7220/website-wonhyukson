<template>
  <div class="wrap">
    <page-title/>
    <div class="profile">
      <h2>{{cv.profile.title}}</h2>
      <ul>
        <li v-for="(item, index) in cv.profile.items" :key="index">{{item}}</li>
      </ul>
    </div>
  </div>
</template>

<script>
import PageTitle from "../components/PageTitle";
export default {
  name: "CV",
  components: {PageTitle},
  computed: {
    cv() {
      return this.$store.state.cv
    }
  },
  mounted() {
    this.$store.dispatch('loadCv')
  }
}
</script>

<style scoped>

</style>