import { AfterViewInit, Component, EventEmitter, HostListener, Input, OnChanges, OnInit, Output, ViewChild,ElementRef  } from '@angular/core';
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
import { CategoryProductsService } from '../../services/Category/category-products.service';
@Component({
  selector: 'app-home',
  standalone: true,
  imports: [NavbarComponent,MainHeadingComponent,CategoryComponent,GlassesComponent,LoginComponent,CommonModule,],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit , AfterViewInit {
  token:any
  user_id:any
  decode:any
  length:any = 0
  subject:any
  page:number = 1
  isSearch = false
  searchParams = ""
  category = ""
  subCategory = ""
  constructor(public data:AlldataService,public cartLengthService:CartLengthService,public router:Router,public route:ActivatedRoute,public get_category_products:CategoryProductsService){
    this.token = sessionStorage.getItem('token')
    this.route.paramMap.subscribe((res) => {
         this.category = (res.get('category') as any)
         this.subCategory = (res.get('subCategory') as any)
    })
  }

glasses:any[] = []

ngOnInit(): void {
  this.route.paramMap.subscribe((item)=>{
    this.searchParams = (item.get('searchQuery') as string)
    // if(this.searchParams != null){
    //   this.searchData(this.searchParams)
    // }
    // else if(this.searchParams == null){
    //   this.loadMore()
    // }

    // sort according to category
    console.log(this.searchParams,this.category,this.subCategory)
    if(this.category != null && this.subCategory != null){
      this.sortData()
    } 
    else if(this.searchParams != null ){
      this.searchData(this.searchParams)
    }
    else{
      this.loadMore()
    }
  })
}
copyData:any[] = []
// ngOnChanges(): void {
//   this.loadMore()  
// }

isLoading: boolean = false;

loadMore(): void {
  this.isLoading = true;
  this.data.pageData(this.page).subscribe(res => {
    this.glasses = [...this.glasses, ...(res as  any)];
    
    this.page++;
    this.isLoading = false;
    
  });
}


sortData(){
  // this.glasses = this.copyData.filter((item)=>{
  //  return item.category.toLowerCase() == e.mainCategory.toLowerCase() && item.gender.toLowerCase() == e.categoryType.toLowerCase() 
  // })

  // console.log(this.glasses,this.copyData)
  this.get_category_products.get_category_products(this.category,this.subCategory).subscribe((res) => {
    this.glasses = res.products
    console.log(res.products , this.glasses)
  })
}

searchData(e:any){
  this.glasses = []
  this.data.getSearchProducts(e).subscribe((res) => {
    this.isSearch = true
    this.glasses = res
    console.log(res , this.glasses)
    
  })
}

@ViewChild('sentinel', { static: true }) sentinel!: ElementRef;
items: number[] = [];
private observer!: IntersectionObserver;

ngAfterViewInit(): void {
  this.observer = new IntersectionObserver(
    entries => {
      if (entries[0].isIntersecting && this.category == null && this.subCategory == null && this.searchParams == null) {
        this.loadMore();
      }
    },
    {
      root: null,
      rootMargin: '0px',
      threshold: 0.5
    }
  );
  this.observer.observe(this.sentinel.nativeElement);
}
}
