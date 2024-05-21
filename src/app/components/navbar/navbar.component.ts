import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges,NgModule } from '@angular/core';
import { Route, Router, RouterLink, RouterLinkActive } from '@angular/router';
import { CartLengthService } from '../../services/Cart_length/cart-length.service';
import { jwtDecode } from 'jwt-decode';
import { BehaviorSubject, Subject } from 'rxjs';
import { CartService } from '../../services/Cart/cart.service';
import { FormsModule, NgModel } from '@angular/forms';
import { AlldataService } from '../../services/All Data/alldata.service';
import { GetUserService } from '../../services/Get_User/get-user.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink,RouterLinkActive,CommonModule,FormsModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent implements OnInit {

 
 cart_length:any
 subject:any
 searchQuery: string = '';
 lastString:string = ""
 showSearchBox:boolean = false
 all_data:any
 searchData:any[] = []
 userName:any
 token:any

 constructor(public cartService:CartService,public cart_length_service:CartLengthService,public router:Router,public data_servic:AlldataService,public get_user:GetUserService,){
  this.token = sessionStorage.getItem('token')
  this.cart_length = 0
  // this.subject = new BehaviorSubject<number>(100)
  // // this.subject.next(1)
  // this.subject.subscribe((data:any)=>this.length = data)
    // update cart Length
 }

 ngOnInit(){
  this.cartLength()

  // decode token  and get userName
  
  if(this.token !== null){
    let decode = jwtDecode(this.token)
    let userId = (decode as any).user.id
  
  this.get_user.getUserDetails(userId).subscribe((res) => {
       console.log(res)
       this.userName = res.user.userName[0].toUpperCase()
       
    })
  }

  // get All data from database
  this.all_data = this.data_servic.getAllData().subscribe((res) => {
    this.all_data = res
  })


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
      console.log(userId)
      this.cartService.getLength(userId).subscribe((res)=>{
        this.cartLength = res
      })
   }
   else{
    let localStorageData = localStorage.getItem('cartData')
    if(localStorageData !== null){
      let parseData = JSON.parse(localStorageData as any)
      this.cart_length = parseData.length
       this.cart_length_service.subject.subscribe((res) => {
        console.log("NO token",res)
         this.cart_length = res
       })

    }
    else{
      this.cart_length_service.subject.subscribe((res) => {
        this.cart_length = res
      })
    }
   }

 }

 logOut(){
    sessionStorage.removeItem('token')
    window.location.reload()
    this.router.navigateByUrl('/')
 }

 @Output() searchEvent = new EventEmitter()
 search_query(){
   this.router.navigateByUrl(`/search/${this.searchQuery}`)
 }

 inputData(e:any){
  this.searchQuery = e.target.value
  // console.log(this.searchQuery)
  // if(this.searchQuery == ""){
  //   this.showSearchBox = false
  // }
  // else{
  //   this.showSearchBox = true
  // }
  // this.searchData = []
  // this.all_data.map((item:any) => {
  //   if(item.title.toLowerCase().includes(this.searchQuery.toLowerCase())){
  //     this.searchData.push(item)
  //   }
  // })
  // console.log(this.searchData)
 }

 @Input() data:any[] = []
//  get filteredItems() {
//   return this.data.filter(item =>
//     item.title.toLowerCase().includes(this.searchQuery.toLowerCase())
//   );
// }

}
