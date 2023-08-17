import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { CartService } from "./components/cart/service/cart.service";
import { ProductDetailsService } from "./components/productdetails/service/product.details";
import { error } from "console";

@Injectable({
  providedIn: 'root'
})
export class AppService{

  loggedIn = new BehaviorSubject<boolean>(false);
  isMerchant=new BehaviorSubject<boolean>(false);
  cartItems = new BehaviorSubject<number>(0);
  reviewCount=new BehaviorSubject<number>(0);
  productId:string;

   constructor(private cartService:CartService,private productDetailsService:ProductDetailsService) {
      let user = localStorage.getItem('token');
      let role = localStorage.getItem('userRole');

      if(user){
        this.loggedIn.next(true);

        this.cartService.getCartByUserId().subscribe(data=>{
          this.cartItems.next(data.totalItems);
        },
        error=>{
            this.loggedIn.next(false);
            localStorage.removeItem('token');
            localStorage.removeItem('userRole');       
            localStorage.removeItem('Authorization');       

        })

        this.productDetailsService.getReviewsBypID(this.productId).subscribe(data=>{
          this.reviewCount.next(data.length);
        })

        if(role === "Merchant"){
          this.isMerchant.next(true);
        }

      }

    }


}
