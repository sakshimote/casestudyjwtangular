import { Product } from "../../productdetails/model/product.model";

export class Review{
  reviewId?:string;
  reviewText:string;
  rating:number;
  userName:string;

  productId:string;

}
