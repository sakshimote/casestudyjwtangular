import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { LoginService } from "../../login/service/login.service";
import { Category } from "../model/category.model";

@Injectable({
  providedIn: 'root'
})

export class CategoryService {
    private getCategoryApi:string;
    private getCategoryByName:string;



  constructor(private http:HttpClient,private loginService:LoginService ) {
    this.getCategoryApi="http://localhost:1000/product-service/category/categories";
    this.getCategoryByName="http://localhost:1000/product-service/category/category/";


  }

  getAllCategory() : Observable<Category[]>{
    return this.http.get<Category[]>(this.getCategoryApi);

  }
  getcategoryByName(catname:string):Observable<Category>{
    let tokenStr=localStorage.getItem("Authorization");
    return this.http.get<Category>(this.getCategoryByName+catname,{headers: { authorization:tokenStr}});
  }


}
