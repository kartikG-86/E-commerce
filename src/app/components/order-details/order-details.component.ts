import { Component, OnInit } from '@angular/core';
import { NavbarComponent } from '../navbar/navbar.component';
import { ActivatedRoute, Router } from '@angular/router';
import { OrderService } from '../../services/Orders/order.service';

@Component({
  selector: 'app-order-details',
  standalone: true,
  imports: [NavbarComponent],
  templateUrl: './order-details.component.html',
  styleUrl: './order-details.component.css'
})
export class OrderDetailsComponent implements OnInit {

  orderId:any
  orderDetails:any
  constructor(public router:Router,public route:ActivatedRoute,public order_service:OrderService){
    this.orderId = this.route.paramMap.subscribe(params => {
      this.orderId = params.get('orderId')
      this.order_service.getOrderDetails(this.orderId).subscribe((res) =>{
        this.orderDetails = res.orderDetails
      })
    })
  }

  ngOnInit(): void {
    
  } 

  getDateObject(e:any){
    return new Date(e).toDateString()
  }
}
