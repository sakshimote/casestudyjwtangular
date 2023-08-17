import { ItemsAddedInCart } from "../../cart/model/ItemsAddedInCart.model";
import { Address } from "../../register/model/address.model";

export interface Order{


  "orderDate"?:Date,
  "amountPaid"?:number,
  "modeOfPayment"?:string,
  "items"?:ItemsAddedInCart[],
  "orderStatus"?:string,
  "address"?:Address,
  "username"?:string,
  "userId"?:string

}
