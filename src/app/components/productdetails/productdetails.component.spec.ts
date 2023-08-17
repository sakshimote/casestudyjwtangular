import { HttpClient } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';
import { Cart } from '../cart/model/cart.model';
import { Product } from './model/product.model';

import { ProductdetailsComponent } from './productdetails.component';
import { ProductDetailsService } from './service/product.details';

describe('ProductDetailsService', () => {
  let component: ProductdetailsComponent;
  let fixture: ComponentFixture< ProductdetailsComponent>;

  let service:ProductDetailsService;
  let product:Product;
  let cart:Cart;

  let htttpClientSpy:jasmine.SpyObj<HttpClient>;


  beforeEach(async () => {
    let htttpClientSpyObj = jasmine.createSpyObj('HttpClient',['get','post','put','delete']);
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule,RouterTestingModule],
      providers:[ProductDetailsService,
        {
          provide : HttpClient,
          useValue : htttpClientSpyObj
        }

      ],
      declarations: [ ProductdetailsComponent  ]

    })
    .compileComponents();

    service = TestBed .inject(ProductDetailsService);
    htttpClientSpy = TestBed.inject(HttpClient) as jasmine.SpyObj<HttpClient>;


    cart={
      cartId: "cart1",
      totalPrice: 1200,
      userId: "user1",
      totalItems: 1,

      productsAdded: [
          {
              productId: "pid1",
              productName: "pName",
              productImage: ["pimg1","pimg2"],
              productPrice: 300,
              quantity: 4
          }
        ]
      };

   product={
     productid:"",
 category:null,
 categoryId:"",
 description:"",
 image:[],
 merchantId:"",
 merchantName:"",
 price:900,
 productName:"",
 productType:"",
 specification:null
          }

  });
  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it("get product by productId method check ",(done:DoneFn)=>{

    htttpClientSpy.get.and.returnValue(of(product));
    service.getProductsByProductId(product.productid).subscribe({
      next:(data)=>{
        expect(data).toEqual(product);
        done();
      },
      error:(err)=> {
        done.fail;
      }
    })

    expect(htttpClientSpy.get).toHaveBeenCalledTimes(1);

});

it("get product by product name method check ",(done:DoneFn)=>{

  htttpClientSpy.get.and.returnValue(of(product));
  service.getProductsByProductName(product.productName).subscribe({
    next:(data)=>{
      expect(data).toEqual(product);
      done();
    },
    error:(err)=> {
      done.fail;
    }
  })

  expect(htttpClientSpy.get).toHaveBeenCalledTimes(1);

});

it("delete product by productId method check ",(done:DoneFn)=>{

  htttpClientSpy.delete.and.returnValue(of("deleted successfully"));
  service.deleteProduct(product.productid).subscribe({
    next:(data)=>{
      expect(data).toEqual("deleted successfully");
      done();
    },
    error:(err)=> {
      done.fail;
    }
  })

  expect(htttpClientSpy.delete).toHaveBeenCalledTimes(1);

});


it("add items to cart method check",(done:DoneFn)=>{

  htttpClientSpy.post.and.returnValue(of(cart));
  service.addItemsInCart(cart.userId,product.productid,1).subscribe({
    next:(data)=>{
      expect(data).toEqual(cart);
      done();
    },
    error:(err)=> {
      done.fail;
    }
  })

  expect(htttpClientSpy.post).toHaveBeenCalledTimes(1);

});


});


