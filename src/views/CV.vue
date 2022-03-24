<template>
  <div class="wrap">
    <page-title/>
    <div class="profile">
      <ul>
        <li v-for="(item, index) in cv" :key="index">
          <h2>{{item.title}}</h2>
          <p v-for="(text, index) in item.items" :key="index">{{text}}</p>
        </li>
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

<style scoped lang="scss">
  ul{
    li{
      margin-bottom: 40px;
    }
  }
</style>