export interface OrderStatement{
  "paymentId":string,
  "transactionType": string,
  "amount": number,
  "date": Date,
  "transactionRemarks"?: string,
  "ewalletId": string

}
