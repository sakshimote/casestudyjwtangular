import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { LoginService } from '../../login/service/login.service';
import { Order } from '../../order/model/order.model';



@Injectable({
  providedIn: 'root'
})
export class OrderSummaryServiceService {

  getOrderByOrderIdApi:string;


  constructor(private http:HttpClient,private loginService:LoginService) {
    this.getOrderByOrderIdApi="http://localhost:1000/order-service/api/allorder/";

   }

   getOrderByOrderId(orderId:string):Observable<Order>{
    let tokenStr=localStorage.getItem("Authorization");
    return this.http.get<Order>(this.getOrderByOrderIdApi+orderId,{headers: { authorization:tokenStr}});
   }
}
