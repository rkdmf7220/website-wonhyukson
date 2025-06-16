<template>
  <div class="wrap">
    <page-title />
    <contents-with-filter />
  </div>
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
