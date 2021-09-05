import axios from 'axios';
import store from '../../../src/store';
import { 
  getContactEndpoint, 
  getContactsEndpoint, 
  createContactEndpoint, 
  deleteContactEndpoint } from './endpoints';
import { Contact } from '../../classes/contact'

const getContact = async function(id: string): Promise<any> {
  try {
    const apikey = store.getters["ApiStore/getApiUrl"];
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
    console.log("running getContacts...")
    const apikey = store.getters["ApiModule/getApiKey"];
    const params = `?apikey=${apikey}`;
    console.log(params)
    const response = await axios({
      method: 'get',
      url: `${getContactsEndpoint}${params}`,
      headers: {
        "Content-Type": "application/json",
        "Accept":"*/*"
      }
    });
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
    const apikey = store.getters["ApiStore/getApiUrl"];
    const response = await axios({
      method: 'get',
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

const deleteContact = async function (id: string): Promise<any> {
  try {
    const apikey = store.getters["ApiStore/getApiUrl"];
    const response = await axios({
      method: 'get',
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
  deleteContact,
};
