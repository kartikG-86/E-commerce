import { Component, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { NavbarComponent } from '../navbar/navbar.component';
import { CommonModule } from '@angular/common';
import { jwtDecode } from 'jwt-decode';
import { CartService } from '../../services/Cart/cart.service';
@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [NavbarComponent,CommonModule],
  
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css'
})
export class CartComponent  implements OnInit {

  token:any = ""
  decode:any
  userId:any
  constructor(public cart_service : CartService){
    this.token = sessionStorage.getItem('token')
    if(this.token){
       this.decode = jwtDecode(this.token)
       this.userId = this.decode.user.id
       console.log("Cart",this.userId)
    }
  }

   
//   cart = [    {
//     sno:1,
//   imgUrl:'https://www.ClearDekho.com/wp-content/uploads/2023/03/3143D-copy-768x768.jpg',
//   title:'ShadySavvy Silver Full Rim Aviator - Eyeglass',
//   category:'EyeGlasses',
//   originalPrice:599,
//   finalPrice:199,
//   gender:'men',
//   quantity:1
// },
//   {
//     sno:2,
//   imgUrl:'https://www.ClearDekho.com/wp-content/uploads/2023/04/3454D-copy-768x768.jpg',
//   title:'ShadySavvy Floral Blue Full Rim Wayfarer – Eyeglass',
//   category:'EyeGlasses',
//   originalPrice:799,
//   finalPrice:299,
//   gender:'men',
//   quantity:1
// },
//   {
//     sno:3,
//   imgUrl:'https://www.ClearDekho.com/wp-content/uploads/2023/06/3611D-copy-768x768.jpg',
//   title:'ShadySavvy Black Full Rim Oval – Eyeglasses',
//   category:'EyeGlasses',
//   originalPrice:999,
//   finalPrice:499,
//   gender:'men',
//   quantity:1
// },]

cart:any[]  = []





  selectQuantity:number = 1
  maxQuantity = [1,2,3,4,5]
  itemSelected:number = -1
  index:number = 0
  deliveryCharge:number = 70
  checkFreeDelivery:boolean = false
  totalPrice:number = 0

  showSuccessMessage:boolean = false

  ngOnInit(){
    this.calculatePrice()
    console.log("CArt",this.token)
    
    this.cart_service.getCartItems(this.userId).subscribe((res:any)=>{
      this.cart = res
    })


  }


  calculatePrice(){
    this.totalPrice = 0
    this.cart.map((item)=>{
      this.totalPrice += item.finalPrice * item.quantity 
    })
    if(this.totalPrice < 1000){
      this.totalPrice += this.deliveryCharge
      this.checkFreeDelivery = false
    }
    else{
      this.checkFreeDelivery = true
      this.showSuccessMessage = true
      setTimeout(()=>{
        this.showSuccessMessage = false
      },2000)
    }
  }

  increaseQuantity(e:any){
    console.log(e)
   
    this.cart[this.index].quantity = e
    this.calculatePrice()
  }

  itemSelect(e:any){
    console.log(e)
    
    this.index = this.cart.findIndex((cartItem)=>  cartItem.sno == e)
  }

  delete(e:any){
    this.cart = this.cart.filter((item)=> item.sno != e)
    this.calculatePrice()
  }
}
