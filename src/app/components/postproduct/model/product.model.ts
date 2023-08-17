import { Category } from "../../category-home/model/category.model"

export interface Product{

  merchantId:string,
  merchantName:string,
  productType:string,
  productName:string,
  image:string[],
  price:number,
  description:string,
 specification:Map<string,string>,
  category:Category,
  categoryId:string

}
