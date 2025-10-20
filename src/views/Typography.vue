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
  name: "Typography",
  components: { ContentsWithFilter, PageTitle },
};
</script>

<style scoped></style>
