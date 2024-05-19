import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from './components/navbar/navbar.component';
import { MainHeadingComponent } from './components/main-heading/main-heading.component';
import { CategoryComponent } from './components/category/category.component';
import { GlassesComponent } from './components/glasses/glasses.component';
import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { HttpClientModule } from '@angular/common/http';
import { AlldataService } from './services/All Data/alldata.service';
import { SignupService } from './services/SignUp/signup.service';
import { LoginService } from './services/Login/login.service';
import { ForgotPasswordService } from './services/Forgot_Password/forgot-password.service';
import { CartService } from './services/Cart/cart.service';
import { RepeatServicesService } from './services/Repeat Services/repeat-services.service';
import { CartLengthService } from './services/Cart_length/cart-length.service';
import { OrderService } from './services/Orders/order.service';
import { GetUserService } from './services/Get_User/get-user.service';
import { UserMoreDetailsService } from './services/Add_User_Details/user-more-details.service';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,NavbarComponent,MainHeadingComponent,CategoryComponent,GlassesComponent,LoginComponent,HomeComponent,HttpClientModule],
  providers:[AlldataService,SignupService,LoginService,ForgotPasswordService,CartService,RepeatServicesService,CartLengthService,NavbarComponent,OrderService,GetUserService,UserMoreDetailsService],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'e-commerce';


}
