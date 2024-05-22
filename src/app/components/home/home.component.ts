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
@Component({
  selector: 'app-home',
  standalone: true,
  imports: [NavbarComponent,MainHeadingComponent,CategoryComponent,GlassesComponent,LoginComponent,CommonModule,],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit,OnChanges , AfterViewInit {

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
//   this.data.pageData(e).subscribe((item:any)=>{
//     this.glasses = item;
//     this.copyData = item;
//   })
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


sortData(e:any){
  this.glasses = this.copyData.filter((item)=>{
   return item.category.toLowerCase() == e.mainCategory.toLowerCase() && item.gender.toLowerCase() == e.categoryType.toLowerCase() 
  })
}

searchData(e:any){
  this.data.getSearchProducts(e).subscribe((res) => {
    this.glasses = []
    this.copyData = []
    this.isSearch = true
    this.glasses = res
    this.copyData = res
  })
}

@ViewChild('sentinel', { static: true }) sentinel!: ElementRef;
items: number[] = [];
private observer!: IntersectionObserver;

ngAfterViewInit(): void {
  this.observer = new IntersectionObserver(
    entries => {
      if (entries[0].isIntersecting) {
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
