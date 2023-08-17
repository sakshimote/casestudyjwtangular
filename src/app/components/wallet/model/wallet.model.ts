import { Statement } from "./statement.model";

export interface wallet{
  "walletId"?: string,
  "currentBalance"?: number,
  "userId"?: string,
  "userName"?: string,
  "statements"?:Statement[]
}
