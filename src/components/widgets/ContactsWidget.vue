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
                  @click="phoneContact(item.rawPhone)"
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
                <span>Look Up Contact Information</span>
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
                <span>Edit the Contact Information</span>
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
                <span>Delete the Contact Information</span>
              </v-tooltip>
            </template>
          </v-data-table>
        </v-container>
      </v-card-text>
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
import Component from 'vue-class-component'
import { Watch } from 'vue-property-decorator'
import { mapGetters } from 'vuex';
import { Contact } from '@/../lib/classes/contact';
import { deleteContactHelper } from '@/helpers/contacts/contactHelper'

@Component({
  computed: { ...mapGetters('ContactStore',{
    getContacts: 'getContacts', 
    getSelectedContact: 'getSelectedContact'}) }
})
export default class ContactsWidget extends Vue {
  contacts: Contact[] = [];
  getContacts: any;
  selected: Contact[] = [];
  getSelectedContact: any;
  search = '';
  singleSelect = true;
  headers: Array<any> = [
    {
      text: "Profile Image",
      align: "start",
      sortable: false,
      value: "name",
    },
    { text: "First Name", value: "firstName" },
    { text: "Last Name", value: "lastName" },
    { text: "Email", value: "email" },
    { text: "Phone", value: "phone" },
    {
      text: "Actions",
      sortable: false,
      value: "actions"
    },
  ];
    
  editContact(contact: Contact) {
    this.$store.commit('ContactStore/updateLookUp', false);
    this.$store.commit('ContactStore/updateSelectedContact', contact);
  }

  lookUpContact(contact: Contact) {
    this.$store.commit('ContactStore/updateLookUp', true);
    this.$store.commit('ContactStore/updateSelectedContact', contact);
  }

  emailContact(email: string) {
    location.href = `mailto:${email}`;
  }

  phoneContact(phone: string) {
    location.href = `tel:${phone}`;
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

  created() {      
    this.contacts = this.getContacts;
  }
}
</script>
