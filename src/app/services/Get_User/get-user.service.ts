import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GetUserService {

  constructor(public http:HttpClient) { }
   
  getUserDetails(userId:any){
    return this.http.get<any>(`http://localhost:3000/api/auth/user/${userId}`)
  }

}
