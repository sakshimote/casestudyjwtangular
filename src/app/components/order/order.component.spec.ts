import { HttpClient } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';
import { Order } from './model/order.model';
import { Order2 } from './model/order2.model';

import { OrderComponent } from './order.component';
import { OrderService } from './service/order.service';



describe('OrderService', () => {
  let component:OrderComponent;
  let fixture: ComponentFixture<OrderComponent>;

  let service: OrderService;
  let order:Order;
  let order1:Order2;
  let orders:Order[];


  let htttpClientSpy:jasmine.SpyObj<HttpClient>;


  beforeEach(async () => {
    let htttpClientSpyObj = jasmine.createSpyObj('HttpClient',['get','post','put','delete']);
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule,RouterTestingModule],
      providers:[OrderService,
        {
          provide : HttpClient,
          useValue : htttpClientSpyObj
        }

      ],
      declarations: [ OrderComponent]

    })
    .compileComponents();

    service = TestBed .inject(OrderService);
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

  it("get order by userId  method check",(done:DoneFn)=>{

    htttpClientSpy.get.and.returnValue(of(orders));
    service.getOrderByUser(order.userId).subscribe({
      next:(data)=>{
        expect(data).toEqual(orders);
        done();
      },
      error:(err)=> {
        done.fail;
      }
    })

    expect(htttpClientSpy.get).toHaveBeenCalledTimes(1);

});

it("get order by orderId method check",(done:DoneFn)=>{

  htttpClientSpy.get.and.returnValue(of(orders));
  service.getOrderByOrderId(order1.orderId).subscribe({
    next:(data)=>{
      expect(data).toEqual(orders);
      done();
    },
    error:(err)=> {
      done.fail;
    }
  })

  expect(htttpClientSpy.get).toHaveBeenCalledTimes(1);

});


it("add order method check",(done:DoneFn)=>{

  htttpClientSpy.post.and.returnValue(of(order));
  service.addOrder(order.userId,order).subscribe({
    next:(data)=>{
      expect(data).toEqual(order);
      done();
    },
    error:(err)=> {
      done.fail;
    }
  })

  expect(htttpClientSpy.post).toHaveBeenCalledTimes(1);

});





});


