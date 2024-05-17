import { Component } from '@angular/core';
import { NavbarComponent } from '../navbar/navbar.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-checkout',
  standalone: true,
  imports: [NavbarComponent,CommonModule],
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.css'
})
export class CheckoutComponent {
  
  buttons = [{
    index:1,
    text:"On Shipping"
  },{
    index:2,
    text:'Arrived'
  },{
    index:3,
    text:'Cancelled'
  }]

  buttonActivate:number = 1

  activeButton(i:number){
    console.log(i)
    this.buttonActivate = i
    
  }

}
