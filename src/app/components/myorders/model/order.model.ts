export interface Orders{
  "orderId"?: string,
  "orderDate"?: string,
  "customerId"?: string,
  "amountPaid"?: number,
  "paymentStatus"?: boolean,
  "modeOfPayment"?: string,
  "orderStatus"?: string,
  "quantity"?: number,
  "items": [
      {

          "productName": string,
          "productImage": string[],
          "price": number,
          "quantity": number
      }
  ],
  "address": {
      "houseNumber": number,
      "streetName": string,
      "colonyName": string,
      "city": string,
      "state": string,
      "pinCode": number
  }
}
