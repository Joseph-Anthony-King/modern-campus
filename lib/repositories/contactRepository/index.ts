import axios from 'axios';
import { 
  getContactEndpoint, 
  getContactsEndpoint, 
  createContactEndpoint,
  updateContactEndpoint,
  deleteContactEndpoint } from './endpoints';
import { Contact } from '../../classes/contact'

const getContact = async function(id: string): Promise<any> {
  try {
    const apikey = process.env.VUE_APP_API_KEY;
    const params = `?apikey=${apikey}&id=${id}`;
    const response = await axios({
      method: 'get',
      url: `${getContactEndpoint}${params}`,
      headers: {
        "Content-Type": "application/json",
        "Accept":"*/*"
      }
    });
    return response;
  } catch (error) {
    return error;
  }
};

const getContacts = async function (): Promise<any> {
  try {
    const apikey = process.env.VUE_APP_API_KEY;
    const params = `?apikey=${apikey}`;
    const response = await axios({
      method: 'get',
      url: `${getContactsEndpoint}${params}`,
      headers: {
        "Content-Type": "application/json",
        "Accept":"*/*"
      }
    });
    console.log('getContacts response:', response);
    return response;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.message);
    } else {
      throw new Error();
    }
  }
};

const createContact = async function (data: Contact): Promise<any> {
  try {
    const apikey = process.env.VUE_APP_API_KEY;
    const response = await axios({
      method: 'post',
      url: `${createContactEndpoint}`,
      headers: {
        "Content-Type": "application/json",
        "Accept":"*/*"
      },
      data: {
        'apikey': apikey,
        'firstName': data.firstName,
        'lastName': data.lastName,
        'phone': data.phone,
        'email': data.email,
        'address': data.address,
        'address2': data.address2,
        'city': data.city,
        'state': data.state,
        "zipcode": data.zipcode
      }
    });
    return response;
  } catch (error) {
    return error;
  }
};

const updateContact = async function (data: Contact): Promise<any> {
  try {
    const apikey = process.env.VUE_APP_API_KEY;
    const response = await axios({
      method: 'post',
      url: `${updateContactEndpoint}`,
      headers: {
        "Content-Type": "application/json",
        "Accept":"*/*"
      },
      data: {
        'apikey': apikey,
        'id': data.id,
        'firstName': data.firstName,
        'lastName': data.lastName,
        'phone': data.rawPhone,
        'email': data.email,
        'address': data.address,
        'address2': data.address2,
        'city': data.city,
        'state': data.state,
        "zipcode": data.zipcode
      }
    });
    return response;
  } catch (error) {
    return error;
  }
}

const deleteContact = async function (id: string): Promise<any> {
  try {
    const apikey = process.env.VUE_APP_API_KEY;
    const response = await axios({
      method: 'post',
      url: `${deleteContactEndpoint}`,
      headers: {
        "Content-Type": "application/json",
        "Accept":"*/*"
      },
      data: {
        'apikey': apikey,
        'id': id,
      }
    });
    return response;
  } catch (error) {
    return error;
  }
};

export const ContactRepository = {
  getContact,
  getContacts,
  createContact,
  updateContact,
  deleteContact,
};
