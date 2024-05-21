import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AlldataService {

  constructor(private http:HttpClient) { }


  pageData(page:any) {
    return this.http.get(`http://localhost:3000/api/products/${page}`);
  }

  getAllData(){
    return this.http.get('http://localhost:3000/api/products/all/prodcuts')
  }

  getProductDetails(productId:any){
    return this.http.get<any>(`http://localhost:3000/api/products/product_details/${productId}`)
  }

  getSearchProducts(searchString:any){
    return this.http.get<any>(`http://localhost:3000/api/products/search/${searchString}`)
  }
}
