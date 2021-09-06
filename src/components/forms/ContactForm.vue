<template>
  <v-card v-if='contact !== null'>
    <v-card-title>
      <span class='headline'>{{ widgetTitle }}</span>
    </v-card-title>
    <v-form v-model='contactFormIsValid' ref='contactForm'>
      <v-card-text>
        <v-container>
          <v-row cols='12'>
            <v-text-field
              label='First Name'
              v-model='contact.firstName'
              required
              :readonly='lookUp'></v-text-field>
          </v-row>
          <v-row cols='12'>
            <v-text-field
              label='Last Name'
              v-model='contact.lastName'
              required
              :readonly='lookUp'></v-text-field>
          </v-row>
          <v-row cols='12'>
            <v-text-field
              label='Address'
              v-model='contact.address'
              required
              :readonly='lookUp'></v-text-field>            
          </v-row>
          <v-row cols='12'>
            <v-text-field
              label='Address 2'
              v-model='contact.address2'
              required
              :readonly='lookUp'></v-text-field>            
          </v-row>
          <v-row cols='12'>
            <v-text-field
              label='City'
              v-model='contact.city'
              required
              :readonly='lookUp'></v-text-field>            
          </v-row>
          <v-row cols='12'>
            <v-text-field
              label='State'
              v-model='contact.state'
              required
              :readonly='lookUp'></v-text-field>            
          </v-row>
          <v-row cols='12'>
            <v-text-field
              label='Zip Code'
              v-model='contact.zipcode'
              required
              :readonly='lookUp'></v-text-field>            
          </v-row>
          <v-row cols='12'>
            <v-text-field
              label='Email'
              v-model='contact.email'
              required
              :readonly='lookUp'></v-text-field>            
          </v-row>
          <v-row cols='12'>
            <v-text-field
              label='Phone'
              v-model='displayPhone'
              required
              :readonly='lookUp'></v-text-field>            
          </v-row>
        </v-container>
      </v-card-text>
    </v-form>
    <v-card-actions>
      <v-spacer></v-spacer>
      <v-tooltip bottom v-if='!lookUp && contact.id === ""'>
        <template v-slot:activator='{ on, attrs }'>
          <v-btn
            class='button-full'
            color='blue darken-1'
            text
            @click='addContact'
            v-bind='attrs'
            v-on='on'
          >
            Add
          </v-btn>
        </template>
        <span>Add the Contact</span>
      </v-tooltip>
      <v-tooltip bottom v-if='!lookUp && contact.id !== ""'>
        <template v-slot:activator='{ on, attrs }'>
          <v-btn
            class='button-full'
            color='blue darken-1'
            text
            @click='updateContact'
            v-bind='attrs'
            v-on='on'
          >
            Update
          </v-btn>
        </template>
        <span>Update the Contact</span>
      </v-tooltip>
      <v-tooltip bottom v-if='!lookUp && contact.id !== ""'>
        <template v-slot:activator='{ on, attrs }'>
          <v-btn
            class='button-full'
            color='red darken-1'
            text
            @click='deleteContact'
            v-bind='attrs'
            v-on='on'
          >
            Delete
          </v-btn>
        </template>
        <span>Delete the Contact</span>
      </v-tooltip>
      <v-tooltip bottom>
        <template v-slot:activator='{ on, attrs }'>
          <v-btn
            class='button-full'
            color='blue darken-1'
            text
            @click='closeContactForm'
            v-bind='attrs'
            v-on='on'
          >
            Close
          </v-btn>
        </template>
        <span>Close the Contact Form</span>
      </v-tooltip>
    </v-card-actions>
  </v-card>
</template>

