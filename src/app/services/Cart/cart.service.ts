import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { jwtDecode } from 'jwt-decode';
@Injectable({
  providedIn: 'root'
})
export class CartService {


  constructor(public http:HttpClient) {

   }

  getCartItems(userId:any){
    return this.http.get<any>(`http://localhost:3000/api/cart/cart_products/${userId}`)
  }
}
