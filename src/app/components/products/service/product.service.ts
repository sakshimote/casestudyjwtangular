import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { LoginService } from "../../login/service/login.service";
import { Product } from "../model/product.model";

@Injectable({
  providedIn: 'root'
})

export class ProductService{

  private getProductByCategoryIdApi:string;
  private getAllProductsApi:string;
  private deleteCatgeoryApi:string;



constructor(private http:HttpClient,private loginService:LoginService){
  this.getProductByCategoryIdApi="http://localhost:1000/product-service/product/allproduct/category/";
  this.getAllProductsApi="http://localhost:1000/product-service/product/allproduct/";
  this.deleteCatgeoryApi="http://localhost:1000/product-service/category/delete/";


}

public getProductsByCategory(categoryId:String):Observable<Product[]>{
 
  return this.http.get<Product[]>(this.getProductByCategoryIdApi+categoryId);

}

public getAllProducts():Observable<Product[]>{
  
return this.http.get<Product[]>(this.getAllProductsApi);
}

public deleteCategory(categoryId:String):Observable<string>{
  return this.http.delete<string>(this.deleteCatgeoryApi+categoryId,
    {
      responseType: 'text' as 'json'
    }
  )
}



}
