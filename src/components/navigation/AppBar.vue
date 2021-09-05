<template>  
  <v-app-bar app color="primary" dark>
    <div class="d-flex align-center">
      <v-img
        alt="Vuetify Logo"
        class="shrink mr-2"
        contain
        src="https://cdn.vuetifyjs.com/images/logos/vuetify-logo-dark.png"
        transition="scale-transition"
        width="40"
      />

      <v-img
        alt="Vuetify Name"
        class="shrink mt-1 hidden-sm-and-down"
        contain
        min-width="100"
        src="https://cdn.vuetifyjs.com/images/logos/vuetify-name-dark.png"
        width="100"
      />
    </div>

    <v-spacer></v-spacer>

    <v-menu left bottom>      
      <template v-slot:activator="{ on, attrs }">
        <v-btn v-bind="attrs" v-on="on" text>
          <span class="mr-2">Menu</span>
          <v-icon>mdi-dots-vertical</v-icon>
        </v-btn>
      </template>
      <v-list class="menu-lits">
        <v-list-item>
          <v-list-item-content>
            <v-list-item-title>
              <router-link to="/" class="menu-item">
                <v-icon>mdi-home</v-icon>
                Home
              </router-link>
            </v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
      <v-list class="menu-lits">
        <v-list-item>
          <v-list-item-content>
            <v-list-item-title>
              <router-link to="/Contacts" class="menu-item">
                <v-icon>mdi-account</v-icon>
                Contacts
              </router-link>
            </v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-menu>
  </v-app-bar>
</template>

<style>
.menu-list {
  width: 220px;
}
.menu-item {
  text-decoration: none !important;
  color: #9b9b9b;
  cursor: pointer;
}
.menu-link-list {
  width: 215px;
}
</style>

<script>
export default {
  name: "AppBar"
}
</script>
