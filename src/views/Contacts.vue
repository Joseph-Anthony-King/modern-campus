<template>
  <contacts-view/>
</template>

<script lang='ts'>
import Vue from 'vue';
import Component from 'vue-class-component';
import ContactsView from '../components/views/ContactsView.vue';

@Component({
  components: { ContactsView }
})
export default class Contact extends Vue {
  
}
</script>
