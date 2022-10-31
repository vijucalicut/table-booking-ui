import { Component, OnInit } from '@angular/core';
import { SharedService } from 'src/app/core/services/shared.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-left-nav',
  templateUrl: './left-nav.component.html',
  styleUrls: ['./left-nav.component.scss']
})
export class LeftNavComponent implements OnInit {
  userData: any;
  activeFlag = '1';
  constructor(public sharedService: SharedService,public _router:Router,public _activatedRoute:ActivatedRoute) { }

  ngOnInit(): void {
    // this.sharedService.currentUser.subscribe(user=>{
    //   // let user: any = localStorage.getItem('userDetails');
    //   // userDetails != undefined && userDetails != null && userDetails?.access_token
    //   if (user == "") {
    //     this.userData = user;
    //   }
    //   console.log('userDetails222',this.userData);
    // })
  }

  checkActive(activeFlag: any): any {
    this.activeFlag = activeFlag;
    if(this.activeFlag ==="1" ){
      this._router.navigate(["./dashboard"]);
    }
   else if(this.activeFlag ==="2" ){
      this._router.navigate(["./add-booking"]);
     
    }
    else if(this.activeFlag ==="3" ){
      this._router.navigate(["./list-booking"]);
    }
    else if(this.activeFlag ==="4" ){
      this._router.navigate(["./add-settings"]);
    }
    else if(this.activeFlag ==="5" ){
      this._router.navigate(["./general-settings"]);
    }
  }

}
