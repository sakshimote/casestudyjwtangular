import { Component, OnInit } from '@angular/core';
import { AppService } from 'src/app/app.service';
import { Category } from '../category-home/model/category.model';
import { CategoryService } from '../category-home/service/category.service';
import { User } from '../login/model/user.model';




@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  userId:string;
  loggedIn: boolean;
  username: string;
  errorMsg:string;
  cartItem:number;
  user:User;
  isMerchant:boolean;
  categoryId:string;
  categories:Category[];


  constructor(private appService: AppService,private categoryService:CategoryService) {
    this.loggedIn=false;
    this.cartItem=0;
    this.isMerchant=false;


    this.appService.loggedIn.subscribe(data=>{
      this.loggedIn=data;
    });

    this.appService.isMerchant.subscribe(data=>{
      this.isMerchant=data;
    });


    this.cartItem=0;

  this.appService.cartItems.subscribe(data=>{
    this.cartItem=data;
  })

   }

  ngOnInit(): void {

    this.categoryService.getAllCategory().subscribe(data=>{
      this.categories=data;
    },
    error=>{
      this.errorMsg="Error in loading Categories, please contact administrator!"
    });


    this.appService.loggedIn.subscribe(data=>{
      let status = localStorage.getItem('isLoggedIn');
        if(status){
            this.loggedIn = true;
            // let token = localStorage.getItem('token');
            // token = atob(token);
            this.username = localStorage.getItem("userName");
        }
        else{
            this.loggedIn = false;
        }
  });


    }

    onLogOut(){
      this.appService.cartItems.next(0);
      this.appService.isMerchant.next(false);
      localStorage.removeItem('token');
      localStorage.removeItem('isLoggedIn');
      localStorage.removeItem('userId');
      localStorage.removeItem('userRole');
      localStorage.removeItem('Authorization');
     
      this.appService.loggedIn.next(false);

      this.loggedIn = false;
      alert("user logged out");
    }

}
