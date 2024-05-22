import { Component, ElementRef, EventEmitter, Output } from '@angular/core';
import { IconsComponent } from '../icons/icons.component';
import {MatMenuModule} from '@angular/material/menu'
import {MatButtonModule} from '@angular/material/button'
import { Router } from '@angular/router';

@Component({
  selector: 'app-category',
  standalone: true,
  imports: [IconsComponent,MatMenuModule,MatButtonModule],
  templateUrl: './category.component.html',
  styleUrl: './category.component.css'
})
export class CategoryComponent {
  
  mainCategory = ""
  categoryType =  ""

  constructor(public router:Router){}

  @Output() sortEvent = new EventEmitter()

  categoryClick(e:any){
    this.mainCategory = e
    console.log(this.mainCategory)
  }

  categoryItem(event:any){
    this.categoryType = event.target.innerHTML
    console.log(this.categoryType)
    //  this.sortEvent.emit({
    //   categoryType:this.categoryType,
    //   mainCategory:this.mainCategory
    //  })
    this.router.navigateByUrl(`/category/${this.mainCategory}/${this.categoryType}`)

  }

}
