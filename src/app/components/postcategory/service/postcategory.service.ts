import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { LoginService } from "../../login/service/login.service";
import { Category } from "../model/category.model";

@Injectable({
  providedIn: 'root'
})
export class PostCategoryService {

  postCategoryApi:string;

  constructor(private http:HttpClient,
    private loginService:LoginService) {
    this.postCategoryApi ="http://localhost:1000/product-service/category/addCategory";
  }

  postCategory(category:Category):Observable<Category>{
    let tokenStr=localStorage.getItem("Authorization");
    return this.http.post<Category>(this.postCategoryApi,category,{headers: { authorization:tokenStr}});
  }
}
