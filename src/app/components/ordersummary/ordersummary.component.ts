import { Component, OnInit } from '@angular/core';
import { OrderSummaryServiceService } from './service/ordersum.service';
import { Order2 } from '../order/model/order2.model';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-ordersummary',
  templateUrl: './ordersummary.component.html',
  styleUrls: ['./ordersummary.component.css']
})
export class OrdersummaryComponent implements OnInit {

  order:Order2;
  orderId:string;
  errorMsg:string;
  userName;string;
  constructor(private orderSummaryService:OrderSummaryServiceService,private actRoute:ActivatedRoute) {
    this.order={

    }
  }

  ngOnInit(): void {

    this.userName=localStorage.getItem("userName");

    this.actRoute.params.subscribe(
      params=>{
        this.orderId=params['orderId'];
       this.orderSummaryService.getOrderByOrderId(params['orderId']).subscribe(data=>{
         this.order=data;
       },error=>{
         this.errorMsg='could not load products , please contact administrator';

       });

      }
    );
    }

}
