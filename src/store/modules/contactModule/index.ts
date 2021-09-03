import { VuexModule, Module, Mutation, Action } from 'vuex-module-decorators';
import { Contact } from "@/../lib/classes/contact";
import { ModuleOptions } from 'vuex-module-decorators/dist/types/moduleoptions';

@Module({ namespaced: true, name: 'ContactModule' })
export default class ContactModule extends VuexModule {
  public selectedContact: null | Contact;
  public contacts: Contact[];
  constructor() {
    super(<ModuleOptions>{});
    this.selectedContact = null;
    this.contacts = [];
  }
  @Mutation
  updateSelectedContact(contact: Contact) {
    this.selectedContact = contact;
  }
  @Mutation
  removeSelectedContact() {
    this.selectedContact = null;
  }
  get getSelectedContact() {
    return this.selectedContact;
  }
};