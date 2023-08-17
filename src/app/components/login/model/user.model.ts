

export interface User{
  "id"?:string,
  "fullName"?:string,
  "userName"?:string,
  "email"?:string,
  "mobileNo"?:string,
  "role"?:string,
  "dateOfBirth"?:Date,
  "gender"?:string,
  "password"?:string,
  "address"?:Address,
  "plainTextPassword"?:string

}
export interface Address{
  "houseNumber"?:number,
  "streetName"?:string,
  "colonyName"?:string,
  "city"?:string,
  "state"?:string,
  "pinCode"?:number
}
export interface UpdateUser{
  "id"?:string,
  "fullName"?:string,
  "userName"?:string,
  "email"?:string,
  "mobileNo"?:string,
  "role"?:string,
  "dateOfBirth"?:Date,
  "gender"?:string,
  "password"?:string,
  "address"?:Address,
  "plainTextPassword"?:string

}
