import { Category } from "../../category-home/model/category.model"

export interface Product{
  productid:string,
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

export interface UpdateProduct{
  productid:string,
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


