import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DeleteUserAddressService {

  constructor(public http:HttpClient) { }

  delete_user_address(data:any){
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post<any>('http://localhost:3000/api/auth/delete_address',data,{headers})
  }
}
