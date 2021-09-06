<template>
  <v-card v-if="contact !== null">
    <v-card-title>
      <span class="headline">{{ widgetTitle }}</span>
    </v-card-title>
    <v-form v-model="contactFormIsValid" ref="contactForm">
      <v-card-text>
        <v-container>
          <v-row cols="12">
            <v-text-field
              label="First Name"
              v-model="contact.firstName"
              required
              :readonly="lookUp"></v-text-field>
          </v-row>
          <v-row cols="12">
            <v-text-field
              label="Last Name"
              v-model="contact.lastName"
              required
              :readonly="lookUp"></v-text-field>
          </v-row>
          <v-row cols="12">
            <v-text-field
              label="Address"
              v-model="contact.address"
              required
              :readonly="lookUp"></v-text-field>            
          </v-row>
          <v-row cols="12">
            <v-text-field
              label="Address 2"
              v-model="contact.address2"
              required
              :readonly="lookUp"></v-text-field>            
          </v-row>
          <v-row cols="12">
            <v-text-field
              label="City"
              v-model="contact.city"
              required
              :readonly="lookUp"></v-text-field>            
          </v-row>
          <v-row cols="12">
            <v-text-field
              label="State"
              v-model="contact.state"
              required
              :readonly="lookUp"></v-text-field>            
          </v-row>
          <v-row cols="12">
            <v-text-field
              label="Zip Code"
              v-model="contact.zipcode"
              required
              :readonly="lookUp"></v-text-field>            
          </v-row>
          <v-row cols="12">
            <v-text-field
              label="Email"
              v-model="contact.email"
              required
              :readonly="lookUp"></v-text-field>            
          </v-row>
          <v-row cols="12">
            <v-text-field
              label="Phone"
              v-model="displayPhone"
              required
              :readonly="lookUp"></v-text-field>            
          </v-row>
        </v-container>
      </v-card-text>
    </v-form>
    <v-card-actions>
      <v-spacer></v-spacer>
      <v-tooltip bottom>
        <template v-slot:activator="{ on, attrs }">
          <v-btn
            class="button-full"
            color="blue darken-1"
            text
            @click="closeContactForm"
            v-bind="attrs"
            v-on="on"
          >
            Close
          </v-btn>
        </template>
        <span>Close the Contact Form</span>
      </v-tooltip>
    </v-card-actions>
  </v-card>
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';
import { Watch } from 'vue-property-decorator';
import { mapGetters } from 'vuex';
import { Contact } from '@/../lib/classes/contact';

@Component({
  computed: { ...mapGetters('ContactStore',{
    getSelectedContact: 'getSelectedContact', 
    getLookUp: 'getLookUp'}) }
})
export default class ContactForm extends Vue {
  contact: null | Contact = null;
  getSelectedContact: any;
  lookUp = false;
  getLookUp: any;
  contactFormIsValid = true;

  closeContactForm() {
    this.$emit('close-contact-form-event', null, null);
  }

  get widgetTitle(): string {
    if (!this.lookUp && this.contact !== null && this.contact.id !== '') {
      return 'Edit Contact';
    } else {
      return 'Contact Information'
    }
  }

  get displayPhone(): string {
    if (!this.lookUp && this.contact !== null && this.contact.id !== '') {
      return this.contact.rawPhone
    } else {
      if (this.contact !== null) {
        return this.contact.phone;
      } else {
        return '';
      }
    }
  }

  set displayPhone(value: string) {
    if (!this.lookUp && this.contact !== null && this.contact.id !== '') {
      this.contact.rawPhone = value
    }
  }

  @Watch('$store.state.ContactStore.selectedContact')
  onSelectedContactChanged(value: Contact | null, oldValue: Contact | null) {
    this.contact = value;
    this.$forceUpdate();
  }

  @Watch('$store.state.ContactStore.lookingUp')
  onLookingUpChanged(value: boolean, oldValue: boolean) {
    this.lookUp = value;
    this.$forceUpdate();
  }

  created() {
    this.contact = this.getSelectedContact;
    this.lookUp = this.getLookUp;
    console.log(this.$data.contact);
  }
}
</script>

<style>

</style>