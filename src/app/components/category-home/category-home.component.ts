import { Component, HostListener, OnInit } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AppService } from 'src/app/app.service';
import { Cart } from '../cart/model/cart.model';
import { CartService } from '../cart/service/cart.service';
import { wallet } from '../wallet/model/wallet.model';
import { WalletServiceService } from '../wallet/service/wallet.service';
import { Category } from './model/category.model';
import { CategoryService } from './service/category.service';


@Component({
  selector: 'app-category-home',
  templateUrl: './category-home.component.html',
  styleUrls: ['./category-home.component.css']
})
export class CategoryHomeComponent implements OnInit {
  categories:Category[];
  errorMsg:string;

  cart:Cart;
  wallet:wallet

  cartItem:number;

    constructor(private categoryService:CategoryService,
      private cartService:CartService,private walletService:WalletServiceService,
      private appService:AppService) {


     this.cart={
          "cartId":"",
          "productId":"",
          "totalItems":0,
          "productsAdded":null,
          "quantity":0,
          "totalPrice":0,
          "userId":""

        }
        this.wallet={
          "walletId": "",
          "currentBalance": 0.0,
          "userId": ""
        }

      }

    ngOnInit(): void {



      this.walletService.getWallet().subscribe(data=>{
        if(!data){
          this.walletService.createWallet().subscribe(data1=>{
            this.wallet=data1;
          })
        }
        else{
        console.log(data);
        console.log(data.walletId);
        this.wallet=data;
        }
      });

      this.cartService.getCartByUserId().subscribe(data=>{
        this.cart=data;
            this.appService.cartItems.next(this.cart.totalItems);
      console.log(data.cartId)
    },error=>{
      this.cartService.addCart().subscribe(data1=>{
        this.cart=data1;
        this.appService.cartItems.next(this.cart.totalItems);
        })
    } );


      this.categoryService.getAllCategory().subscribe(data=>{
        this.categories=data;
      },
      error=>{
        this.errorMsg="Error in loading Categories, please contact administrator!"
      });

  }



}
