import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { LoginService } from '../../login/service/login.service';
import { Order } from '../../order/model/order.model';



@Injectable({
  providedIn: 'root'
})
export class MyorderServiceService {

  getOrdersApi:string;


  constructor(private http:HttpClient,private loginService:LoginService) {
    this.getOrdersApi="http://localhost:1000/order-service/api/allorder/byuser/";

   }

   getOrders():Observable<Order[]>{
    let userId = localStorage.getItem('userId');
    let tokenStr=localStorage.getItem("Authorization");
    return this.http.get<Order[]>(this.getOrdersApi+userId,{headers: { authorization:tokenStr} });
   }
}
