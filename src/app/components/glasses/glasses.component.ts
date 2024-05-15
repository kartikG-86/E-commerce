import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-glasses',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './glasses.component.html',
  styleUrl: './glasses.component.css'
})
export class GlassesComponent implements OnInit {

  
  @Input() data:any[];
  constructor(){
    this.data = []
  }
  
  

  ngOnInit() {
    console.log("This is data",this.data)
    
  }



  itemCartButtonText:string="Add to Cart"
  itemCartSno:number = -1


@Output() addEvent = new EventEmitter()

selectedItem = {}

addToCart(e:any){
  console.log(e)
  this.itemCartSno = e.sno
  this.selectedItem = e as any
  (this.selectedItem as any).quantity = 1  
  console.log("Your Selected Item",this.selectedItem)
  this.addEvent.emit(this.selectedItem)
  this.itemCartButtonText = "Your item added to cart"

  setTimeout(()=>{
   this.itemCartButtonText = "Add to Cart"
 
  },1500)
}


}
