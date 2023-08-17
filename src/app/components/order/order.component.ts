import { Component, HostListener, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AppService } from 'src/app/app.service';
import { Cart } from '../cart/model/cart.model';
import { CartService } from '../cart/service/cart.service';
import { UpdateUser, User } from '../login/model/user.model';
import { Orders } from '../myorders/model/order.model';
import { OrderSummaryServiceService } from '../ordersummary/service/ordersum.service';
import { OrderServiceService } from '../payment/service/order.service.service';

import { ProfileServiceService } from '../profile/service/profile.service';
import { wallet } from '../wallet/model/wallet.model';
import { WalletServiceService } from '../wallet/service/wallet.service';
import { Order } from './model/order.model';
import { Order2 } from './model/order2.model';
import { postOrder } from './model/postOrder.model';
import { OrderService } from './service/order.service';
declare var Razorpay: any;

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})


export class OrderComponent implements OnInit {

  order:Order;
  order2:Order2;
  user:User;
  cart:Cart;
  cartId:string;
  userId:string;
  orderForm:FormGroup;
  postOrder:postOrder;
  form: any = {};
  amount:number;
  myorder:Orders;
  wallet:wallet;
  updateAddressForm:FormGroup;
  updateUser:UpdateUser;

  constructor(private orderService1:OrderService,private cartService:CartService,
    private profileService:ProfileServiceService,private orderService:OrderServiceService,
    private walletService:WalletServiceService,private router:Router,
    private appService:AppService,
    private orderSummaryService:OrderSummaryServiceService
 ) {

  this.updateUser={
    address:{}
  }
  this.order2={
    orderId:"",
    address:null,
    items:null,
    amountPaid:null,
    customerId:"",
    modeOfPayment:"",
    orderDate:null,
    orderStatus:"",
    paymentStatus:null,
    quantity:0
  }
  this.updateAddressForm = new FormGroup(
    {"houseNumber":new FormControl(),
    "streetName": new FormControl(),
    "colonyName": new FormControl,
    "city" : new FormControl(),
    "state" : new FormControl(),
    "pinCode": new FormControl() }
  );

    this.user={"address":null,dateOfBirth:null,email:"",fullName:"",gender:"",id:"",mobileNo:"",password:"",
    plainTextPassword:"",role:"",userName:""
            };
            this.user.address={
              city:"",
              colonyName:"",
              houseNumber:0,
              pinCode:0,
              state:"",
              streetName:""


            }
    this.amount=0;
    this.wallet={
      "walletId": "",
      "currentBalance": 0.0,
      "userId": ""
    }
    this.order={

      orderDate:null,
      address:null,
      amountPaid:0,
      items:null,
      modeOfPayment:"",
      orderStatus:"",
      userId:"",
      username:""
    }
    this.postOrder={
      modeOfPayment:"",
      paymentStatus:true
    }

    this.orderForm = new  FormGroup(
      {"paymentMethod":new FormControl(Validators.required)}
    );
    this.form={}
   }

   paymentId: string;
   error: string;

   options = {
     "key": "",
     "amount": "",
     "name": "Payment Gateway",
     "description": "for payments",
     "image": "",
     "order_id":"",
     "handler": function (response){
       var event = new CustomEvent("payment.success",
         {
           detail: response,
           bubbles: true,
           cancelable: true
         }
       );
       window.dispatchEvent(event);
     }
     ,
     "prefill": {
     "name": "",
     "email": "",
     "contact": ""
     },
     "notes": {
     "address": ""
     },
     "theme": {
     "color": "#3399cc"
     }

     };


  ngOnInit(): void {

    this.cartService.getCartByUserId().subscribe(data=>{
      this.cart=data;
      this.amount=data.totalPrice;
    })

    this.walletService.getWallet().subscribe(data=>{
      if(!data){
        this.walletService.createWallet().subscribe(data1=>{
          this.wallet=data1;
        })
      }
      else{
        console.log(data);
      this.wallet=data;
      }
    })

    let userId = localStorage.getItem('userId');
    console.log(userId);
    this.profileService.getUserDetails(userId).subscribe(
      (data) => {
        this.user = data;
      },
      (error) => {
        alert('error');
      }
    );

  }

