import { VuexModule, Module, Mutation } from 'vuex-module-decorators';
import { Contact } from '@/../lib/classes/contact';
import { ModuleOptions } from 'vuex-module-decorators/dist/types/moduleoptions';

@Module({ namespaced: true, name: 'contactStore' })
export default class ContactStore extends VuexModule {
  public selectedContact: null | Contact;
  public contacts: Contact[];
  public lookingUp: boolean;
  constructor() {
    super(<ModuleOptions>{});
    this.selectedContact = null;
    this.contacts = [];
    this.lookingUp = false;
  }
  @Mutation
  updateSelectedContact(contact: Contact): void {
    this.selectedContact = contact;
  }
  @Mutation
  removeSelectedContact(): void {
    this.selectedContact = null;
  }
  @Mutation
  updateContacts(contacts: Contact[]): void {
    this.contacts = contacts;
  }
  @Mutation
  removeContacts(): void {
    this.contacts = [];
  }
  @Mutation
  removeContact(id: string): void {
    const index = this.contacts.map(c => {return c.id}).indexOf(id);

    if (index !== -1) {
      this.contacts.splice(index, 1);
    }
  }
  @Mutation
  replaceContact(contact: Contact): void {
    const index = this.contacts.map(c => {return c.id}).indexOf(contact.id);

    if (index !== -1) {
      this.contacts.splice(index, 1, contact);
    } else {
      this.contacts.push(contact);
    }
  }
  @Mutation
  updateLookUp(lookUp: boolean): void {
    this.lookingUp = lookUp;
  }
  get getSelectedContact(): null | Contact {
    return this.selectedContact;
  }
  get getContacts(): Contact[] {
    return this.contacts;
  }
  get getLookUp(): boolean {
    return this.lookingUp;
  }
}