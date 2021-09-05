<template>
  <v-app>
    <app-bar />
    <v-main>
      <router-view />
    </v-main>
  </v-app>
</template>

<script lang="ts">
import Vue from "vue";
import { mapGetters } from "vuex";
import Store from "@/store/index";
import AppBar from "@/components/navigation/AppBar.vue";

export default Vue.extend({
  name: "App",
  components: {
    AppBar
  },
  data: () => ({
    //
  }),
  computed: {
    ...mapGetters("ApiModule", ["getApiUrl", "getApiKey"]),
  },
  created() {
    Store.commit("ApiModule/updateApiUrl", process.env.VUE_APP_API_URL);
    Store.commit("ApiModule/updateApiKey", process.env.VUE_APP_API_KEY);
  },
});
</script>
