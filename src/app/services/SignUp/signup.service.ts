import { HttpClient, HttpHeaders,HttpClientModule } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SignupService {

  constructor(public http:HttpClient) { }

  postNewUserData(data:any){
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post<any>('http://localhost:3000/api/auth/signUp', data, { headers });

  }
}
