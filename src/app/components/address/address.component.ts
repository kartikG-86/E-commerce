import { Component } from '@angular/core';
import { NavbarComponent } from '../navbar/navbar.component';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-address',
  standalone: true,
  imports: [NavbarComponent,RouterLink,RouterLinkActive],
  templateUrl: './address.component.html',
  styleUrl: './address.component.css'
})
export class AddressComponent {

}
