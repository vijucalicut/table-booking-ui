import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SharedService {
  private userDetails = new BehaviorSubject<any>("");
  currentUser = this.userDetails.asObservable()
  constructor(){}
 
  setUserDetails(userData: string){
    this.userDetails.next(userData);
  }
}
