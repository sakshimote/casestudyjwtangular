import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { LoginService } from "../../login/service/login.service";
import { Cart } from "../model/cart.model";


@Injectable({
  providedIn: 'root'
})

export class CartService {


    private getByCartIdApi:string;
    private getCartsApi:string;
    private getCartByUserIdApi:string;
    private addProductsApi:string;
    private addCartApi:string;
    private addQuantityApi:string;
    private subtractQuantityApi:string;
    private deleteItemApi:string;
    private removeAllItemsApi:string;

  constructor(private http:HttpClient,private loginService:LoginService) {

       this.getByCartIdApi="http://localhost:1000/cart-service/cart/getCart/";
       this.getCartsApi="http://localhost:1000/cart-service/cart/carts";
       this.getCartByUserIdApi="http://localhost:1000/cart-service/cart/byUser/";
       this.addProductsApi="http://localhost:1000/cart-service/cart/add/items/";
       this.addCartApi="http://localhost:1000/cart-service/cart/addcart/";
       this.addQuantityApi="http://localhost:1000/cart-service/cart/add/quantity/";
       this.subtractQuantityApi="http://localhost:1000/cart-service/cart/remove/quantity/";
       this.deleteItemApi="http://localhost:1000/cart-service/cart/remove/item/";
       this.removeAllItemsApi="http://localhost:1000/cart-service/cart/removeAll/items/";

  }


  
  public getCartByUserId(){
    let  userId=localStorage.getItem("userId");
    let tokenStr=localStorage.getItem("Authorization");
        return this.http.get<Cart>(this.getCartByUserIdApi+userId,{headers: { authorization:tokenStr} })
  }

  public getCartById(cartId:string){
    let tokenStr=localStorage.getItem("Authorization");
    return this.http.get<Cart>(this.getByCartIdApi+cartId,{headers: { authorization:tokenStr} });
  }

  public getCarts():Observable<Cart[]>{
    let tokenStr=localStorage.getItem("Authorization");
    return this.http.get<Cart[]>(this.getCartsApi,{headers: { authorization:tokenStr}});
  }

public addCart() :Observable<Cart> {
  let tokenStr=localStorage.getItem("Authorization");
 let userId=localStorage.getItem("userId");
  return this.http.post<Cart>(this.addCartApi+userId,{},{headers: { authorization:tokenStr} });


}

public addItemsInCart(userId:string,productId:string,quantity:number):Observable<Cart>{
  userId=localStorage.getItem("userId");
  let tokenStr=localStorage.getItem("Authorization");
return this.http.post<Cart>(this.addProductsApi+userId+"/"+productId+"/"+(1),{},{headers: { authorization:tokenStr}});
}

public addQuantity(userId:string,productId:string,quantity:number):Observable<Cart>{
  userId=localStorage.getItem("userId");
  let tokenStr=localStorage.getItem("Authorization");
  return this.http.post<Cart>(this.addQuantityApi+userId+"/"+productId+"/"+(1),{},{headers: { authorization:tokenStr} });
}

public subQuantity(userId:string,productId:string,quantity:number):Observable<Cart>{
  userId=localStorage.getItem("userId");
  let tokenStr=localStorage.getItem("Authorization");
  return this.http.post<Cart>(this.subtractQuantityApi+userId+"/"+productId+"/"+(1),{},{headers: { authorization:tokenStr}});
}

public deleteItem(userId:string,productId:string):Observable<Cart>{
  userId=localStorage.getItem("userId");
  let tokenStr=localStorage.getItem("Authorization");
  return this.http.put<Cart>(this.deleteItemApi+userId+"/"+productId,{},{headers: { authorization:tokenStr}});

}

public removeAllItems(userId:string):Observable<Cart>{
  userId=localStorage.getItem("userId");
  let tokenStr=localStorage.getItem("Authorization");
  return this.http.put<Cart>(this.removeAllItemsApi+userId,{},{headers: { authorization:tokenStr}});
}



}
