<template>
  <v-app>
    <app-bar />
    <v-main>
      <router-view />
    </v-main>
    <v-dialog v-model="editContact" persistent max-width="800px">
      <contact-form
        v-on:close-contact-form-event="closeContactForm" />
    </v-dialog>
  </v-app>
</template>

<script lang='ts'>
import Vue from 'vue';
import Component from 'vue-class-component';
import { Watch } from 'vue-property-decorator';
import { mapGetters } from 'vuex';
import Store from '@/store/index';
import AppBar from '@/components/navigation/AppBar.vue';
import ContactForm from '@/components/forms/ContactForm.vue'
import { Contact } from '@/../lib/classes/contact';

@Component({
  components: { AppBar, ContactForm },
  computed: { ...mapGetters('ApiStore', {
    getApiUrl: 'getApiUrl', 
    getApiKey: 'getApiKey'})
  }
})
export default class App extends Vue {
  editContact = false
  
  closeContactForm(): void {
    this.editContact = false;
    Store.commit('ContactStore/updateSelectedContact', null);
    Store.commit('ContactStore/updateLookUp', false);
  }
  
  @Watch('$store.state.ContactStore.selectedContact')
  onSelectContactChanged(value: null | Contact, oldVlaue: null | Contact) {
    if (value !== null){
      this.$data.editContact = true;
    }
  }
  
  created() {
    Store.commit('ApiStore/updateApiUrl', process.env.VUE_APP_API_URL);
    Store.commit('ApiStore/updateApiKey', process.env.VUE_APP_API_KEY);
  }
}
</script>
