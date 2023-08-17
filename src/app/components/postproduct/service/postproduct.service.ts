import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { LoginService } from '../../login/service/login.service';
import { Product } from '../model/product.model';



@Injectable({
  providedIn: 'root'
})
export class PostProductService {

  postProductApi:string;

  constructor(private http:HttpClient,
    private loginService:LoginService) {
    this.postProductApi ="http://localhost:1000/product-service/product/allproduct/";
  }

  postProduct(product:Product,categoryId:string):Observable<Product>{
    let userId = localStorage.getItem('userId');
    let tokenStr=localStorage.getItem("Authorization");
    return this.http.post<Product>(this.postProductApi+userId+"/"+categoryId,product,{headers: { authorization:tokenStr} });
  }
}
