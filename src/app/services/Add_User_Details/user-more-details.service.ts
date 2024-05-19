import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserMoreDetailsService {

  constructor(public http:HttpClient) { }

  User_more_details(data:any){
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post<any>('http://localhost:3000/api/auth/add_user_details',data,{headers})
  }
}
