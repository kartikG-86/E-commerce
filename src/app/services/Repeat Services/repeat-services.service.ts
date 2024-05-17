import { Injectable } from '@angular/core';
import { CartService } from '../Cart/cart.service';
import { CartLengthService } from '../Cart_length/cart-length.service';

@Injectable({
  providedIn: 'root'
})
export class RepeatServicesService {

  constructor(public add_to_cart_service:CartService,public cart_length_service:CartLengthService) { }

   AfterLoginService(localStoarageData:any,userId:any){
    if(localStoarageData !== null){
      let oldCartData = JSON.parse(localStoarageData)
      this.cart_length_service.updateLength(oldCartData.length)
      oldCartData.map((item:any)=>{
       const data = {
         productId:item._id,
         userId:userId,
         quantity:item.quantity
        }
        this.add_to_cart_service.addToCartService(data).subscribe((res)=>{
         console.log(res)
        })
        this.add_to_cart_service.getLength(userId).subscribe((res) => {
          this.cart_length_service.updateLength(res.length)
        })
      })   
      localStorage.removeItem('cartData')
    }
   }
}
