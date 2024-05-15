import { Component, EventEmitter, OnChanges, OnInit, Output } from '@angular/core';
import { NavbarComponent } from '../navbar/navbar.component';
import { MainHeadingComponent } from '../main-heading/main-heading.component';
import { CategoryComponent } from '../category/category.component';
import { GlassesComponent } from '../glasses/glasses.component';
import { LoginComponent } from '../login/login.component';
import { CommonModule } from '@angular/common';
import { AlldataService } from '../../services/All Data/alldata.service';
import { jwtDecode } from 'jwt-decode';
@Component({
  selector: 'app-home',
  standalone: true,
  imports: [NavbarComponent,MainHeadingComponent,CategoryComponent,GlassesComponent,LoginComponent,CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit,OnChanges {

  token:any
  user_id:any
  decode:any

  constructor(public data:AlldataService){
    this.token = sessionStorage.getItem('token')
  }



  



glasses:any[] = []

ngOnInit(): void {
  this.getAllData()
}
copyData:any[] = []
ngOnChanges(): void {
  this.getAllData()  
}



getAllData(){
  
  this.data.getData().subscribe((item:any)=>{
    console.log("Your item",item)
    this.glasses = item;
    this.copyData = item;
  })
}


sortData(e:any){
  console.log("I am from sorting",e)
 
  this.glasses = this.copyData.filter((item)=>{
    console.log(item);
   return item.category.toLowerCase() == e.mainCategory.toLowerCase() && item.gender.toLowerCase() == e.categoryType.toLowerCase() 
  })

  console.log("Your sort Data",this.glasses)
}



  

}
