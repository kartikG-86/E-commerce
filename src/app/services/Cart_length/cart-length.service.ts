import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartLengthService {
  
  public subject = new Subject()
  constructor() { }

  updateLength(length:any){
    return this.subject.next(length)
  }


}
