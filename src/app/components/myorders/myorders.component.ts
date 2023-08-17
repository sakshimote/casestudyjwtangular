import { Component, OnInit } from '@angular/core';
import { ItemsAddedInCart } from '../cart/model/ItemsAddedInCart.model';
import { Order } from '../order/model/order.model';
import { MyorderServiceService } from './service/myorder.service';

@Component({
  selector: 'app-myorders',
  templateUrl: './myorders.component.html',
  styleUrls: ['./myorders.component.css']
})
export class MyordersComponent implements OnInit {
  order:Order[];
  order1:Order;
  userName:string;
  p2:number;


  constructor(private myOrderService:MyorderServiceService) {
    this.order=null;

this.order1={
  address:null,
  amountPaid:0,
  items:null,
  modeOfPayment:"",
  orderDate:null,
  orderStatus:"",
  userId:"",
  username:""

}
  }

  ngOnInit(): void {

    this.userName=localStorage.getItem("userName");
    this.myOrderService.getOrders().subscribe(data=>{
      this.order= data;
      console.log(data);
    },
    error=>{
      console.log(error);
      console.log("orders error");
    }

    );
  }

}
