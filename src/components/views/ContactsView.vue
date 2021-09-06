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

<script lang='ts'>
import Vue from 'vue';
import Component from 'vue-class-component';
import Store from '@/store/index';
import { contactService } from '@/services/contactService';
import ContactsWidget from '@/components/widgets/ContactsWidget.vue';

@Component({
  components: { ContactsWidget }
})
export default class ContactsView extends Vue{
  async created() {
    const response:any = await contactService.getContacts();
    Store.commit('ContactStore/updateContacts', response.data);
  }
}
</script>
