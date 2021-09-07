<template>
  <v-card v-if='contact !== null && !processing'>
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
              @click="!dirty ? (dirty = true) : null"
              @focus="!dirty ? (dirty = true) : null"
              :readonly='lookUp'></v-text-field>
          </v-row>
          <v-row cols='12'>
            <v-text-field
              label='Last Name'
              v-model='contact.lastName'
              @click="!dirty ? (dirty = true) : null"
              @focus="!dirty ? (dirty = true) : null"
              :readonly='lookUp'></v-text-field>
          </v-row>
          <v-row cols='12'>
            <v-text-field
              label='Address'
              v-model='contact.address'
              @click="!dirty ? (dirty = true) : null"
              @focus="!dirty ? (dirty = true) : null"
              :readonly='lookUp'></v-text-field>            
          </v-row>
          <v-row cols='12'>
            <v-text-field
              label='Address 2'
              v-model='contact.address2'
              @click="!dirty ? (dirty = true) : null"
              @focus="!dirty ? (dirty = true) : null"
              :readonly='lookUp'></v-text-field>            
          </v-row>
          <v-row cols='12'>
            <v-text-field
              label='City'
              v-model='contact.city'
              @click="!dirty ? (dirty = true) : null"
              @focus="!dirty ? (dirty = true) : null"
              :readonly='lookUp'></v-text-field>            
          </v-row>
          <v-row cols='12'>
            <v-select
              label='State'
              v-model="contact.state"
              @click="!dirty ? (dirty = true) : null"
              @focus="!dirty ? (dirty = true) : null"
              :items='states'
              item-text='label'
              item-value='value'
              :readonly='lookUp'
            ></v-select>            
          </v-row>
          <v-row cols='12'>
            <v-text-field
              label='Zip Code'
              v-model='contact.zipcode'
              @click="!dirty ? (dirty = true) : null"
              @focus="!dirty ? (dirty = true) : null"
              :rules="zipcodeRules"
              :readonly='lookUp'></v-text-field>            
          </v-row>
          <v-row cols='12' v-if="lookUp">
            <v-text-field
              label='Email'
              v-model='contact.email'
              @click="!dirty ? (dirty = true) : null"
              @focus="!dirty ? (dirty = true) : null"
              :rules="emailRules"
              append-icon="mdi-email"
              @click:append="emailContact(contact.email)"
              readonly></v-text-field>            
          </v-row>
          <v-row cols='12' v-if="lookUp">
            <v-text-field
              label='Phone'
              v-model='contact.phone'
              @click="!dirty ? (dirty = true) : null"
              @focus="!dirty ? (dirty = true) : null"
              :rules="phoneRules"
              append-icon="mdi-phone"
              @click:append="callContact(contact.rawPhone)"
              readonly></v-text-field>
          </v-row>
          <v-row cols='12' v-if="!lookUp">
            <v-text-field
              label='Email'
              v-model='contact.email'
              @click="!dirty ? (dirty = true) : null"
              @focus="!dirty ? (dirty = true) : null"
              :rules="emailRules"
              required></v-text-field>            
          </v-row>
          <v-row cols='12' v-if="!lookUp">
            <v-text-field
              label='Phone'
              v-model='contact.rawPhone'
              @click="!dirty ? (dirty = true) : null"
              @focus="!dirty ? (dirty = true) : null"
              :rules="phoneRules"
              required></v-text-field>   
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
            :disabled="!contactFormIsValid && dirty"
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
import Store from '@/store/index';
import { mapGetters } from 'vuex';
import { Contact } from '@/../lib/classes/contact';
import { contactService } from '@/services/contactService';
import { 
  deleteContactHelper,
  emailContactHelper,
  callContactHelper } from '@/helpers/contacts/contactHelper';
import { 
  ToastMethods, 
  showToast,
  actionToastOptions,
  defaultToastOptions } from '@/helpers/vue-toasted/toastHelper';
import { Watch } from 'vue-property-decorator';

@Component({
  computed: { ...mapGetters('ContactStore',{
    getSelectedContact: 'getSelectedContact', 
    getLookUp: 'getLookUp'}),
    zipcodeRules() {
      const regex = /^\d{5}(?:[- ]?\d{4})?$/;
      return [
        (v: string) => !v || regex.test(v) || "Zip code must be valid"
      ];
    },
    emailRules() {
      const regex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return [
        (v: string) => !v || regex.test(v) || "Email must be valid"
      ];
    },
    phoneRules() {
      const regex = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;
      return [
        (v: string) => !v || regex.test(v) || "Phone must be valid"
      ];
    }
  }
})
export default class ContactForm extends Vue {
  contact: null | Contact = null;
  getSelectedContact: any;
  lookUp = false;
  getLookUp: any;
  contactFormIsValid = true;
  dirty = false;
  processing = false;
  states: Array<string> = [
    'AL', 'AK', 'AZ', 'AR', 'CA',
    'CO', 'CT', 'DE', 'FL', 'GA',
    'HI', 'ID', 'IL', 'IN', 'IA',
    'KS', 'KY', 'LA', 'ME', 'MD',
    'MA', 'MI', 'MN', 'MS', 'MO',
    'MT', 'NE', 'NV', 'NH', 'NJ',
    'NM', 'NY', 'NC', 'ND', 'OH',
    'OK', 'OR', 'PA', 'RI', 'SC',
    'SD', 'TN', 'TX', 'UT', 'VT',
    'VA', 'WA', 'WV', 'WI', 'WY'
  ];

  async addContact(): Promise<any> {
    if (this.contactFormIsValid) {
      const action = [
        {
          text: 'Yes',
          onClick: async (e, toastObject) => {
            toastObject.goAway(0);

            try {
              if (this.contact !== null) {
                this.processing = true;
                Store.commit('AppStore/updatingProcessing', this.processing);

                let filteredPhoneNumber = '';

                this.contact.rawPhone.split('').forEach(char => {
                  if (char !== ' ' && !isNaN(Number(char))) {
                    filteredPhoneNumber += char;
                  }              
                });

                this.contact.rawPhone = filteredPhoneNumber;
                
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
            } finally {
              this.processing = false;
              Store.commit('AppStore/updatingProcessing', this.processing);
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
                this.processing = true;
                Store.commit('AppStore/updatingProcessing', this.processing);

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
            } finally {
              this.processing = false;
              Store.commit('AppStore/updatingProcessing', this.processing);
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
        `Do you want to update ${this.contact?.fullName}?`,
        actionToastOptions(action, null)
      );
    }
  }
  
  async deleteContact(): Promise<void> {    
    if (this.contact !== null) {
    
      await deleteContactHelper(
            this.contact.id,
            this.contact.fullName, 
            this); 

    }    
    this.closeContactForm();
  } 

  emailContact(email: string) {
    emailContactHelper(email);
  }

  callContact(phone: string) {
    callContactHelper(phone);
  }

  closeContactForm(): void {
    this.contact = null;
    console.log("contact:", this.contact)
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

  @Watch('$store.state.ContactStore.selectedContact')
  onSelectContactChanged(value: null | Contact, oldVlaue: null | Contact) {
    this.contact = value;
  }

  @Watch('$store.state.ContactStore.lookingUp')
  onLookUpChanged(value: boolean, oldVlaue: boolean) {
    this.lookUp = value;
  }

  created() {
    this.contact = this.getSelectedContact
    this.lookUp = this.getLookUp;
  }
}
</script>
