import axios from 'axios';
import { ContactRepository } from '@/../lib/repositories/contactRepository/index';
import { Contact } from '@/../lib/classes/contact';

async function createContact(data: Contact): Promise<any> {

  try {

    const response = await ContactRepository.createContact(data);
  
    return {
      isSuccess: true,
      status: response.status,
      data: new Contact(response.data)
    };
  } catch (error) {
    if (axios.isAxiosError(error)) {  
      return {
        isSuccess: false,
        status: error.code,
      };
    } else {
      throw new Error();
    }
  }
}

async function getContacts(): Promise<any> {

  try {

    const response = await ContactRepository.getContacts();
    let contacts: Contact[] = [];
  
    response.data.result.forEach((element: any) => {
      contacts.push(new Contact(element));    
    });

    contacts = contacts.sort(function(a,b) {
      if (a.firstName < b.firstName) {
        return -1
      }
      if (a.firstName > b.firstName) {
        return 1
      }
      return 0;
    });
  
    return {
      isSuccess: true,
      status: response.status,
      data: contacts
    };    
  } catch (error) {
    if (axios.isAxiosError(error)) {  
      return {
        isSuccess: false,
        status: error.code,
      };
    } else {
      throw new Error();
    }   
  }
}

async function updateContact(data: Contact): Promise<any> {

  try {

    const response = await ContactRepository.updateContact(data);
  
    return {
      isSuccess: true,
      status: response.status,
      data: new Contact(response.data)
    };
  } catch (error) {
    if (axios.isAxiosError(error)) {  
      return {
        isSuccess: false,
        status: error.code,
      };
    } else {
      throw new Error();
    }
  }
}

async function deleteContact(id: string): Promise<any> {

  try {

    const response = await ContactRepository.deleteContact(id);
  
    return {
      isSuccess: true,
      status: response.status,
    };    
  } catch (error) {
    if (axios.isAxiosError(error)) {  
      return {
        isSuccess: false,
        status: error.code,
      };
    } else {
      throw new Error();
    }   
  } 
}

export const contactService = {
  createContact,
  getContacts,
  updateContact,
  deleteContact,
}