import { Component, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { NavbarComponent } from '../navbar/navbar.component';
import { CommonModule } from '@angular/common';
import { jwtDecode } from 'jwt-decode';
import { CartService } from '../../services/Cart/cart.service';
import { Router,RouterLink } from '@angular/router';
import { CartLengthService } from '../../services/Cart_length/cart-length.service';
import { OrderService } from '../../services/Orders/order.service';
import { GetUserService } from '../../services/Get_User/get-user.service';
@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [NavbarComponent,CommonModule,RouterLink],
  
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css'
})
export class CartComponent  implements OnInit {

  token:any = ""
  decode:any
  userId:any
  constructor(public cart_service : CartService , private router:Router,public cart_length_service:CartLengthService , public route:Router,public get_user:GetUserService,public orders:OrderService){
    this.token = sessionStorage.getItem('token')
    console.log(this.token,"Your tokeeeen")
    if(this.token){
       this.decode = jwtDecode(this.token)
       this.userId = this.decode.user.id
       console.log("Cart",this.userId)
    }
  }

  ngOnInit(){
    
    console.log("CArt",this.token)
    if(this.token){
      this.getUpdatedCartItems_from_database()
    }
    else{
      this.getCartItems_from_local()
       console.log("This cart length",this.cart.length)
      this.cart_length_service.updateLength(this.cart.length)
    }
  }



cart:any[]  = []
  selectQuantity:number = 1
  maxQuantity = [1,2,3,4,5]
  itemSelected:number = -1
  index:number = 0
  deliveryCharge:number = 70
  checkFreeDelivery:boolean = false
  totalPrice:number = 0

  showSuccessMessage:boolean = false

  getUpdatedCartItems_from_database(){
    this.cart_service.getCartItems(this.userId).subscribe((res:any)=>{
      console.log(res)
      this.cart = res
      this.cart_length_service.updateLength(this.cart.length)
      this.calculatePrice(this.cart)
    })
  }

  getCartItems_from_local(){
    let localData = localStorage.getItem('cartData')
    if(localData){
      let jsonParseData = JSON.parse(localData as any)
      this.cart  = jsonParseData
      this.cart_length_service.updateLength(this.cart.length)
      this.calculatePrice(this.cart)
    }
    else{
      this.cart = []
      this.cart_length_service.updateLength(0)
    }
  }



  calculatePrice(cart:any){
    this.totalPrice = 0
    this.cart.map((item)=>{
      this.totalPrice += item.finalPrice * item.quantity 
      console.log(this.totalPrice)
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

  increaseQuantity(e:any,new_quantity:any){
    console.log(e)
    this.cart[this.index].quantity = new_quantity
    if(localStorage.getItem('cartData') !== null){
      localStorage.setItem('cartData',JSON.stringify(this.cart))
    }
    else{
      const data = {
        productId:e,
        quantity:new_quantity
      }
      this.cart_service.update_quantity(data).subscribe((res)=>{
        console.log(res)
      })
    }
    this.calculatePrice(this.cart)
  }

  itemSelect(e:any){
    console.log(e)
    this.index = this.cart.findIndex((cartItem)=>  cartItem._id == e)
  }

  deleteItem(e:any){
    if(localStorage.getItem('cartData') !== null){
      console.log(e,this.cart,"line 134")
       this.cart = this.cart.filter((item)=> item._id != e._id)
       this.cart_length_service.updateLength(this.cart.length)
       localStorage.setItem('cartData',JSON.stringify(this.cart))
       this.calculatePrice(this.cart)
    }
    else{
      console.log("cart Id",e)
      this.cart_service.deleteCartItems(e.cartId).subscribe((res)=>{
        console.log(res)
        this.getUpdatedCartItems_from_database()
      })
    }
  }

  proceedCheckout(){
    if(this.token){
      let orderedData:any[] = []
      this.cart.map((item) =>{
          let orderObject = {
            productId:item._id,
            placedUserId:this.userId,
            quantity:item.quantity
          }
          orderedData.push(orderObject)
      })
      let new_order_data = {
        orders:orderedData
      }
      console.log(new_order_data)

      localStorage.setItem('checkoutData',JSON.stringify(new_order_data))


      // check Address
      this.get_user.getUserDetails(this.userId).subscribe((res) =>{
        console.log(res)
        if(res.user.address == ""){
          this.router.navigateByUrl('/user_details')
        }
        else{
          this.orders.newOrder(new_order_data).subscribe((res) => {
            console.log(res)
            this.cart_service.emptyCart(this.userId).subscribe((res) =>{
              console.log(res)
              this.cart_length_service.updateLength(0)
            })
            this.router.navigateByUrl('/checkout')
           localStorage.removeItem('checkoutData')
        })
        }

      })
      

    }
    else{
      this.route.navigate(['/login'],{queryParams:{returnUrl:'checkout'}})
    }
  }

}
