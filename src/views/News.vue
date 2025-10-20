<template>
  <main class="wrap">
    <page-title />
    <contents-with-filter />
  </main>
</template>

<script>
import PageTitle from "../components/PageTitle.vue";
import ContentsWithFilter from "../components/ContentsWithFilter.vue";

export default {
  name: "News",
  components: { ContentsWithFilter, PageTitle },
  data() {
    return {};
  },
};
</script>

<style scoped></style>
