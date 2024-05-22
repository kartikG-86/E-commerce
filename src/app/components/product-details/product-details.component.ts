import { Component } from '@angular/core';
import { NavbarComponent } from '../navbar/navbar.component';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { AlldataService } from '../../services/All Data/alldata.service';
import { CommonModule } from '@angular/common';
import { AddItemToCartService } from '../../services/Add_Item_to_Cart/add-item-to-cart.service';

@Component({
  selector: 'app-product-details',
  standalone: true,
  imports: [NavbarComponent,RouterLink,CommonModule,RouterLink],
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.css'
})
export class ProductDetailsComponent {

  productId:any
  productDetails:any
  added_message = false

  constructor(public router:Router,public route:ActivatedRoute,public data_service:AlldataService,public add_item_cart:AddItemToCartService){
     this.route.paramMap.subscribe((params) => {
      this.productId = params.get('productId');
      this.data_service.getProductDetails(this.productId).subscribe((res) => {
           this.productDetails = res.product
      })
     })
  }

  addToCart(e:any){
    this.add_item_cart.add_ItemToCart(e)
    this.added_message = true
    setTimeout(() => {
      this.added_message = false
    })
  }



}
