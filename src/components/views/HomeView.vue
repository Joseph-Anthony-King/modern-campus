<template>
  <v-container>
    <v-row class="text-center">
      <v-col cols="12">
        <v-img
          :src="require('../../assets/logo.svg')"
          class="my-3"
          contain
          height="200"
        />
      </v-col>

      <v-col class="mb-4">
        <h1 class="display-2 font-weight-bold mb-3">
          Welcome to Modern Campus:
        </h1>

        <h2 class="display-2 mb-3">
          Blue Book
        </h2>
        <p class="subheading font-weight-regular">
          Thank you for your consideration, please see my attached submission for my application with Modern Campus.
        </p>
        <p class="subheading font-weight-regular">
          This app uses <a href='https://vuejs.org/' target='_blank' class='home-link'>Vue.js</a> and 
          <a href='https://vuetifyjs.com/en/' target='_blank' class='home-link'>Vuetify</a> to provide 
          the benefits of using of a ready made <b>Javascript</b> framework for building web and mobile apps.  This app 
          will work in desktop and mobile views.
        </p>
        <p class="subheading font-weight-regular">
          Additionally, <a href='https://www.typescriptlang.org/' target='_blank' class='home-link'>Typescript</a>
          was used to provide the benefits of a strongly typed progamming language to assist with coding that still
          meets the requirement of programming within a subset of <b>Javascript</b>.
        </p>
        <p class="subheading font-weight-regular">
          This code is available on <a href='https://github.com/Joseph-Anthony-King/modern-campus' target='_blank' class='home-link'>GitHub</a>
          and can also be downloaded as a docker file using the following tag: <b>josephkingca/modern-campus:1.0</b>.
        </p>
        <p class="subheading font-weight-regular">
          This app has also been deployed to Heroku and can be review at the following 
          <a href='https://pacific-depths-84179.herokuapp.com/' target='_blank' class='home-link'>link</a>.
        </p>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'

@Component
export default class HomeView extends Vue {

}
</script>

<style scoped>
.home-link {
  text-decoration: none;
  color: #000;
  font-weight: bold;
}
</style>
