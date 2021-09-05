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
            
            <template v-slot:[`item.actions`]="{ item }">
              <v-icon
                small
                class="mr-2"
                @click="editContact(item)"
                >
                mdi-pencil
              </v-icon>
                <v-icon
                small
                @click="deleteContact(item)"
                >
                mdi-delete
              </v-icon>
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

<script lang="ts">
  import { mapGetters } from "vuex";
  import { Contact } from "@/../lib/classes/contact"

  export default {
    name: "ContactsWidget",
    data: () => ({
      contacts: [],
      selected: [],
      search: "",
      singleSelect: true,
      headers: [
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
      ]
    }),
    methods: {
      editContact(contact: Contact) {
        this.$store.commit("ContactModule/updateSelectedContact", contact)
        console.log(this.getSelectedContact);
      },
      deleteContact(contact: Contact) {
        console.log("delete contact:",contact)
      },
    },
    computed: {
      ...mapGetters("ContactModule", ["getContacts", "getSelectedContact"])
    },
    created() {      
      this.$data.contacts = this.getContacts;
    }
  }
</script>
