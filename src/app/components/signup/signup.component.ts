import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormsModule,NgModel } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { SignupService } from '../../services/SignUp/signup.service';
import { CommonModule } from '@angular/common';
import { jwtDecode } from 'jwt-decode';
import { RepeatServicesService } from '../../services/Repeat Services/repeat-services.service';
@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [FormsModule,RouterLink,CommonModule],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css'
})
export class SignupComponent implements OnInit {

  nextUrl:any
  constructor(public signUpService:SignupService , public router:Router,public route:ActivatedRoute,public repeat_service:RepeatServicesService){}

  ngOnInit(): void {
    this.nextUrl = this.route.snapshot.queryParams["returnUrl"] || '/'
    console.log("Sign Up return url",this.nextUrl)
  }
  
  status:any = 0
  message:string = ""
  resStatus:any = 0
  

  signUp(e:any){
   console.log(e.form.value)
   const data = {
    email:e.form.value.email,
    password:e.form.value.password,
    userName:e.form.value.username
   }

   this.signUpService.postNewUserData(data).subscribe(res => {
    console.log(res)
    this.status = true
    
    this.message = res.message

    // store token as session
    sessionStorage.setItem('token',res.token)
    let userId = (jwtDecode(res.token) as any).user.id
    let localStoarageData = localStorage.getItem('cartData')
    this.repeat_service.AfterLoginService(localStoarageData,userId)

    setTimeout(()=>{
      this.status = false;
      console.log(this.nextUrl == "/checkout" ? '/cart' : '/')
      this.router.navigateByUrl(this.nextUrl == 'checkout' ? "/cart" : '/')
    },1500)
   })
   e.form.reset()
  }





}
