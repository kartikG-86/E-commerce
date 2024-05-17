import { Component, OnInit } from '@angular/core';
import { FormsModule, NgModel } from '@angular/forms';
import { RouterLink,Router ,ActivatedRoute} from '@angular/router';
import { LoginService } from '../../services/Login/login.service';
import { CommonModule } from '@angular/common';
import { jwtDecode } from 'jwt-decode';
import { RepeatServicesService } from '../../services/Repeat Services/repeat-services.service';
import { CartLengthService } from '../../services/Cart_length/cart-length.service';
import { CartService } from '../../services/Cart/cart.service';
@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule,RouterLink,CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit {

  nextUrl:any
  constructor(public loginService:LoginService,public repeat_service:RepeatServicesService,public router:Router,public route:ActivatedRoute,public cart_service:CartService,public cart_length_service:CartLengthService){
   
  }

  ngOnInit(): void {
    this.nextUrl = this.route.snapshot.queryParams['returnUrl'] || '/'
    console.log("Your next Url",this.nextUrl)
  }

  status:boolean = false
  message:string  = ''
  userId:any
  userToken:any

  login(e:any){
    console.log(e.form.value)
    const data = {
      email:e.form.value.email,
      password:e.form.value.password
    }

    this.loginService.postLoginUser(data).subscribe((res)=>{
      console.log(res)
      this.status = true
      this.message = res.message
      
      this.userToken = res.token
      console.log()
      sessionStorage.setItem('token',res.token)

          // store localStorage data to database if present
    let localStoarageData = localStorage.getItem('cartData')
    
    if(localStoarageData !== null){
      // get userId from token
      console.log("from Login hoo",localStoarageData,this.userToken)
      if(this.userToken){
        let decode = jwtDecode(this.userToken)
        this.userId = (decode as any).user.id
      }

      this.repeat_service.AfterLoginService(localStoarageData,this.userId)
      
    }
    else{
      if(this.userToken){
        let decode = jwtDecode(this.userToken)
        this.userId = (decode as any).user.id
      }
      this.cart_service.getLength(this.userId).subscribe((res) => {
          console.log('not local storage',res)
          this.cart_length_service.updateLength(res.length)
      })
    }
      setTimeout(()=>{
       this.status = false
       this.router.navigateByUrl(this.nextUrl)
      },1500)
    })
   
    e.form.reset()
    


  }



}
