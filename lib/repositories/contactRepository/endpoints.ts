import store from '../../../src/store';

const baseUrl = store.getters['ApiStore/getApiUrl'];

export const getContactEndpoint = `${baseUrl}/address/view`;
export const getContactsEndpoint = `${baseUrl}/address/list`;
export const createContactEndpoint = `${baseUrl}/address/new`;
export const deleteContactEndpoint = `${baseUrl}/address/delete`;