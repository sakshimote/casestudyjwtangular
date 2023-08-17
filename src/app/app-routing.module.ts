import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CartComponent } from './components/cart/cart.component';
import { CategoryHomeComponent } from './components/category-home/category-home.component';
import { LoginComponent } from './components/login/login.component';
import { AuthGuard } from './components/login/service/auth.guard';
import { MyordersComponent } from './components/myorders/myorders.component';
import { OrderComponent } from './components/order/order.component';
import { OrdersummaryComponent } from './components/ordersummary/ordersummary.component';
import { PostcategoryComponent } from './components/postcategory/postcategory.component';
import { PostproductComponent } from './components/postproduct/postproduct.component';
import { ProductdetailsComponent } from './components/productdetails/productdetails.component';
import { ProductsComponent } from './components/products/products.component';
import { ProfileComponent } from './components/profile/profile.component';
import { RegisterComponent } from './components/register/register.component';
import { ReviewComponent } from './components/review/review.component';
import { WalletComponent } from './components/wallet/wallet.component';

const routes: Routes = [
  {path:'',component:CategoryHomeComponent},
  { path: "product/:categoryId", component: ProductsComponent},
  {path:"productdetails/:productId",component:ProductdetailsComponent},
  {path:'user/register' , component:RegisterComponent},
  {path:'login', component:LoginComponent},
  {path:'cart',component:CartComponent,canActivate: [AuthGuard]},
  {path:'profile',component:ProfileComponent,canActivate: [AuthGuard]},
  {path:'order/:userId',component:OrderComponent,canActivate: [AuthGuard]},
  {path:'wallet',component:WalletComponent,canActivate: [AuthGuard]},
  {path:'myorders',component:MyordersComponent,canActivate: [AuthGuard]},
  {path:'postproduct',component:PostproductComponent},
  {path:'postcategory',component:PostcategoryComponent},
  {path:'myorder/:orderId',component:OrdersummaryComponent,canActivate: [AuthGuard]},
  {path:'review/:productid',component:ReviewComponent,canActivate: [AuthGuard]}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
