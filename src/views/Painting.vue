<template>
  <div class="wrap">
    <page-title />
    <contents-with-filter />
  </div>
</template>

<script>
import PageTitle from "../components/PageTitle";
import ContentsWithFilter from "../components/ContentsWithFilter.vue";

export default {
  name: "Painting",
  components: { ContentsWithFilter, PageTitle },
};
</script>

<style scoped></style>
