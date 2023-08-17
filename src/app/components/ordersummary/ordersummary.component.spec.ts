import { HttpClient } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';
import { Order } from '../order/model/order.model';
import { Order2 } from '../order/model/order2.model';
import { OrderService } from '../order/service/order.service';

import { OrdersummaryComponent } from './ordersummary.component';
import { OrderSummaryServiceService } from './service/ordersum.service';


describe('OrderSummaryServiceService', () => {
  let component:OrdersummaryComponent;
  let fixture: ComponentFixture<OrdersummaryComponent>;

  let service: OrderSummaryServiceService;
  let order:Order;
  let order1:Order2;
  let orders:Order[];


  let htttpClientSpy:jasmine.SpyObj<HttpClient>;


  beforeEach(async () => {
    let htttpClientSpyObj = jasmine.createSpyObj('HttpClient',['get','post','put','delete']);
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule,RouterTestingModule],
      providers:[OrderSummaryServiceService,
        {
          provide : HttpClient,
          useValue : htttpClientSpyObj
        }

      ],
      declarations: [ OrdersummaryComponent]

    })
    .compileComponents();

    service = TestBed .inject(OrderSummaryServiceService);
    htttpClientSpy = TestBed.inject(HttpClient) as jasmine.SpyObj<HttpClient>;
   order1={
     orderId:"",
     address:null,
     amountPaid:900,
     customerId:"",
     items:null,
     modeOfPayment:"",
     orderDate:null,
     orderStatus:"",
   }
    order={
   address:{

   },
   amountPaid:300,
   items:[],
   modeOfPayment:"payment gateway",
   orderDate:null,
   orderStatus:"",
   userId:"id3",
   username:"test"
          }

  });
  it('should be created', () => {
    expect(service).toBeTruthy();
  });



it("get order by orderId method check",(done:DoneFn)=>{

  htttpClientSpy.get.and.returnValue(of(order));
  service.getOrderByOrderId(order1.orderId).subscribe({
    next:(data)=>{
      expect(data).toEqual(order);
      done();
    },
    error:(err)=> {
      done.fail;
    }
  })

  expect(htttpClientSpy.get).toHaveBeenCalledTimes(1);

});

});


