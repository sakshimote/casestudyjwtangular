import { Component, HostListener, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { User } from '../login/model/user.model';
import { ProfileServiceService } from '../profile/service/profile.service';
import { OrderStatement } from './model/orderstatement.model';
import { wallet } from './model/wallet.model';
import { WalletServiceService } from './service/wallet.service';
declare var Razorpay: any;

@Component({
  selector: 'app-wallet',
  templateUrl: './wallet.component.html',
  styleUrls: ['./wallet.component.css']
})
export class WalletComponent implements OnInit {

  balance:number;
  wallet:wallet;
  AddAmountForm:FormGroup;
  amount:number;
  user:User;
  p2:number;

  statements:OrderStatement[];
  showStatement:boolean;


  paymentId: string;
  error: string;
  form: any ;

  constructor(private walletService:WalletServiceService) {

    this.user={"address":null,dateOfBirth:null,email:"",fullName:"",gender:"",id:"",mobileNo:"",password:"",
    plainTextPassword:"",role:"",userName:""
            };
    this.balance=0.0;
    this.wallet={
      "walletId": "",
      "currentBalance": 0.0,
      "userId": ""
    }
    this.statements=[];
    this.showStatement=false;
    this.AddAmountForm = new FormGroup(
      {"amount": new FormControl(0,[Validators.required,Validators.min(10),Validators.max(10000)])}
    );
   }

  ngOnInit(): void {

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
    });

  }

  addMoney(){

    console.log("add money");
    let addamount = this.AddAmountForm.value.amount;
    this.form={
      customerName:this.user.fullName,
      email: this.user.email,
      phoneNumber: this.user.mobileNo,
      amount:addamount
    };
    console.log(this.form);
    if(addamount){
      this.amount=addamount;
      console.log(this.form);
      console.log("accessed");
      this.onSubmit(this.form);
    }

  }

  options = {
    "key": "",
    "amount": "",
    "name": "Payment Gateway",
    "description": "Shopping cart",
    "image": "",
    "order_id":"",
    "handler": function (response:any){
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

    onSubmit(form:any): void {
      this.paymentId = '';
      this.error = '';

      this.walletService.createOrder(form).subscribe(
      data => {
        console.log(data);
        this.options.key = data.secretId;
        this.options.order_id = data.razorpayOrderId;
        this.options.amount = data.applicationFee; //paise
        this.options.prefill.name = "Payment Gateway";
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
      if (event) {
        this.walletService.addMoney(this.wallet.walletId,this.amount).subscribe(data=>{
          this.wallet=data;
        },
        error=>{
          console.log(error);
        })
        console.log(event.detail.razorpay_order_id);
      }
       console.log(event.detail);
    }



  showStatements(){
    this.showStatement=!this.showStatement;
    console.log(this.showStatement);
    this.walletService.getStatement(this.wallet.walletId).subscribe(data=>{
      this.statements=data;
      console.log(this.statements);
    });
    console.log("show statements");
  }


}
