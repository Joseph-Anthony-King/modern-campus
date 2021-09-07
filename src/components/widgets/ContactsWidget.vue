<template>
  <div>
    <v-card elevation="6" class="mx-auto">
      <v-card-text>
        <v-container fluid>
          <v-card-title>
            <v-text-field
              v-model="search"
              append-icon="mdi-magnify"
              label="Search"
              single-line
              hide-details
            ></v-text-field>
          </v-card-title>
          <v-card-title>
            <v-select
              v-model="selectedFilter"
              :items="filters"
              item-text="label"
              item-value="value"
            ></v-select>
          </v-card-title>
          <v-data-table
            :headers="headers"
            :items="contacts"
            class="elevation-1"
            :search="search"
            v-model="selected"
            show-select
          >
            <template v-slot:[`item.name`]="{ item }">
              <td>                
                <v-gravatar :email="item.email" class="gravatar"/>
              </td>
            </template>

            <template v-slot:[`item.email`]="{ item }">
              <td>
                <v-icon
                  small
                  @click="emailContact(item.email)"
                  >
                  mdi-email
                </v-icon>
                {{ item.email }}
              </td>
            </template>
            
            <template v-slot:[`item.phone`]="{ item }">
              <td>
                <v-icon
                  small
                  @click="callContact(item.rawPhone)"
                  >
                  mdi-phone
                </v-icon>
                {{ item.phone }}
              </td>
            </template>
            
            <template v-slot:[`item.actions`]="{ item }">
              <v-tooltip bottom>
                <template v-slot:activator="{ on, attrs }">
                  <v-icon
                    small
                    class="mr-2"
                    @click="lookUpContact(item)"
                    v-bind="attrs"
                    v-on="on"
                    >
                    mdi-account
                  </v-icon>
                </template>
                <span>Review Contact Info for {{ item.fullName }}</span>
              </v-tooltip>
              <v-tooltip bottom>
                <template v-slot:activator="{ on, attrs }">
                  <v-icon
                    small
                    class="mr-2"
                    @click="editContact(item)"
                    v-bind="attrs"
                    v-on="on"
                    >
                    mdi-pencil
                  </v-icon>
                </template>
                <span>Edit {{ item.fullName }}</span>
              </v-tooltip>
              <v-tooltip bottom>
                <template v-slot:activator="{ on, attrs }">
                  <v-icon
                    small
                    @click="deleteContact(item)"
                    v-bind="attrs"
                    v-on="on"
                    >
                    mdi-delete
                  </v-icon>
                </template>
                <span>Delete {{ item.fullName }}</span>
              </v-tooltip>
            </template>
          </v-data-table>
        </v-container>
      </v-card-text>
      <hr />
      <v-card-title class="justify-center">Available Actions</v-card-title>
      <v-card-actions>
        <v-col class="text-center">
          <v-tooltip bottom>
            <template v-slot:activator="{ on, attrs }">
              <v-btn
                class="button-full"
                color="blue darken-1"
                text
                @click="addContact"
                v-bind="attrs"
                v-on="on"
              >
                Add Contact
              </v-btn>
            </template>
            <span>Add a New Contact</span>
          </v-tooltip>
        </v-col>
        <v-col class="text-center">
          <v-tooltip bottom>
            <template v-slot:activator="{ on, attrs }">
              <v-btn
                class="button-full"
                color="red darken-1"
                text
                @click="deleteSelected"
                v-bind="attrs"
                v-on="on"
                :disabled="selected.length === 0"
              >
                Delete Selected
              </v-btn>
            </template>
            <span>Delete Selected Contacts</span>
          </v-tooltip>          
        </v-col>
      </v-card-actions>
    </v-card>
  </div>  
</template>

<style scoped>
  .gravatar {
    max-height: 20px;
  }

</style>

<script lang='ts'>
import Vue from 'vue';
import Component from 'vue-class-component';
import { Watch } from 'vue-property-decorator';
import Store from '@/store/index';
import { mapGetters } from 'vuex';
import { Contact } from '@/../lib/classes/contact';
import { 
  deleteContactHelper, 
  deleteContactHelperCore,
  emailContactHelper,
  callContactHelper } from '@/helpers/contacts/contactHelper';
import { 
  ToastMethods, 
  showToast,
  actionToastOptions,
  defaultToastOptions } from '@/helpers/vue-toasted/toastHelper';

