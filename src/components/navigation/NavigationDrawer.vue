<template>
  <v-navigation-drawer
    app
    color="secondary"
    :value="navDrawerStatus"
  >
    <v-list>
      <v-list-item>
        <v-list-item-content>
          <v-icon x-large color="white">mdi-account-circle</v-icon>
        </v-list-item-content>
      </v-list-item>
      <v-container class="navigation-status-indicator">
        <span class="user-profile-subscript">Welcome to Blue Book</span>
      </v-container>
    </v-list>
    <v-list>
      <v-list-item>
        <v-list-item-content>
          <v-list-item-title>
            <v-icon class="white--text">mdi-home</v-icon>
            <router-link to="/" class="nav-drawer-item">
              Home
            </router-link>
          </v-list-item-title>
        </v-list-item-content>
      </v-list-item>
      <v-list-item>
        <v-list-item-content>
          <v-list-item-title>
            <v-icon class="white--text">mdi-account</v-icon>
            <router-link to="/Contacts" class="nav-drawer-item">
              Contacts
            </router-link>
          </v-list-item-title>
        </v-list-item-content>
      </v-list-item>
    </v-list>
  </v-navigation-drawer>
</template>

<script lang='ts'>
import Vue from 'vue';
import Component from 'vue-class-component';
import { Prop } from 'vue-property-decorator';

@Component
export default class NavigationDrawer extends Vue {
  
  @Prop(Boolean) navDrawerStatus: boolean | undefined;
}
</script>

<style scoped>
.nav-drawer-item {
  font-weight: bold;
  text-decoration: none !important;
  color: #ffffff;
}
.user-profile-item {
  font-weight: bold;
  text-decoration: none !important;
  text-transform: uppercase;
  text-align: center;
  color: #ffffff;
}
.user-profile-subscript {
  font-size: large;
  text-align: center;
  color: #ffffff;
}
.navigation-status-indicator {
  text-align: center;
  padding: 0;
  margin: 0;
}

.white--text {
  padding-right: 10px;
  padding-bottom: 5px;
}
</style>