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
        this.repeat_service.AfterLoginService(localStoarageData,userId)
        this.add_to_cart_service.getLength(userId).subscribe(data => {
          length = data.length == 0 ?  data.length + 1 : data.length;
          this.cart_length_service.updateLength(length)
         })
       }
  
       // new Item to database
       else{
          const data = {
            productId:e._id,
            userId:userId,
            quantity:1
          }
  
          this.add_to_cart_service.addToCartService(data).subscribe(res => {
            this.add_to_cart_service.getLength(userId).subscribe(data => {
              length = data.length;
              this.cart_length_service.updateLength(length)
             })
          })
       }
    }
  
    //if user not logged In
    else{
       let  cartData = {...e}
      cartData.quantity = 1
      
      if(localStoarageData !== null){
        let oldCartData = JSON.parse(localStoarageData)
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
        let newData:any[] = []
        newData.push(cartData)
        // update cart length
        length = newData.length
        this.cart_length_service.updateLength(1)
        let jsonData = JSON.stringify(newData)
        localStorage.setItem('cartData',jsonData)
      }
      // this.addEvent.emit(this.selectedItem)
      
    }
  }
}
