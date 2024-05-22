import { Component, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { NavbarComponent } from '../navbar/navbar.component';
import { CommonModule } from '@angular/common';
import { jwtDecode } from 'jwt-decode';
import { CartService } from '../../services/Cart/cart.service';
import { ActivatedRoute, Router,RouterLink } from '@angular/router';
import { CartLengthService } from '../../services/Cart_length/cart-length.service';
import { OrderService } from '../../services/Orders/order.service';
import { GetUserService } from '../../services/Get_User/get-user.service';
import { SelectAddressComponent } from '../select-address/select-address.component';
import { AddressComponent } from '../address/address.component';
@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [NavbarComponent,CommonModule,RouterLink,SelectAddressComponent,AddressComponent],
  
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css'
})
export class CartComponent  implements OnInit {

  token:any
  decode:any
  userId:any
  selectAddress  = ""
  constructor(public cart_service : CartService , private router:Router,public cart_length_service:CartLengthService , public route:ActivatedRoute,public get_user:GetUserService,public orders:OrderService){
    
      this.token = sessionStorage.getItem('token')
      this.decode = jwtDecode(this.token)
      this.userId = this.decode.user.id
    
    
    this.route.paramMap.subscribe((item)=>{
     this.selectAddress = item.get('address') as any
    })

  }

  ngOnInit(){
    
    if(this.token != null){
      this.getUpdatedCartItems_from_database()
    }
    else{
   
      
      this.getCartItems_from_local()
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
      })
    }
    this.calculatePrice(this.cart)
  }

  itemSelect(e:any){
    this.index = this.cart.findIndex((cartItem)=>  cartItem._id == e)
  }

  deleteItem(e:any){
    if(localStorage.getItem('cartData') !== null){
       this.cart = this.cart.filter((item)=> item._id != e._id)
       this.cart_length_service.updateLength(this.cart.length)
       localStorage.setItem('cartData',JSON.stringify(this.cart))
       this.calculatePrice(this.cart)
    }
    else{
      this.cart_service.deleteCartItems(e.cartId).subscribe((res)=>{
        this.getUpdatedCartItems_from_database()
      })
    }
  }

  proceedCheckout(){

    if(this.selectAddress == "address" && this.token){
      let data = localStorage.getItem('checkoutData')
      let parseData = JSON.parse(data as any)
                this.orders.newOrder(parseData).subscribe((res) => {
            this.cart_service.emptyCart(this.userId).subscribe((res) =>{
              this.cart_length_service.updateLength(0)
              this.router.navigateByUrl('/checkout')
             localStorage.removeItem('checkoutData')
            })
        })
    }

    else if(this.token){
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
        orders:orderedData,
      }

      localStorage.setItem('checkoutData',JSON.stringify(new_order_data))


      // check Address
      this.get_user.getUserDetails(this.userId).subscribe((res) =>{
        if((res.user.addresses as any).length == 0){
          this.router.navigateByUrl('/user_details')
        }
        else{
          this.router.navigateByUrl('/cart/address')

          // let new_order_data = {
          //   orders:orderedData,
          //   address:res.user.addresses[0]
          // }
          localStorage.setItem('checkoutData',JSON.stringify(new_order_data))

        }
      })
    }
    else{
      this.router.navigate(['/login'],{queryParams:{returnUrl:'checkout'}})
    }
  }

}
