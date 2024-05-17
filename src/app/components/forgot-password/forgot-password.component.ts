import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule,NgModel } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { ForgotPasswordService } from '../../services/Forgot_Password/forgot-password.service';
import { RepeatServicesService } from '../../services/Repeat Services/repeat-services.service';
import { jwtDecode } from 'jwt-decode';
@Component({
  selector: 'app-forgot-password',
  standalone: true,
  imports: [FormsModule,RouterLink,CommonModule],
  templateUrl: './forgot-password.component.html',
  styleUrl: './forgot-password.component.css'
})
export class ForgotPasswordComponent {

  nextUrl:any
  userId:any
  constructor(public forgotPasswordService:ForgotPasswordService,public router:Router,public route:ActivatedRoute,public repeat_service:RepeatServicesService){
    this.nextUrl = this.route.snapshot.queryParams['returnUrl'] || '/' 
  }

  status:boolean = false
  message:string = ""

  forgotPassword(e:any){
    console.log(e.form.value)


    const data = {
      email:e.form.value.email,
      newPassword:e.form.value.newPassword,
      confirmPassword:e.form.value.confirmPassword
    }
    
    this.forgotPasswordService.updatePassword(data).subscribe((res)=>{
      console.log(res)
      this.status = true
      this.message = res.message
      sessionStorage.setItem('token',res.token)
      let localStoarageData = localStorage.getItem('cartData')
      let decode = jwtDecode(res.token)
      this.userId = (decode as any).user.id
      this.repeat_service.AfterLoginService(localStoarageData,this.userId)

      setTimeout(()=>{
       this.status = false
       this.router.navigateByUrl(this.nextUrl == 'checkout' ? '/cart' : '/')
      },1500)
    })
    e.form.reset()
  }

}
