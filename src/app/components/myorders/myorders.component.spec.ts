import { HttpClient } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';
import { Order } from '../order/model/order.model';
import { OrderComponent } from '../order/order.component';

import { MyordersComponent } from './myorders.component';
import { MyorderServiceService } from './service/myorder.service';


describe('MyOrdersService', () => {
  let component: MyordersComponent;
  let fixture: ComponentFixture<MyordersComponent>;

  let service: MyorderServiceService;
  let order:Order;
  let orders:Order[];

  let htttpClientSpy:jasmine.SpyObj<HttpClient>;


  beforeEach(async () => {
    let htttpClientSpyObj = jasmine.createSpyObj('HttpClient',['get','post','put','delete']);
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule,RouterTestingModule],
      providers:[MyorderServiceService,
        {
          provide : HttpClient,
          useValue : htttpClientSpyObj
        }

      ],
      declarations: [  MyordersComponent]

    })
    .compileComponents();

    service = TestBed .inject(MyorderServiceService);
    htttpClientSpy = TestBed.inject(HttpClient) as jasmine.SpyObj<HttpClient>;
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

  it("get orders method check",(done:DoneFn)=>{

    htttpClientSpy.get.and.returnValue(of(orders));
    service.getOrders().subscribe({
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




});


