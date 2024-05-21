import { Component } from '@angular/core';
import { NavbarComponent } from '../navbar/navbar.component';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { GetUserService } from '../../services/Get_User/get-user.service';
import { jwtDecode } from 'jwt-decode';
import { CommonModule } from '@angular/common';
import { OrderService } from '../../services/Orders/order.service';
import { CartService } from '../../services/Cart/cart.service';
import { CartLengthService } from '../../services/Cart_length/cart-length.service';

@Component({
  selector: 'app-address',
  standalone: true,
  imports: [NavbarComponent,RouterLink,RouterLinkActive,CommonModule],
  templateUrl: './address.component.html',
  styleUrl: './address.component.css'
})
export class AddressComponent {

  user:any
  userId:any
  selectIndex:any
  constructor(public get_user:GetUserService,public orders:OrderService,public cart_service : CartService,public cart_length_service:CartLengthService,public router:Router){
    let token = sessionStorage.getItem('token')
    if(token != null){
      let decode = jwtDecode(token)
       this.userId = (decode as any).user.id
    }
     this.get_user.getUserDetails(this.userId).subscribe((res) => {
      console.log(res)
      this.user = res.user
     })
   
  }

  select_address(e:any,index:any) {
    console.log(e)
    this.selectIndex = index
    let new_order_data = localStorage.getItem('checkoutData');
    new_order_data = JSON.parse(new_order_data as any)
    let token = sessionStorage.getItem('token')
    let decode = jwtDecode(token as any)
    let userId = (decode as any).user.id
    let data = {
      orders:(new_order_data as any).orders,
      address:e
    }
    console.log(data)
    localStorage.setItem('checkoutData',JSON.stringify(data))

        //   this.orders.newOrder(data).subscribe((res) => {
        //     console.log(res)
        //     this.cart_service.emptyCart(userId).subscribe((res) =>{
        //       console.log(res)
        //       this.cart_length_service.updateLength(0)
        //       this.router.navigateByUrl('/checkout')
        //      localStorage.removeItem('checkoutData')
        //     })
        // })
  }


}
