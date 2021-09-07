<template>  
  <v-app-bar app color="primary" dark>
    <v-app-bar-nav-icon
      class="nav-bar-icon-status"
      @click.stop="updateNavDrawerStatus"
    ></v-app-bar-nav-icon>
    <div class="d-flex align-center">
      <v-img
        alt="Vuetify Logo"
        class="shrink mr-2"
        contain
        src="https://cdn.vuetifyjs.com/images/logos/vuetify-logo-dark.png"
        transition="scale-transition"
        width="40"
      />

      <v-img
        alt="Vuetify Name"
        class="shrink mt-1 hidden-sm-and-down"
        contain
        min-width="400"
        src="/images/blue-book-logo.png"
        width="400"
      />
    </div>

    <v-spacer></v-spacer>

  </v-app-bar>
</template>

<script lang='ts'>
import Vue from 'vue';
import Component from 'vue-class-component';

@Component
export default class AppBar extends Vue {

  updateNavDrawerStatus() {
    this.$emit("update-nav-drawer-status", null, null);
  }
}
</script>

<style scoped>
@media only screen and (min-width: 1367px) {
  .nav-bar-icon-status {
    display: none;
  }
}
</style>
