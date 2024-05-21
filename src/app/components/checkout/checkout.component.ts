import { Component } from '@angular/core';
import { NavbarComponent } from '../navbar/navbar.component';
import { CommonModule } from '@angular/common';
import { OrderService } from '../../services/Orders/order.service';
import { jwtDecode } from 'jwt-decode';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-checkout',
  standalone: true,
  imports: [NavbarComponent,CommonModule,RouterLink],
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.css'
})
export class CheckoutComponent {
  token:any
  decode:any
  userId:any
  checkoutData:any
  detailsUrl:any
  placedDate:any
  constructor(public order_service:OrderService,public router:Router){
    this.token = sessionStorage.getItem('token')
    if(this.token){
      this.decode = jwtDecode(this.token)
      this.userId = this.decode.user.id
    }
    this.order_service.getOrders(this.userId).subscribe((res) => {
      console.log(res)
      this.checkoutData = res.orders

      this.checkoutData.map((item:any) => {
         item.placedDate = new Date(item.placedDate)
         item.placedDate.setDate(item.placedDate.getDate() + item.estimatedDeliveryDate)
         item.placedDate = item.placedDate.toDateString()
      })

      console.log(this.checkoutData)

      this.checkoutData.reverse()
    })
  }

  buttons = [{
    index:1,
    text:"On Shipping"
  },{
    index:2,
    text:'Arrived'
  },{
    index:3,
    text:'Cancelled'
  }]

  buttonActivate:number = 1

  activeButton(i:number){
    console.log(i)
    this.buttonActivate = i
  }

  getUserLink(orderItem:any){
    return `/order_details/${orderItem._id}`

  }

}
