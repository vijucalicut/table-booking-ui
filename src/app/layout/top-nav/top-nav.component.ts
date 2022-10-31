import { ChangeDetectorRef, Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-top-nav',
  templateUrl: './top-nav.component.html',
  styleUrls: ['./top-nav.component.scss']
})
export class TopNavComponent implements OnInit {
  userName: any;

  constructor(private router: Router, private detector: ChangeDetectorRef) { }
  @Input() user: any;
  ngOnInit(): void {
  }

  logOut(): any {
  
  }

 
}
