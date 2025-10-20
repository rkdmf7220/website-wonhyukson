<template>
  <main class="wrap">
    <PageTitle/>
    <contents-with-filter />
  </main>
</template>

<script>
import PageTitle from "../components/PageTitle.vue";
import ContentsWithFilter from "../components/ContentsWithFilter.vue";

export default {
  name: "Sculpture",
  components: { ContentsWithFilter, PageTitle },
};
</script>

<style scoped lang="scss"></style>
