import { ChangeDetectionStrategy, ChangeDetectorRef, Component } from '@angular/core';
import { SharedService } from './core/services/shared.service';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'Booking App';
  postParam: any;
  userProfile: any;
  token: string;

  constructor(public sharedService: SharedService, private router: Router,
    private detector: ChangeDetectorRef,
    private activeRouter: ActivatedRoute) {

  }
}


