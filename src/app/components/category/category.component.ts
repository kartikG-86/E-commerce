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
    this.mainCategory = e
  }

  categoryItem(event:any){
    this.categoryType = event.target.innerHTML

     this.sortEvent.emit({
      categoryType:this.categoryType,
      mainCategory:this.mainCategory
     })
  }

}
