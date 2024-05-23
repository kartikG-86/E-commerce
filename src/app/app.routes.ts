import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { SignupComponent } from './components/signup/signup.component';
import { ForgotPasswordComponent } from './components/forgot-password/forgot-password.component';
import { CartComponent } from './components/cart/cart.component';
import { CheckoutComponent } from './components/checkout/checkout.component';
import { authGuard } from './auth.guard';
import { OrderDetailsComponent } from './components/order-details/order-details.component';
import { UserMoreDetailsComponent } from './components/user-more-details/user-more-details.component';
import { AddressComponent } from './components/address/address.component';
import { ProductDetailsComponent } from './components/product-details/product-details.component';

export const routes: Routes = [
    {path:'login',component:LoginComponent},
    {path:'',component:HomeComponent},
    {path:'search/:searchQuery',component:HomeComponent},
    {path:'signUp',component:SignupComponent},
    {path:'forgotPassword',component:ForgotPasswordComponent},
    {path:'cart',component:CartComponent },
    {path:'cart/:address',component:CartComponent},
    // {path:'cart',redirectTo:'login',pathMatch:'full'},
    // {path:'cart',redirectTo:'checkout',pathMatch:'full'},
    {path:'checkout',component:CheckoutComponent,canActivate:[authGuard] },
    {path:'order_details/:orderId',component:OrderDetailsComponent},
    {path:'user_details',component:UserMoreDetailsComponent},
    {path:'user_address',component:AddressComponent},
    {path:'product_details/:productId',component:ProductDetailsComponent},
    {path:"category/:category/:subCategory",component:HomeComponent},
    {path:"edit_address/:address",component:UserMoreDetailsComponent}
];
