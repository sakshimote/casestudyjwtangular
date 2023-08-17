import { HttpClient } from "@angular/common/http";
import { ThisReceiver } from "@angular/compiler";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Cart } from "../../cart/model/cart.model";
import { LoginService } from "../../login/service/login.service";
import { Review } from "../../review/model/review.model";
import { Product, UpdateProduct } from "../model/product.model";

@Injectable({
  providedIn: 'root'
})

export class ProductDetailsService{

  private getProductByProductId:string;
  private getProductByProductName:string;
  private addItemsToCartApi:string;
  private deleteProductApi:string;
  private updateProductApi:string;
  private postReviewApi:string;
  private getReviewsByProductId:string;
  private deleteReviewApi:string;



constructor(private http:HttpClient,private loginService:LoginService){
  this.getProductByProductId="http://localhost:1000/product-service/product/allproduct/";
  this.getProductByProductName="http://localhost:1000/product-service/product/allproduct/name/";
  this.addItemsToCartApi="http://localhost:1000/cart-service/cart/add/items/";
  this.deleteProductApi="http://localhost:1000/product-service/product/allproduct/";
  this.updateProductApi="http://localhost:1000/product-service/product/allproduct/";
  this.postReviewApi ="http://localhost:1000/product-service/review/addReview/";
  this.getReviewsByProductId="http://localhost:1000/product-service/review/reviews/";
  this.deleteReviewApi="http://localhost:1000/product-service/review/delete/"



}

public deleteReview(reviewId:string):Observable<string>{
return this.http.delete<string>(this.deleteReviewApi+reviewId,{
  responseType: 'text' as 'json'
});
}

public postReview(review:Review,productId:string):Observable<Review>{
  let tokenStr=localStorage.getItem("Authorization");
  return this.http.post<Review>(this.postReviewApi+productId,review,{headers: { authorization:tokenStr} });
}

public getReviewsBypID(productId:string):Observable<Review[]>{
 
  return this.http.get<Review[]>(this.getReviewsByProductId+productId);
}



 public getProductsByProductId(productId:String):Observable<Product>{
 
  return this.http.get<Product>(this.getProductByProductId+productId);

}
public  getProductsByProductName(productName:String):Observable<Product>{
 
  return this.http.get<Product>(this.getProductByProductName+productName);

}

public addItemsInCart(userId:string,productId:string,quantity:number):Observable<Cart>{
  userId=localStorage.getItem("userId");
  let tokenStr=localStorage.getItem("Authorization");
return this.http.post<Cart>(this.addItemsToCartApi+userId+"/"+productId+"/"+(1),{},{headers: { authorization:tokenStr} });
}

public deleteProduct(productId:string):Observable<string>{
return this.http.delete<string>(this.deleteProductApi+productId,
  {

  responseType: 'text' as 'json'
}
);

}

public updateProduct(productId:string,updateProduct:UpdateProduct):Observable<Product>{
  let tokenStr=localStorage.getItem("Authorization");
return this.http.put<Product>(this.updateProductApi+productId,updateProduct,{headers: { authorization:tokenStr}});
}


}
