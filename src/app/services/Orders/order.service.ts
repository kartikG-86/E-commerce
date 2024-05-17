import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(public http:HttpClient) {  }

  newOrder(data:any){
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post<any>('http://localhost:3000/api/orders/new_order', data, { headers });

  }

  getOrders(userId:any){
     return this.http.get<any>(`http://localhost:3000/api/orders/orders/${userId}`)
  }

  getOrderDetails(orderId:any){
    return this.http.get<any>(`http://localhost:3000/api/orders/order_details/${orderId}`)
  }


}
