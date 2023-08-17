import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { LoginService } from "../../login/service/login.service";
import { Order } from "../model/order.model";

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };


@Injectable({
  providedIn: 'root'
})

export class OrderService {
    private addOrderApi:string;
    private getOrderByUserIdApi:string;
   private  getOrderByOrderIdApi:string;


  constructor(private http:HttpClient,private loginService:LoginService) {
    this.addOrderApi="http://localhost:1000/order-service/api/order/";
    this.getOrderByUserIdApi="http://localhost:1000/order-service/api/allorder/byuser/";
    this.getOrderByOrderIdApi="http://localhost:1000/order-service/api/allorder/";



  }

  addOrder(userId:string,order:Order) : Observable<Order>{
    userId=localStorage.getItem("userId");
    let tokenStr=localStorage.getItem("Authorization");
    return this.http.post<Order>(this.addOrderApi+userId,order,{headers: { authorization:tokenStr}});

  }

  getOrderByUser(userId:string): Observable<Order[]>{
    userId=localStorage.getItem("userId");
    let tokenStr=localStorage.getItem("Authorization");
    return this.http.get<Order[]>(this.getOrderByUserIdApi+userId,{headers: { authorization:tokenStr}});

  }
  createOrder(order:any): Observable<any> {
		return this.http.post("http://localhost:1000/wallet-service/pg/createOrder", {
		customerName: order.name,
		email: order.email,
		phoneNumber: order.phone,
		amount: order.amount
		}, httpOptions);
	}
  getOrderByOrderId(orderId:string):Observable<Order[]>{
    let tokenStr=localStorage.getItem("Authorization");
    return this.http.get<Order[]>(this.getOrderByOrderIdApi+orderId,{headers: { authorization:tokenStr} });
   }


}
