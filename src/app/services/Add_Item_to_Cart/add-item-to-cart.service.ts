import { Injectable } from '@angular/core';
import { jwtDecode } from 'jwt-decode';
import { RepeatServicesService } from '../Repeat Services/repeat-services.service';
import { CartService } from '../Cart/cart.service';
import { CartLengthService } from '../Cart_length/cart-length.service';

@Injectable({
  providedIn: 'root'
})
export class AddItemToCartService {

  constructor(public repeat_service: RepeatServicesService,public add_to_cart_service:CartService,public cart_length_service:CartLengthService) { }

  add_ItemToCart(e:any){
    let localStoarageData = localStorage.getItem('cartData');
  
    let token = sessionStorage.getItem('token')
    let decode
    let userId
    let length
    if(token){
      decode = jwtDecode(token)
      userId = (decode as any).user.id
    }
  
    // if user Logged In
    if(userId){
      // Update database 
       if(localStoarageData !== null){
        console.log("local Se hu")
        this.repeat_service.AfterLoginService(localStoarageData,userId)
        this.add_to_cart_service.getLength(userId).subscribe(data => {
          console.log("Lengthhh from apppi ",data)
          length = data.length == 0 ?  data.length + 1 : data.length;
          this.cart_length_service.updateLength(length)
         })
       }
  
       // new Item to database
       else{
        console.log('new hu')
          const data = {
            productId:e._id,
            userId:userId,
            quantity:1
          }
  
          this.add_to_cart_service.addToCartService(data).subscribe(res => {
            console.log(res)
            this.add_to_cart_service.getLength(userId).subscribe(data => {
              console.log("Lengthhh from apppi ",data)
              length = data.length;
              this.cart_length_service.updateLength(length)
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
        length = oldCartData.length
        this.cart_length_service.updateLength(length)
        let updateData = JSON.stringify(oldCartData)
        localStorage.setItem('cartData',updateData)
      }
      else{
        console.log("First time data")
        let newData:any[] = []
        newData.push(cartData)
        // update cart length
        length = newData.length
        console.log("Your new length",length)
        this.cart_length_service.updateLength(1)
        let jsonData = JSON.stringify(newData)
        localStorage.setItem('cartData',jsonData)
      }
      // this.addEvent.emit(this.selectedItem)
      
    }
  }
}
