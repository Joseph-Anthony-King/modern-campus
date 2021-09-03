import { IContact } from "../interfaces/icontact";

export class Contact implements IContact {
  id: string = '';
  firstName: string = '';
  lastName: string = '';
  address: string = '';
  address2: string = '';
  city: string = '';
  state: string = '';
  zipcode: string = '';
  email: string = '';
  phone: string = '';

  constructor(data?: any) {
    if (data !== null) {
      this.id = data.id !== undefined ? data.id : '',
      this.firstName = data.firstName !== undefined ? data.firstName : '',
      this.lastName = data.lastName !== undefined ? data.lastName : '',
      this.address = data.address !== undefined ? data.address : '',
      this.address2 = data.address2 !== undefined ? data.address2 : '',
      this.city = data.city !== undefined ? data.city : '';
      this.state = data.state !== undefined ? data.state : '';
      this.zipcode = data.zipcode !== undefined ? data.zipcode : '',
      this.email = data.email !== undefined ? data.email : '',
      this.phone = data.phone !== undefined ? data.phone : '',
    }
  }
  
  phoneFormatted():string {
    let result: string;
    result = '(' + this.phone.substring(0,3) + ') ' 
      + this.phone.substring(3,3) + '-' 
      + this.phone.substring(6,4);
    return result;
  }
}