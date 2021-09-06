<template>
  <home-view />
</template>

<script lang='ts'>
import Vue from 'vue';
import Component from 'vue-class-component';
import HomeView from '../components/views/HomeView.vue';

@Component({
  components: { HomeView }
})
export default class Home extends Vue {
  
}
</script>
