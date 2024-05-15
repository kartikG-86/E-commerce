import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule,NgModel } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { ForgotPasswordService } from '../../services/Forgot_Password/forgot-password.service';
@Component({
  selector: 'app-forgot-password',
  standalone: true,
  imports: [FormsModule,RouterLink,CommonModule],
  templateUrl: './forgot-password.component.html',
  styleUrl: './forgot-password.component.css'
})
export class ForgotPasswordComponent {

  constructor(public forgotPasswordService:ForgotPasswordService){}

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
      setTimeout(()=>{
       this.status = false
      },1500)
    })
    e.form.reset()
  }

}
