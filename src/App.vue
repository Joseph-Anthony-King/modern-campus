<template>
  <v-app>
    <v-overlay :value="getProcessing">
      <v-progress-circular
        indeterminate
        color="primary"
        :size="100"
        :width="10"
        class="progress-circular"
      ></v-progress-circular>
    </v-overlay>
    <navigation-drawer
      :navDrawerStatus="navDrawerStatus" />
    <app-bar
      v-on:update-nav-drawer-status="updateNavDrawer" />
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
import Store from '@/store/index';
import AppBar from '@/components/navigation/AppBar.vue';
import NavigationDrawer from '@/components/navigation/NavigationDrawer.vue';
import ContactForm from '@/components/forms/ContactForm.vue'
import { Contact } from '@/../lib/classes/contact';

@Component({
  components: { AppBar, ContactForm, NavigationDrawer }
})
export default class App extends Vue {
  editContact = false;
  navDrawerStatus: null | boolean = null;
  getProcessing: null | boolean = false;
  
  closeContactForm(): void {
    this.editContact = false;
    this.getProcessing = false;
    Store.commit('ContactStore/updateSelectedContact', null);
    Store.commit('ContactStore/updateLookUp', false);
  }

  updateNavDrawer() {
    this.navDrawerStatus = this.navDrawerStatus ? false : true;
  }

  @Watch('$store.state.ContactStore.selectedContact')
  onSelectContactChanged(value: null | Contact, oldVlaue: null | Contact) {
    if (value !== null){
      this.editContact = true;
    } else {
      this.editContact = false;
    }
  }

  @Watch('$store.state.AppStore.processing')
  onProcessingChanged(value: boolean | null) {
    this.getProcessing = value;
  }
}
</script>
