<template>
  <v-container fluid>
    <v-card elevation="6" class="mx-auto">
      <v-card-text>
        <v-container fluid>
          <v-card-title class="justify-center"
            >Contacts</v-card-title
          >
        </v-container>
        <contacts-widget />
      </v-card-text>
    </v-card>
  </v-container>  
</template>

<script lang="ts">
  import Vue from 'vue'
  import Store from "@/store/index";
  import { contactService } from '@/services/contactService'
  import ContactsWidget from '@/components/widgets/ContactsWidget.vue'

  export default Vue.extend({
    name: "ContactsView",
    components: {
      ContactsWidget
    },
    async created() {
      const response:any = await contactService.getContacts();
      Store.commit("ContactModule/updateContacts", response.data)
      console.log(response)
    }
  })
</script>

<style>

</style>