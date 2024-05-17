import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { CartLengthService } from '../../services/Cart_length/cart-length.service';
import { jwtDecode } from 'jwt-decode';
import { BehaviorSubject, Subject } from 'rxjs';
import { CartService } from '../../services/Cart/cart.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink,RouterLinkActive,CommonModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent implements OnInit {

 @Input() token:any = ""
 cart_length:any
 subject:any

 constructor(public cartService:CartService,public cart_length_service:CartLengthService){
  this.token = sessionStorage.getItem('token')
  this.cart_length = 0
  // this.subject = new BehaviorSubject<number>(100)
  // // this.subject.next(1)
  // this.subject.subscribe((data:any)=>this.length = data)
    // update cart Length
 }

 ngOnInit(){
  console.log(this.token)
  this.cartLength()
  if(this.token !== null){
    let decode = jwtDecode(this.token)
    let userId = (decode as any).user.id
    this.cartService.getLength(userId).subscribe((res)=>{
      this.cart_length = res.length
    })
    
    this.cart_length_service.subject.subscribe(data => {
      console.log("Subscribe Data",data)
      this.cart_length = data 
    })
  }

  
 }

 cartLength(){
   
   if(sessionStorage.getItem('token') !== null){
      this.token = sessionStorage.getItem('token')
      let decode = jwtDecode(this.token)
      let userId = (decode as any).user.id
      this.cartService.getLength(userId).subscribe((res)=>{
        this.cartLength = res
      })
   }
   else{
    let localStorageData = localStorage.getItem('cartData')
    let parseData = JSON.parse(localStorageData as any)
    this.cart_length = parseData.length
     this.cart_length_service.subject.subscribe((res) => {
      console.log(res)
       this.cart_length = res
     })
   }

 }

}
