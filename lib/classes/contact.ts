import { IContact } from "../interfaces/icontact";

export class Contact implements IContact {
  private _id = '';
  private _firstName = '';
  private _lastName = '';
  private _address = '';
  private _address2 = '';
  private _city = '';
  private _state = '';
  private _zipcode = '';
  private _email = '';
  private _phone = '';

  public get id() {
    return this._id;
  }
  public set id(id: string) {
    this._id = id;
  }

  public get firstName() {
    return this._firstName;
  }
  public set firstName(firstname: string) {
    this._firstName = firstname;
  }

  public get lastName() {
    return this._lastName;
  }
  public set lastName(lastname: string) {
    this._lastName = lastname;
  }

  public get fullName() {
    return this._firstName + ' ' + this._lastName;
  }

  public get address() {
    return this._address;
  }
  public set address(address: string) {
    this._address = address;
  }

  public get address2() {
    return this._address2;
  }
  public set address2(address2: string) {
    this._address2 = address2;
  }

  public get city() {
    return this._city;
  }
  public set city(city: string) {
    this._city = city;
  }

  public get state() {
    return this._state;
  }
  public set state(state: string) {
    this._state = state;
  }

  public get zipcode() {
    return this._zipcode;
  }
  public set zipcode(zipcode: string) {
    this._zipcode = zipcode;
  }

  public get email() {
    return this._email;
  }
  public set email(email: string) {
    this._email = email;
  }

  public get phone() {
    const result = '(' + this._phone.substr(0,3) + ') ' 
      + this._phone.substr(3,3) + '-' 
      + this._phone.substr(6,4);

    return result;
  }
  public set phone(phone: string) {
    this._phone = phone;
  }

  public get rawPhone() {
    return this._phone;
  }
  public set rawPhone(phone: string) {
    this._phone = phone;
  }

  constructor(data?: any) {
    if (data !== null) {
      this.id = data.id !== undefined ? data.id : '';
      this.firstName = data.firstName !== undefined ? data.firstName : '';
      this.lastName = data.lastName !== undefined ? data.lastName : '';
      this.address = data.address !== undefined ? data.address : '';
      this.address2 = data.address2 !== undefined ? data.address2 : '';
      this.city = data.city !== undefined ? data.city : '';
      this.state = data.state !== undefined ? data.state : '';
      this.zipcode = data.zipcode !== undefined ? data.zipcode : '';
      this.email = data.email !== undefined ? data.email : '';
      this.phone = data.phone !== undefined ? data.phone : '';
    } else {
      this.id = '';
      this.firstName = '';
      this.lastName = '';
      this.address = '';
      this.address2 = '';
      this.city = '';
      this.state = '';
      this.zipcode = '';
      this.email = '';
      this.phone = '';
    }
  }
}