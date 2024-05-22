import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CategoryProductsService {

  constructor(public http:HttpClient) { }

  get_category_products(category:any,subCategory:any){
    return this.http.get<any>(`http://localhost:3000/api/products/category/${category}/${subCategory}`)

  }
}
