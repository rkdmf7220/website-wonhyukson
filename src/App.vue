<template>
  <div id="app">
    <global-nav/>
    <router-view/>
  </div>
</template>

<style>
</style>
<script>
import GlobalNav from "./components/GlobalNav";
export default {
  components: {GlobalNav}
}
</script>