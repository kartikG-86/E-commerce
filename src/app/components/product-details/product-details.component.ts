import { Component } from '@angular/core';
import { NavbarComponent } from '../navbar/navbar.component';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { AlldataService } from '../../services/All Data/alldata.service';
import { CommonModule } from '@angular/common';

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

  constructor(public router:Router,public route:ActivatedRoute,public data_service:AlldataService){
     this.route.paramMap.subscribe((params) => {
      this.productId = params.get('productId');
      console.log(this.productId)
      this.data_service.getProductDetails(this.productId).subscribe((res) => {
           this.productDetails = res.product
      })
     })
  }



}