  onSubmit(){
    this.order.modeOfPayment=this.orderForm.value.paymentMethod;

    console.log(this.postOrder.modeOfPayment);

    if(this.order.modeOfPayment === "Payment-Gateway"){
      this.onPaymentByGateway();
    }
    else if(this.order.modeOfPayment === 'E-wallet'){
      this.payByWallet();

    }
    else if(this.order.modeOfPayment === 'Cash-On-Delivery'){
      this.orderService1.addOrder(this.userId,this.order).subscribe(data=>{

        this.cartService.removeAllItems(this.cartId).subscribe(data1=>{
          this.appService.cartItems.next(data1.totalItems);

          this.order2=data;
          console.log(this.order2)
          this.orderSummaryService.getOrderByOrderId(this.order2.orderId).subscribe(data=>{
           // this.router.navigateByUrl("/order/${order2.orderId}");
           console.log(data)
            this.router.navigate(['/myorder', this.order2.orderId]);

          })

        });
      }
    );
      alert("order placed succesfully");

     // this.router.navigateByUrl("/myorders");

    }
    else{
      alert("please select the mode of payment");
    }

  }

  navigate(){
    console.log(this.order2)
    this.orderSummaryService.getOrderByOrderId(this.order2.orderId).subscribe(data=>{
      this.router.navigate(['/myorder', this.order2.orderId]);
    });

   // this.router.navigateByUrl("/order/{{order2.orderId}}");
  }

  onClickPlaceOrder(){
    this.order.modeOfPayment=this.orderForm.value.paymentMethod;

    this.orderService1.addOrder(this.userId,this.order).subscribe(data=>{
      this.cartService.removeAllItems(this.cartId).subscribe(data1=>{
        this.appService.cartItems.next(data1.totalItems);
        this.order2=data;
        console.log(this.order2)
         this.navigate();

      });
    }
    );

    alert("order placed succesfully");
  }


  onPaymentByGateway(){
    this.form={
      "customerName": this.user.fullName,
      "email": this.user.email,
      "phoneNumber": this.user.mobileNo,
      "amount": this.amount
    };

    this.paymentId = '';
    this.error = '';
    this.orderService.createOrder(this.form).subscribe(
    data => {
      console.log(data);
      this.options.key = data.secretId;
      this.options.order_id = data.razorpayOrderId;
      this.options.amount = data.applicationFee; //paise
      this.options.prefill.name = "Shopitto";
      this.options.prefill.email = "abc@gmail.com";
      this.options.prefill.contact = "";

      if(data.pgName ==='razor2') {
        this.options.image="";
        var rzp1 = new Razorpay(this.options);
        rzp1.open();
      } else {
        var rzp2 = new Razorpay(this.options);
        rzp2.open();
      }


      rzp1.on('payment.failed', function (response:any){
        // Todo - store this information in the server
        console.log(response);
        console.log(response.error.code);
        console.log(response.error.description);
        console.log(response.error.source);
        console.log(response.error.step);
        console.log(response.error.reason);
        console.log(response.error.metadata.order_id);
        console.log(response.error.metadata.payment_id);

      }
      );
    },
    err => {
      this.error = err.error.message;
    }
    );
  }

  @HostListener('window:payment.success', ['$event'])
  onPaymentSuccess(event:any): void {
    this.orderSummaryService.getOrderByOrderId(this.order2.orderId).subscribe(data=>{
      // this.router.navigateByUrl("/order/${order2.orderId}");
      console.log(data)
       this.router.navigate(['/myorder', this.order2.orderId]);

     })
    if (event) {
      console.log(event.detail.razorpay_order_id);
    }

    this.onClickPlaceOrder();
     console.log(event.detail);
  }

  payByWallet(){

    if(this.wallet.currentBalance==this.amount){
      alert("your balance will be low if you payed using ewallet");
    }

    if(this.wallet.currentBalance > this.amount){
      console.log(this.amount);
      console.log("you can pay By E-wallet");
      this.walletService.payBywallet(this.amount,this.wallet.walletId).subscribe(data=>{
        this.wallet=data;
        this.orderSummaryService.getOrderByOrderId(this.order2.orderId).subscribe(data=>{
          // this.router.navigateByUrl("/order/${order2.orderId}");
          console.log(data)
           this.router.navigate(['/myorder', this.order2.orderId]);

         })
        this.onClickPlaceOrder();
      }
      );
    }
    else{
      console.log(this.amount);
      alert("Your balance is low please top-up your account");
    }
    console.log("payByWallet");

  }

  onAddressFormSubmit(){
    console.log("submitted");
    this.updateUser.address.houseNumber=this.updateAddressForm.value.houseNumber;
    this.updateUser.address.streetName=this.updateAddressForm.value.streetName;
    this.updateUser.address.colonyName=this.updateAddressForm.value.colonyName
    this.updateUser.address.city=this.updateAddressForm.value.city;
    this.updateUser.address.state=this.updateAddressForm.value.state;
    this.updateUser.address.pinCode=this.updateAddressForm.value.pinCode;
    console.log(this.updateUser);
    this.profileService.updateUser(this.user.id,this.updateUser).subscribe(data=>{
      this.user=data;
    });
  }


  }


