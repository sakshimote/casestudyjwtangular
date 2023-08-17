import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { User } from "../../login/model/user.model";
import { Order } from "../../order/model/order.model";

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

@Injectable({
  providedIn: 'root'
})
export class OrderServiceService {
  user:User;
  order:Order;

  constructor(private http: HttpClient) {

	}

  createOrder(order): Observable<any> {
		return this.http.post("http://localhost:8099/pg/createOrder", {
		customerName: order.name,
		email: order.email,
		phoneNumber: order.phone,
		amount: order.amount
		}, httpOptions);
	}

}
