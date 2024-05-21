import { Component, EventEmitter, HostListener, Input, OnChanges, OnInit, Output } from '@angular/core';
import { NavbarComponent } from '../navbar/navbar.component';
import { MainHeadingComponent } from '../main-heading/main-heading.component';
import { CategoryComponent } from '../category/category.component';
import { GlassesComponent } from '../glasses/glasses.component';
import { LoginComponent } from '../login/login.component';
import { CommonModule } from '@angular/common';
import { AlldataService } from '../../services/All Data/alldata.service';
import { jwtDecode } from 'jwt-decode';
import { CartLengthService } from '../../services/Cart_length/cart-length.service';
import { BehaviorSubject } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
@Component({
  selector: 'app-home',
  standalone: true,
  imports: [NavbarComponent,MainHeadingComponent,CategoryComponent,GlassesComponent,LoginComponent,CommonModule,],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit,OnChanges {

  token:any
  user_id:any
  decode:any
  length:any = 0
  subject:any
  page:number = 1
  isSearch = false
  searchParams:string = ""
  constructor(public data:AlldataService,public cartLengthService:CartLengthService,public router:Router,public route:ActivatedRoute){
    this.token = sessionStorage.getItem('token')
  }

glasses:any[] = []

ngOnInit(): void {
  this.route.paramMap.subscribe((item)=>{
    this.searchParams = (item.get('searchQuery') as string)
    if(this.searchParams != null){
      this.searchData(this.searchParams)
    }
    else if(this.searchParams == null){
      this.loadMore()
    }
  })


}
copyData:any[] = []
ngOnChanges(): void {
  this.loadMore()  
}

// pageData(e:any){
//   console.log("Page number",e)
//   this.data.pageData(e).subscribe((item:any)=>{
//     console.log("Your item",item)
//     this.glasses = item;
//     this.copyData = item;
//   })
// }

isLoading: boolean = false;

@HostListener('window:scroll', [])
onScroll(): void {
  // console.log(window.innerHeight , window.scrollY , document.body.offsetHeight )
  if(this.isSearch == false){
    if ((window.scrollY >= 1216) && (window.innerHeight + window.scrollY) >= document.body.offsetHeight && !this.isLoading) {
      setTimeout(() => {
        this.loadMore();
      },300)
    }
  
    if(window.scrollY >= 2495){
      this.isLoading = false
    }
  }
}

loadMore(): void {
  this.isLoading = true;
  this.data.pageData(this.page).subscribe(res => {
    this.glasses = [...this.glasses, ...(res as  any)];
    console.log(this.glasses)
    this.page++;
    this.isLoading = false;
  });
}


sortData(e:any){
  console.log("I am from sorting",e)
  this.glasses = this.copyData.filter((item)=>{
    console.log(item);
   return item.category.toLowerCase() == e.mainCategory.toLowerCase() && item.gender.toLowerCase() == e.categoryType.toLowerCase() 
  })
  console.log("Your sort Data",this.glasses)
}

searchData(e:any){
  this.data.getSearchProducts(e).subscribe((res) => {
    this.glasses = []
    this.copyData = []
    console.log("Search Data",res)
    this.isSearch = true
    this.glasses = res
    this.copyData = res
  })
}
}
