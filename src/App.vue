<template>
  <v-app>
    <v-app-bar app color="primary" dark>
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
          min-width="100"
          src="https://cdn.vuetifyjs.com/images/logos/vuetify-name-dark.png"
          width="100"
        />
      </div>

      <v-spacer></v-spacer>
    </v-app-bar>

    <v-main>
      <router-view />
    </v-main>
  </v-app>
</template>

<script lang="ts">
import Vue from "vue";
import { mapGetters } from "vuex";
import Store from "@/store/index";

export default Vue.extend({
  name: "App",

  data: () => ({
    //
  }),
  computed: {
    ...mapGetters("ApiModule", ["getApiUrl", "getApiKey"]),
  },
  async created() {
    Store.commit("ApiModule/updateApiUrl", process.env.VUE_APP_API_URL);
    Store.commit("ApiModule/updateApiKey", process.env.VUE_APP_API_KEY);
  },
});
</script>
