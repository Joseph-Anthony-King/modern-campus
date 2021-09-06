import Store from '@/store/index';
import { contactService } from '@/services/contactService';
import { 
  ToastMethods, 
  showToast,
  actionToastOptions,
  defaultToastOptions } from '@/helpers/vue-toasted/toastHelper';

export async function deleteContactHelper(
  id: string,
  fullName: string,
  component: any): Promise<boolean> {
  const action = [
    {
      text: 'Yes',
      onClick: async (e, toastObject) => {
        toastObject.goAway(0);

        return deleteContactHelperCore(id, fullName, component);
      },
    },
    {
      text: 'No',
      onClick: (e, toastObject) => {
        toastObject.goAway(0);
        return false;
      },
    },
  ];

  showToast(
    component,
    ToastMethods['show'],
    `Are you sure you want to delete ${fullName}?`,
    actionToastOptions(action, null)
  );

  return false;
}

export async function deleteContactHelperCore(
  id: string,
  fullName: null | string,
  component: any) : Promise<boolean> {

  try {
      
    const response: any = await contactService.deleteContact(id);

    if (response.isSuccess) {
      Store.commit('ContactStore/removeContact', id);
      Store.commit('ContactStore/removeSelectedContact');
      if (fullName !== null) {
        showToast(
          component,
          ToastMethods['success'],
          `${fullName} Deleted`,
          defaultToastOptions()
        );
      }

      return true;

    } else {
      
      if (fullName !== null) {
        showToast(
          component,
          ToastMethods['error'],
          'Contact is null',
          defaultToastOptions()
        );
      }

      return false;
    }
    
  } catch (error) {

    if (fullName !== null) {
      showToast(
        component,
        ToastMethods['error'],
        'Error processing the contact deletion',
        defaultToastOptions()
      );
    }

    return false;    
  }

}