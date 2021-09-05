<template>
  <contacts-view/>
</template>

<script lang="ts">
import Vue from "vue";
import ContactsView from "../components/views/ContactsView.vue";

export default Vue.extend({
  name: "Contacts",

  components: {
    ContactsView
  },
});
</script>