<script lang='ts'>
/* eslint-disable no-unused-vars */
import Vue from 'vue';
import Component from 'vue-class-component';
import { Watch } from 'vue-property-decorator';
import { mapGetters } from 'vuex';
import Store from '@/store/index';
import { Contact } from '@/../lib/classes/contact';
import { contactService } from '@/services/contactService';
import { deleteContactHelper } from '@/helpers/contacts/contactHelper';
import { 
  ToastMethods, 
  showToast,
  actionToastOptions,
  defaultToastOptions } from '@/helpers/vue-toasted/toastHelper';

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

  async addContact(): Promise<any> {
    console.log(this.contact);
    if (this.contactFormIsValid) {
      const action = [
        {
          text: 'Yes',
          onClick: async (e, toastObject) => {
            toastObject.goAway(0);

            try {
              if (this.contact !== null) {
                let filteredPhoneNumber = '';

                this.contact.rawPhone.split('').forEach(char => {
                  if (char !== ' ' && !isNaN(Number(char))) {
                    filteredPhoneNumber += char;
                  }              
                });

                this.contact.rawPhone = filteredPhoneNumber;

                console.log("filteredPhoneNumber:",filteredPhoneNumber);
                console.log("this.contact.rawPhone:",this.contact.rawPhone);

                console.log("new contact:",this.contact);
                
                var response: any = await contactService.createContact(this.contact);

                this.contact = response.data;

                Store.commit('ContactStore/addContact', this.contact);

                showToast(
                  this,
                  ToastMethods['success'],
                  `${response.data.fullName} has been added`,
                  defaultToastOptions()
                );

                this.closeContactForm();

              } else {

                showToast(
                  this,
                  ToastMethods['error'],
                  'Contact is null',
                  defaultToastOptions()
                );
              }
              
            } catch (error) {

              showToast(
                this,
                ToastMethods['error'],
                error,
                defaultToastOptions()
              );              
            }
          },
        },
        {
          text: 'No',
          onClick: (e, toastObject) => {
            toastObject.goAway(0);
          },
        },
      ];

      showToast(
        this,
        ToastMethods['show'],
        `Do you want to create this contact for ${this.contact?.fullName}?`,
        actionToastOptions(action, null)
      );
    }
  }

  async updateContact(): Promise<any> {
    if (this.contactFormIsValid) {
      const action = [
        {
          text: 'Yes',
          onClick: async (e, toastObject) => {
            toastObject.goAway(0);

            try {
              if (this.contact !== null) {
                let filteredPhoneNumber = '';

                this.contact.rawPhone.split('').forEach(char => {
                  if (char !== ' ' && !isNaN(Number(char))) {
                    filteredPhoneNumber += char;
                  }              
                });

                this.contact.rawPhone = filteredPhoneNumber;
                
                var response: any = await contactService.updateContact(this.contact);

                this.contact = response.data;

                Store.commit('ContactStore/replaceContact', this.contact);

                showToast(
                  this,
                  ToastMethods['success'],
                  `${response.data.fullName} has been updated`,
                  defaultToastOptions()
                );

                this.closeContactForm();

              } else {

                showToast(
                  this,
                  ToastMethods['error'],
                  'Contact is null',
                  defaultToastOptions()
                );
              }
              
            } catch (error) {

              showToast(
                this,
                ToastMethods['error'],
                error,
                defaultToastOptions()
              );              
            }
          },
        },
        {
          text: 'No',
          onClick: (e, toastObject) => {
            toastObject.goAway(0);
          },
        },
      ];

      showToast(
        this,
        ToastMethods['show'],
        'Do you want to submit this contact for an update?',
        actionToastOptions(action, null)
      );
    }
  }

  async deleteContact(): Promise<void> {
    if (this.contactFormIsValid && this.contact !== null) {
      const result = await deleteContactHelper(
        this.contact.id,
        this.contact.fullName, 
        this);
        
      if (result) {
        this.closeContactForm();
      }
    }
  }

  closeContactForm(): void {
    this.$emit('close-contact-form-event', null, null);
  }

  get widgetTitle(): string {
    if (!this.lookUp && this.contact !== null && this.contact.id !== '') {
      return 'Edit Contact';
    } else if (!this.lookUp && this.contact !== null && this.contact.id === '') {
      return 'New Contact';
    } else {
      return 'Contact Information'
    }
  }

  get displayPhone(): string {
    if (!this.lookUp && this.contact !== null && this.contact.id !== '') {
      return this.contact.rawPhone;
    } else if (!this.lookUp && this.contact !== null && this.contact.id === '') {
      return this.contact.rawPhone;
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
      this.contact.rawPhone = value;
    } else if (!this.lookUp && this.contact !== null && this.contact.id === '') {
      this.contact.rawPhone = value;
    } else {
      if (this.contact !== null) {
        this.contact.phone = value;
      } else {
        console.log("contact is null:", value);
      }
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
  }
}
</script>

<style>

</style>