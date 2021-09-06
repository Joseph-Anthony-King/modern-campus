const baseUrl = process.env.VUE_APP_API_URL;

export const getContactEndpoint = `${baseUrl}/address/view`;
export const getContactsEndpoint = `${baseUrl}/address/list`;
export const createContactEndpoint = `${baseUrl}/address/new`;
export const updateContactEndpoint = `${baseUrl}/address/update`;
export const deleteContactEndpoint = `${baseUrl}/address/delete`;