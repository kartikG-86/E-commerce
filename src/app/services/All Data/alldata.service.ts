import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AlldataService {

  constructor(private http:HttpClient) { }


  getData() {
    console.log("Hi")
    return this.http.get('http://localhost:3000/api/products/');
  }

  getProductDetails(productId:any){
    return this.http.get<any>(`http://localhost:3000/api/products/product_details/${productId}`)
  }
}
