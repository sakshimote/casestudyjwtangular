import { ItemsAddedInCart } from "../../cart/model/ItemsAddedInCart.model"
import { Address } from "../../login/model/user.model";

export interface Order2{
  "orderId"?: string,
  "orderDate"?: Date,
  "customerId"?: string,
  "amountPaid"?: number,
  "paymentStatus"?: boolean,
  "modeOfPayment"?: string,
  "orderStatus"?: string,
  "quantity"?: number,

    "items"?:ItemsAddedInCart[],

    "address"?:Address,
}
