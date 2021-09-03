<template>
  <home-view />
</template>

<script lang="ts">
import Vue from "vue";
import HomeView from "../components/HomeView.vue";

export default Vue.extend({
  name: "Home",

  components: {
    HomeView,
  },
});
</script>
