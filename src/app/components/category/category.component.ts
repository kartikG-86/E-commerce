import { Component, ElementRef, EventEmitter, Output } from '@angular/core';
import { IconsComponent } from '../icons/icons.component';
import {MatMenuModule} from '@angular/material/menu'
import {MatButtonModule} from '@angular/material/button'

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

  @Output() sortEvent = new EventEmitter()

  categoryClick(e:any){
    console.log(e)
    this.mainCategory = e
    console.log("Main Category",this.mainCategory)
  }

  categoryItem(event:any){
    console.log(event.target.innerHTML)
    this.categoryType = event.target.innerHTML
    console.log(this.categoryType)

     this.sortEvent.emit({
      categoryType:this.categoryType,
      mainCategory:this.mainCategory
     })
  }

}
