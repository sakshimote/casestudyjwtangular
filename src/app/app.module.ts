import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NavbarComponent } from './components/navbar/navbar.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CategoryHomeComponent } from './components/category-home/category-home.component';
import { HttpClientModule } from '@angular/common/http';
import { ProductsComponent } from './components/products/products.component';
import { ProductdetailsComponent } from './components/productdetails/productdetails.component';
import { RegisterComponent } from './components/register/register.component';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoginComponent } from './components/login/login.component';
import { CartComponent } from './components/cart/cart.component';
import { OrderComponent } from './components/order/order.component';
import { ProfileComponent } from './components/profile/profile.component';
import { PaymentComponent } from './components/payment/payment.component';


import { WalletComponent } from './components/wallet/wallet.component';
import { MyordersComponent } from './components/myorders/myorders.component';
import { OrdersummaryComponent } from './components/ordersummary/ordersummary.component';
import { PostproductComponent } from './components/postproduct/postproduct.component';
import { PostcategoryComponent } from './components/postcategory/postcategory.component';
import { ReviewComponent } from './components/review/review.component';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { Ng2OrderModule } from 'ng2-order-pipe';
import { NgxPaginationModule } from 'ngx-pagination';


@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    CategoryHomeComponent,
    ProductsComponent,
    ProductdetailsComponent,
    RegisterComponent,
    LoginComponent,
    CartComponent,
    OrderComponent,
    ProfileComponent,
    PaymentComponent,
    WalletComponent,
    MyordersComponent,
    OrdersummaryComponent,
    PostproductComponent,
    PostcategoryComponent,
    ReviewComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    BrowserAnimationsModule,
    HttpClientModule,
    ReactiveFormsModule,
    CommonModule,
    FormsModule,
    Ng2SearchPipeModule,
    Ng2OrderModule,
    NgxPaginationModule

  ],
  providers: [],
  
  bootstrap: [AppComponent]
})
export class AppModule { }
