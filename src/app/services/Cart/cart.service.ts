import { HttpClient, HttpHeaders } from '@angular/common/http';
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

  addToCartService(data:any){
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post<any>(`http://localhost:3000/api/cart/add_to_cart`,data,{headers})
  }

  deleteCartItems(cartId:any){
    return this.http.delete<any>(`http://localhost:3000/api/cart/delete_cart_product/${cartId}`)
  }

  update_quantity(data:any){
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post<any>(`http://localhost:3000/api/cart/update_quantity`,data,{headers})
  }

  getLength(userId:any){
    return this.http.get<any>(`http://localhost:3000/api/cart/cart-length/${userId}`)
  }

  emptyCart(userId:any){
    console.log(userId)
    return this.http.get<any>(`http://localhost:3000/api/cart/empty_cart/${userId}`)
  }
}


