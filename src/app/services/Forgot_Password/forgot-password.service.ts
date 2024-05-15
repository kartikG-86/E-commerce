import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ForgotPasswordService {

  constructor(public http:HttpClient) { }

  updatePassword(data:any){
     const headers = new HttpHeaders({'Content-type':"application/json"})
     return this.http.post<any>("http://localhost:3000/api/auth/forgotPassword",data,{headers})
  }
}
