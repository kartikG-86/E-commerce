import { CommonModule } from '@angular/common';
import {  Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { jwtDecode } from 'jwt-decode';
import { CartService } from '../../services/Cart/cart.service';
import { RepeatServicesService } from '../../services/Repeat Services/repeat-services.service';
import { CartLengthService } from '../../services/Cart_length/cart-length.service';
import { HomeComponent } from '../home/home.component';
import { Subject } from 'rxjs';
import { NavbarComponent } from '../navbar/navbar.component';
@Component({
  selector: 'app-glasses',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './glasses.component.html',
  styleUrl: './glasses.component.css'
})
export class GlassesComponent implements OnInit  {
  
  @Input() data:any[];
  
  token:any
  decode:any
  userId:any
  length: any

  private subject = new Subject()
  
  constructor(public add_to_cart_service:CartService,public repeat_service:RepeatServicesService,public cart_length_service:CartLengthService){
    this.data = []
    this.length = 0

  }
  
  ngOnInit() {
    console.log("This is data",this.data)
    this.token = sessionStorage.getItem('token')
    if(this.token){
      this.decode = jwtDecode(this.token)
      this.userId = this.decode.user.id
    }
  }

  itemCartButtonText:string="Add to Cart"
  itemCartSno:number = -1


@Output() addEvent = new EventEmitter()

selectedItem = {}

addToCart(e:any){
  let localStoarageData = localStorage.getItem('cartData');
  this.itemCartSno = e._id

  this.token = sessionStorage.getItem('token')
  if(this.token){
    this.decode = jwtDecode(this.token)
    this.userId = this.decode.user.id
  }

  // if user Logged In
  if(this.userId){
    // Update database 
     if(localStoarageData !== null){
      console.log("local Se hu")
      this.repeat_service.AfterLoginService(localStoarageData,this.userId)
      this.add_to_cart_service.getLength(this.userId).subscribe(data => {
        console.log("Lengthhh from apppi ",data)
        this.length = data.length == 0 ?  data.length + 1 : data.length;
        this.cart_length_service.updateLength(this.length)
       })
     }

     // new Item to database
     else{
      console.log('new hu')
        const data = {
          productId:e._id,
          userId:this.userId,
          quantity:1
        }

        this.add_to_cart_service.addToCartService(data).subscribe(res => {
          console.log(res)
          this.add_to_cart_service.getLength(this.userId).subscribe(data => {
            console.log("Lengthhh from apppi ",data)
            this.length = data.length;
            this.cart_length_service.updateLength(this.length)
           })
        })

     }


  }

  //if user not logged In
  else{
    console.log("Bye id")
    console.log(e)
     let  cartData = {...e}
     console.log("82 line",cartData)
    cartData.quantity = 1
    console.log("Your Selected Item",cartData)
    
    if(localStoarageData !== null){
      let oldCartData = JSON.parse(localStoarageData)
      console.log("YOur old data",oldCartData)
      let findSameDataIndex = oldCartData.findIndex((item:any) => item._id == e._id)
      if(findSameDataIndex != -1){
         oldCartData[findSameDataIndex].quantity += 1
      }
      else{
        oldCartData.push(cartData)
      }
      this.length = oldCartData.length
      this.cart_length_service.updateLength(this.length)
      let updateData = JSON.stringify(oldCartData)
      localStorage.setItem('cartData',updateData)
    }
    else{
      console.log("First time data")
      let newData:any[] = []
      newData.push(cartData)
      // update cart length
      this.length = newData.length
      console.log("Your new length",this.length)
      this.cart_length_service.updateLength(1)
      let jsonData = JSON.stringify(newData)
      localStorage.setItem('cartData',jsonData)
    }
    // this.addEvent.emit(this.selectedItem)
    
  }

  this.itemCartButtonText = "Your item added  to cart"
  console.log(this.itemCartButtonText)
  setTimeout(()=>{
   this.itemCartButtonText = "Add to Cart"
  },1500)
   
}
}
