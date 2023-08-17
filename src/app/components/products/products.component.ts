import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AppService } from 'src/app/app.service';

import { Category } from '../category-home/model/category.model';
import { Product } from './model/product.model';
import { ProductService } from './service/product.service';


@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {

  products:Product[];
  categoryId:string;
  errorMsg:string;
  category:Category;
  userId:string;
  productsEmpty:boolean;
  deleteMsg:string;

  loggedIn: boolean;
  isMerchant:boolean;

  productName:any;


  constructor(private actRoute:ActivatedRoute,private productService:ProductService,
    private router:Router,private appService:AppService) {
    this.productsEmpty=false;
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

    this.actRoute.params.subscribe(
      params=>{
        this.categoryId=params['categoryId'];
       this.productService.getProductsByCategory(params['categoryId']).subscribe(data=>{
         this.products=data;
         if(this.products[0]==null){
           this.productsEmpty=true;
         }
         console.log(this.productsEmpty);

       },error=>{
         this.errorMsg='could not load products , please contact administrator';

       });

      }
    );


  }

  deleteCategory(categoryId:string){
    this.productService.deleteCategory(this.categoryId).subscribe(data=>{
      this.deleteMsg=data;
      alert(data);
      this.router.navigateByUrl("/");


    })

  }

  Search(){
        if(this.productName==""){
            this.ngOnInit();
         }else{
           this.products=this.products.filter(res=>{
             return res.productName.toLocaleLowerCase().match(this.productName.toLocaleLowerCase());
           });
         }
  }

  sortLowToHigh(){
    this.products.sort((a,b)=> (a.price||0 ) - (b.price ||0));

  }

  sortHightoLow(){
    this.products.sort((a,b)=>  (b.price ||0) - (a.price||0 ) );

  }

  loadData(event){

  }


}
