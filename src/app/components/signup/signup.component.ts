import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule,NgModel } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { SignupService } from '../../services/SignUp/signup.service';
import { CommonModule } from '@angular/common';
import { jwtDecode } from 'jwt-decode';
@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [FormsModule,RouterLink,CommonModule],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css'
})
export class SignupComponent {

  constructor(public signUpService:SignupService){}
  
  status:any = 0
  message:string = ""
  resStatus:any = 0
  

  signUp(e:any){
   console.log(e.form.value)
   const data = {
    email:e.form.value.email,
    password:e.form.value.password,
    name:e.form.value.username
   }

   this.signUpService.postNewUserData(data).subscribe(res => {
    console.log(res)
    this.status = true
    
    this.message = res.message

    // store token as session
    sessionStorage.setItem('userId',res.token)

    setTimeout(()=>{
      this.status = false;
    },1500)
   })
   e.form.reset()
  }





}
