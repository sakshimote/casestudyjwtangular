
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AppService } from 'src/app/app.service';
import { ProductDetailsService } from '../productdetails/service/product.details';
import { Product } from '../products/model/product.model';
import { ProductService } from '../products/service/product.service';
import { Cart } from './model/cart.model';
import { CartService } from './service/cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  products:Product[];
  cart:Cart;
  carts:Cart[];
  userId:string;
  productId:string;
  product:Product;
  errorMsg:string;
  isCartEmpty:boolean;

  constructor(private cartService:CartService,private productService:ProductService,
    private productDetailsService:ProductDetailsService,private actRoute:ActivatedRoute,
    private appService:AppService) {
      this.isCartEmpty=false;
    this.products=[];
    this.product={
       "categoryId":"",
       "specification":null,
       "category":null,
       "description":"",
       "image":[],
       "merchantId":"",
       "merchantName":"",
       "price":0,
       "productName":"",
       "productType":"",
       "productid":"",

    }
    this.cart={
      "cartId":"",
      "productId":"",
      "totalItems":0,
      "productsAdded":null,
      "quantity":0,
      "totalPrice":0,
      "userId":""

    }
   }

  ngOnInit(): void {


this.productService.getAllProducts().subscribe(data=>{
this.products=data;
})

this.userId=localStorage.getItem("userId");


this.cartService.getCartByUserId().subscribe(data=>{
    this.cart=data;
    this.appService.cartItems.next(data.totalItems);
  if(this.cart.totalItems==0){
    this.isCartEmpty=true;
  }
  console.log(data.cartId)
},error=>{
  this.cartService.addCart().subscribe(data1=>{
    this.appService.cartItems.next(data1.totalItems);
    this.cart=data1;
    })
} );

this.cartService.getCarts().subscribe(data=>{

})

}

addQuantity(productId:string){
  if(this.cart.totalItems==0){
    this.isCartEmpty=true;
  }
  this.cartService.addQuantity(this.userId,productId,1).subscribe(data=>{
    this.cart=data;

  })
}

subtractQuantity(productId:string){
  if(this.cart.totalItems==0){
    this.isCartEmpty=true;
  }
  this.cartService.subQuantity(this.userId,productId,1).subscribe(data=>{
    this.cart=data;
  })
}

deleteItem(productId:string){
  if(confirm("Are you sure you want to delete this item from cart")){
    this.cartService.deleteItem(this.userId,productId).subscribe(data=>{
      this.cart=data;
      this.appService.cartItems.next(data.totalItems);
      if(this.cart.totalItems==0){
        this.isCartEmpty=true;
      }
    })
  }

}

  }




