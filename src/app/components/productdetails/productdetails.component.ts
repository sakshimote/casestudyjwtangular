import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { AppService } from 'src/app/app.service';
import { Cart } from '../cart/model/cart.model';
import { CartService } from '../cart/service/cart.service';
import { Review } from '../review/model/review.model';

import { Product, UpdateProduct } from './model/product.model';
import { ProductDetailsService } from './service/product.details';

@Component({
  selector: 'app-productdetails',
  templateUrl: './productdetails.component.html',
  styleUrls: ['./productdetails.component.css']
})
export class ProductdetailsComponent implements OnInit {
  products:Product[];
  product:Product;
  specMap:Map<string,string>;


  errorMsg:string;
  productId:string;
  userId:string;
  cart:Cart;
  imageurl:string;

  loggedIn: boolean;
  isMerchant:boolean;
  deleteMsg:string;
  deleted:boolean;

  updateProductModal:boolean;
  updateForm:FormGroup;
  updateProduct:UpdateProduct;

  reviewCount:number;
  reviews:Review[];
userId2:string;


  constructor(private actRoute:ActivatedRoute,private productDetailsService:ProductDetailsService,
    private appService:AppService) {
this.reviewCount=0;
this.appService.reviewCount.subscribe(data=>{
  this.reviewCount=data;

});
      this.specMap= new Map();
this.userId2="";
      this.updateProductModal = false;
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

     this.updateProduct={
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
    this.updateForm = new FormGroup(
      {
        "productname":new FormControl("",Validators.required),
        "productType":new FormControl("",Validators.required),
        "productPrice":new FormControl(Validators.required),
        "categoryName":new FormControl("",Validators.required),
        "productImage1":new FormControl("",Validators.required),
        "productImage2":new FormControl(),
        "productImage3":new FormControl(),
        "productImage4":new FormControl(),
        "productDescription":new FormControl("",Validators.required),
        "SpecTitle1":new FormControl(),
        "SpecTitle2":new FormControl(),
        "SpecTitle3":new FormControl(),
        "SpecTitle4":new FormControl(),
        "SpecTitle5":new FormControl(),
        "SpecDesc1":new FormControl(),
        "SpecDesc2":new FormControl(),
        "SpecDesc3":new FormControl(),
        "SpecDesc4":new FormControl(),
        "SpecDesc5":new FormControl()
      });


      this.productId="";
      this.imageurl="";
      this.deleteMsg="";

      this.deleted=false;

      this.isMerchant=false;
      this.loggedIn=false;

      this.appService.loggedIn.subscribe(data=>{
        this.loggedIn=data;
      });

      this.appService.isMerchant.subscribe(data=>{
        this.isMerchant=data;
      });


  }
  ngOnInit(): void {


    this.userId=localStorage.getItem("userId");

    this.actRoute.params.subscribe(
      params=>{
        this.productId=params['productId'];
        this.productDetailsService.getReviewsBypID(this.productId).subscribe(data1=>{
          this.reviews=data1;
          this.appService.reviewCount.next(this.reviews.length);
        })
       this.productDetailsService.getProductsByProductId(params['productId']).subscribe(data=>{
         this.product=data;
         this.imageurl=data.image[0];
       },error=>{
         this.errorMsg='could not load product details , please contact administrator';

       });

      }
    );



  }

  showImg(image:string){
    this.imageurl=image;
}

deleteProduct(productId:string){
  if(confirm("Are you sure you want to delete this product")){
    this.userId2=localStorage.getItem("userId");
    if(this.product.merchantId===this.userId2){
    this.productDetailsService.deleteProduct(productId).subscribe(data=>{
      this.deleteMsg=data;
      this.deleted=true;
     alert("product deleted successfully");
   })
  }else{
    alert("product must be deleted by seller");
  }
  }

}

  addItemsToCart(productId:string){
    try {
      this.productDetailsService.addItemsInCart(this.userId,productId,1).subscribe(
        data=>{
          this.appService.cartItems.next(data.totalItems);
          alert("Item added in cart")
        },
        error=>{
          console.log(this.userId);
          if(this.appService.loggedIn.next){
            alert("Please Login");
          }else{
          alert("Item already present,add quantity now");
          }
        }
      );
    } catch (error) {

    }
  }

  updateProductMethod(){
    this.updateProductModal = !this.updateProductModal;
  }

  onSubmit(){

    console.log(this.updateForm.value);


    this.updateProduct.productName = this.updateForm.value.productname;
    this.updateProduct.productType = this.updateForm.value.productType;
    this.updateProduct.price = this.updateForm.value.productPrice;
    this.updateProduct.image=[];
    if(this.updateForm.value.productImage1)
      this.updateProduct.image.push(this.updateForm.value.productImage1);
    if(this.updateForm.value.productImage2)
     this.updateProduct.image.push(this.updateForm.value.productImage2);
    if(this.updateForm.value.productImage3)
      this.updateProduct.image.push(this.updateForm.value.productImage3);
    if(this.updateForm.value.productImage4)
     this.updateProduct.image.push(this.updateForm.value.productImage4);

    this.updateProduct.description = this.updateForm.value.productDescription;




    if(this.updateForm.value.SpecTitle1 && this.updateForm.value.SpecDesc1)
      this.specMap.set(this.updateForm.value.SpecTitle1,this.updateForm.value.SpecDesc1)

    if(this.updateForm.value.SpecTitle2 && this.updateForm.value.SpecDesc2)
      this.specMap.set(this.updateForm.value.SpecTitle2,this.updateForm.value.SpecDesc2)

    if(this.updateForm.value.SpecTitle3 && this.updateForm.value.SpecDesc3)
      this.specMap.set(this.updateForm.value.SpecTitle3,this.updateForm.value.SpecDesc3)

    if(this.updateForm.value.SpecTitle4 && this.updateForm.value.SpecDesc4)
      this.specMap.set(this.updateForm.value.SpecTitle4,this.updateForm.value.SpecDesc4)

    if(this.updateForm.value.SpecTitle5 && this.updateForm.value.SpecDesc5)
     this.specMap.set(this.updateForm.value.SpecTitle5,this.updateForm.value.SpecDesc5)

     this.updateProduct.specification = this.specMap;

    let convMap:any = {};
     this.specMap.forEach((val: string, key: string) => {
        convMap[key] = val;
      });

    this.updateProduct.specification=convMap;



    this.productDetailsService.updateProduct(this.productId,this.updateProduct).subscribe(data=>{
      this.product=data;

    });
    alert("product details updated successfully");
  }



}
