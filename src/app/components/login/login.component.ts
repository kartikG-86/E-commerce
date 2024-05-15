import { Component } from '@angular/core';
import { FormsModule, NgModel } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { LoginService } from '../../services/Login/login.service';
import { CommonModule } from '@angular/common';
import { jwtDecode } from 'jwt-decode';
@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule,RouterLink,CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  constructor(public loginService:LoginService){}

  status:boolean = false
  message:string  = ''

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

      sessionStorage.setItem('token',res.token)
      setTimeout(()=>{
       this.status = false
      },1500)
    })
    e.form.reset()
  }



}
