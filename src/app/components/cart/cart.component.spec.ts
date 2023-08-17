import { HttpClient } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';

import { CartComponent } from './cart.component';
import { Cart } from './model/cart.model';
import { CartService } from './service/cart.service';


const cartTd:string="cart1";

describe('CartService',()=>{
  let service:CartService ;
  let htttpClientSpy:jasmine.SpyObj<HttpClient>;
  let cart:Cart;

  beforeEach(() => {
    let htttpClientSpyObj = jasmine.createSpyObj('HttpClient',['get','post','put','delete']);
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule,RouterTestingModule],
      providers:[CartService,
                {
                  provide : HttpClient,
                  useValue : htttpClientSpyObj
                }]
    });


    service = TestBed .inject(CartService);
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

  });
  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it("get the cart method check",(done:DoneFn)=>{

      htttpClientSpy.get.and.returnValue(of(cart));
      service.getCartByUserId().subscribe({
        next:(data)=>{
          expect(data).toEqual(cart);
          done();
        },
        error:(err)=> {
          done.fail;
        }
      })

      expect(htttpClientSpy.get).toHaveBeenCalledTimes(1);

  });


  it("post the cart method check",(done:DoneFn)=>{

      htttpClientSpy.post.and.returnValue(of(cart));
      service.addCart().subscribe({
        next:(data)=>{
          expect(data).toEqual(cart);
          done();
        },
        error:(err)=> {

        }
      })

      expect(htttpClientSpy.post).toHaveBeenCalledTimes(1);

  });

  it("delete item the cart method check",(done:DoneFn)=>{
    const cartRest:Cart={
      cartId: "cart1",
      totalPrice: 1600,
      userId: "user1",
      totalItems: 2,

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
    cartRest.productsAdded.push({
      productId: "pid2",
      productName: "pName2",
      productImage: ["pimg1","pimg2"],
      productPrice: 400,
      quantity: 1
  });

    cart.productsAdded.push({
        productId: "pid2",
        productName: "pName2",
        productImage: ["pimg1","pimg2"],
      productPrice: 400,
        quantity: 1
    });
    cart.totalItems=2;

    htttpClientSpy.put.and.returnValue(of(cart));
    cart.productsAdded.slice(1);
    cart.totalItems=1;
    service.deleteItem(cartTd,"pid1").subscribe({
      next:(data)=>{
        expect(data).toEqual(cart);
        expect(data.totalItems).toEqual(cart.totalItems);
        expect(data.productsAdded.length).toEqual(cart.productsAdded.length);
        done();
      },
      error:(err)=> {
        done.fail;
      }
    })

    expect(htttpClientSpy.put).toHaveBeenCalledTimes(1);

  });

  it("Add quantity cart method check",(done:DoneFn)=>{
    const cartRest:Cart={
      cartId: "cart1",
      totalPrice: 1500,
      userId: "user1",
      totalItems: 1,
      productsAdded: [
        {
            productId: "pid1",
            productName: "pName",
            productImage: ["pimg1","pimg2"],
            productPrice: 300,
            quantity: 5
        }
      ]
      };

    cart.productsAdded[0]!.quantity=cart.productsAdded[0]!.quantity+1;
    cart.totalPrice = cart.productsAdded[0]!.quantity * cart.productsAdded[0]!.productPrice;
    htttpClientSpy.post.and.returnValue(of(cartRest));

    service.addQuantity(cartTd,"pid1",1).subscribe({
      next:(data)=>{
        expect(data).toEqual(cart);
        expect(data.productsAdded[0]!.quantity).toEqual(cart.productsAdded[0]!.quantity);
        expect(data.totalPrice).toEqual( cart.totalPrice);
        done();
      },
      error:(err)=> {
        done.fail;
      }
    })

    expect(htttpClientSpy.post).toHaveBeenCalledTimes(1);

  });

  it("Sub quantity cart method check",(done:DoneFn)=>{
    const cartRest:Cart={
      cartId: "cart1",
      totalPrice: 900,
      userId: "user1",
      totalItems: 1,
      productsAdded: [
        {
            productId: "pid1",
            productName: "pName",
            productImage: ["pimg1","pimg2"],
            productPrice: 300,
            quantity:3
        }
      ]
      };

    cart.productsAdded[0]!.quantity=cart.productsAdded[0]!.quantity-1;
    cart.totalPrice = cart.productsAdded[0]!.quantity * cart.productsAdded[0]!.productPrice;
    htttpClientSpy.post.and.returnValue(of(cartRest));

    service.subQuantity(cartTd,"pid1",1).subscribe({
      next:(data)=>{
        expect(data).toEqual(cart);
        expect(data.productsAdded[0]!.quantity).toEqual(cart.productsAdded[0]!.quantity);
        expect(data.totalPrice).toEqual( cart.totalPrice);
        done();
      },
      error:(err)=> {
        done.fail;
      }
    })

    expect(htttpClientSpy.post).toHaveBeenCalledTimes(1);
  });

  it("Remove all Items from cart method check",(done:DoneFn)=>{
    const cartRest:Cart={
      cartId: "cart1",
      totalPrice: 900,
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
      cartRest.productsAdded.splice(0,cartRest.productsAdded.length);
      cartRest.totalItems=0;
      cartRest.totalPrice=0;

      cart.productsAdded.splice(0,cart.productsAdded.length);
      cart.totalItems=0;
      cart.totalPrice=0;
    htttpClientSpy.put.and.returnValue(of(cartRest));

    service.removeAllItems(cartTd).subscribe({
      next:(data)=>{
        expect(data).toEqual(cart);
        expect(data.productsAdded.length).toEqual(cart.productsAdded.length);
        expect(data.totalPrice).toEqual( cart.totalPrice);
        expect(data.totalItems).toEqual( cart.totalItems);
        done();
      },
      error:(err)=> {
        done.fail;
      }
    })

    expect(htttpClientSpy.put).toHaveBeenCalledTimes(1);
  });

});