@Component({
  computed: { ...mapGetters('ContactStore',{
    getContacts: 'getContacts', 
    getSelectedContact: 'getSelectedContact'}) }
})
export default class ContactsWidget extends Vue {
  contacts: Contact[] = [];
  selected: Contact[] = [];
  getSelectedContact: any;
  getContacts: any;
  search = '';
  singleSelect = true;
  headers: Array<any> = [
    {
      text: "Profile Image",
      align: "start",
      filterable: true, 
      sortable: false,
      value: "name",
    },
    { 
      text: "First Name",
      filterable: true, 
      value: "firstName" },
    { 
      text: "Last Name", 
      filterable: true, 
      value: "lastName" },
    { 
      text: "Email", 
      filterable: true, 
      value: "email" },
    { 
      text: "Phone",
      filterable: false,
      sortable: false,
      value: "phone" },
    {
      text: "Actions",
      filterable: false,
      sortable: false,
      value: "actions"
    },
  ];
  filters = [
    {
      label: "All Fields ( First Name, Last Name, and Email )",
      value: 0
    },
    {
      label: "Filter by First Name",
      value: 1
    },
    {
      label: "Filter by Last Name",
      value: 2
    },
    {
      label: "Filter by Email",
      value: 3
    }
  ];
  selectedFilter = this.filters[0];

  addContact() {
    const contact = new Contact();
    this.$store.commit('ContactStore/updateLookUp', false);
    this.$store.commit('ContactStore/updateSelectedContact', contact);
  }
    
  editContact(contact: Contact) {
    this.$store.commit('ContactStore/updateLookUp', false);
    this.$store.commit('ContactStore/updateSelectedContact', contact);
  }

  lookUpContact(contact: Contact) {
    this.$store.commit('ContactStore/updateLookUp', true);
    this.$store.commit('ContactStore/updateSelectedContact', contact);
  }

  async deleteSelected() {
      const action = [
        {
          text: 'Yes',
          onClick: async (e, toastObject) => {
            toastObject.goAway(0);

            this.selected.forEach(async (contact) => {
              await deleteContactHelperCore(
                contact.id,
                null, 
                this);
            });
            this.$forceUpdate();

            showToast(
              this,
              ToastMethods['success'],
              "Selected contacts have been deleted",
              defaultToastOptions()
            );            
          },
        },
        {
          text: 'No',
          onClick: (e, toastObject) => {
            toastObject.goAway(0);
          },
        },
      ];

      const pronoun = this.selected.length === 1 ? 'this' : 'these';
      const contacts = this.selected.length === 1 ? 'contact' : 'contacts';

      showToast(
        this,
        ToastMethods['show'],
        `Are you sure you want to delete ${pronoun} selected ${contacts}?`,
        actionToastOptions(action, null)
      );
  }

  emailContact(email: string) {
    emailContactHelper(email);
  }

  callContact(phone: string) {
    callContactHelper(phone);
  }

  async deleteContact(contact: Contact) {
    await deleteContactHelper(
      contact.id,
      contact.fullName, 
      this);
  }

  @Watch('$store.state.ContactStore.contacts')
  onSelectedContactChanged(value: Contact[], oldValue: Contact[]) {
    this.contacts = value;
    this.$forceUpdate();
  }

  @Watch("contacts")
  onContactsChanged(value: Contact[], oldValue: Contact[]){
    if (value.length > 0) {
      Store.commit('AppStore/updatingProcessing', false);
    }
  }

  @Watch('selectedFilter')
  onSelectedFilterChanged(value: any, oldValue: any) {
    if (value === 0) {
      this.headers[1].filterable = true;
      this.headers[2].filterable = true;
      this.headers[3].filterable = true;
    } else if (value === 1) {
      this.headers[1].filterable = true;
      this.headers[2].filterable = false;
      this.headers[3].filterable = false;
    } else if (value === 2) {
      this.headers[1].filterable = false;
      this.headers[2].filterable = true;
      this.headers[3].filterable = false;
    } else {
      this.headers[1].filterable = false;
      this.headers[2].filterable = false;
      this.headers[3].filterable = true;
    }
  }

  created() {
    Store.commit('AppStore/updatingProcessing', true);
    this.contacts = this.getContacts;    
  }
}
</script>
