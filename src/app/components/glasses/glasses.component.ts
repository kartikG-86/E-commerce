import { CommonModule } from '@angular/common';
import {  Component, EventEmitter, HostListener, Input, OnInit, Output, ViewChild } from '@angular/core';
import { jwtDecode } from 'jwt-decode';
import { CartService } from '../../services/Cart/cart.service';
import { RepeatServicesService } from '../../services/Repeat Services/repeat-services.service';
import { CartLengthService } from '../../services/Cart_length/cart-length.service';
import { HomeComponent } from '../home/home.component';
import { Subject } from 'rxjs';
import { NavbarComponent } from '../navbar/navbar.component';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { AddItemToCartService } from '../../services/Add_Item_to_Cart/add-item-to-cart.service';
@Component({
  selector: 'app-glasses',
  standalone: true,
  imports: [CommonModule,RouterLink,RouterLinkActive],
  templateUrl: './glasses.component.html',
  styleUrl: './glasses.component.css'
})
export class GlassesComponent implements OnInit  {
  
  @Input() data:any[];
  
  token:any
  decode:any
  userId:any
  length: any
  @Input() isLoading:any
  page:any

  @Output() pageEvent = new EventEmitter()
  private subject = new Subject()
  
  constructor(public add_to_cart_service:CartService,public repeat_service:RepeatServicesService,public cart_length_service:CartLengthService,public add_item_cart:AddItemToCartService){
    this.data = []
    this.length = 0
    this.page  = 1
  }
  
  ngOnInit() {
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

  this.itemCartSno = e._id


   this.add_item_cart.add_ItemToCart(e)  

  this.itemCartButtonText = "Your item added  to cart"
  setTimeout(()=>{
   this.itemCartButtonText = "Add to Cart"
  },1500)
   
}

// productDetails(e:any){
//   console.log(e)
// }
}
