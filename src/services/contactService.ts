import axios from 'axios';
import { ContactRespository } from '@/../lib/respositories/contactRepository/index'
import { Contact } from '@/../lib/classes/contact'

const getContacts = async function(): Promise<unknown> {

  try {

    const response = await ContactRespository.getContacts();
    let contacts: Contact[] = [];
  
    response.data.result.forEach((element: unknown) => {
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
    })
  
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

export const contactService = {
  getContacts
}