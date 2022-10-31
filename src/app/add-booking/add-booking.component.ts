import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ApiHttpService } from '../core/services/api-http.service';
import { SharedService } from '../core/services/shared.service';

@Component({
  selector: 'app-add-booking',
  templateUrl: './add-booking.component.html',
  styleUrls: ['./add-booking.component.scss']
})
// ['', [Validators.required, Validators.pattern(/^\d{4}\-(0[1-9]|1[012])\-(0[1-9]|[12][0-9]|3[01])$/)]],
export class AddBookingComponent implements OnInit {

  registerForm: FormGroup;
  submitted = false;
  openingTimeMessage: string;
  bookBeforeMessage: string;

  constructor(private formBuilder: FormBuilder, private apiHttpService: ApiHttpService,
    private messageService: MessageService,
    private spinner: NgxSpinnerService,
    public sharedService: SharedService,
  ) { }

  ngOnInit() {
    this.registerForm = this.formBuilder.group({
      bookingDate: ['', [Validators.required, Validators.pattern(/^\d{4}\-(0[1-9]|1[012])\-(0[1-9]|[12][0-9]|3[01])$/)]],
      fromTime: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required, Validators.minLength(10)]],
      name: ['', Validators.required],
      noOfGuests: ['', Validators.required],
      // validates date format yyyy-mm-dd
      acceptTerms: [false, Validators.requiredTrue]
    });
    this.getSettings();
  }

  // convenience getter for easy access to form fields
  get f() { return this.registerForm.controls; }


  saveBooking(): any {
    this.submitted = true;
    // stop here if form is invalid
    if (this.registerForm.invalid) {
      return;
    }
    this.spinner.show();
    let deviceBody = {
      BookingDateTime: this.registerForm.value['bookingDate'],
      name: this.registerForm.value['name'],
      fromTime: this.registerForm.value['fromTime'],
      Email: this.registerForm.value['email'],
      PhoneNumber: this.registerForm.value['phone'],
      NoOfGuests: parseInt(this.registerForm.value['noOfGuests'])
    }
    this.apiHttpService.postBooking(deviceBody).subscribe((response: any) => {
      console.log('response', response);
      this.messageService.add({ severity: `${response.key.toLowerCase()}`, summary: `${response.key}`, detail: `${response.value}` });
      this.onReset();
      this.spinner.hide();
    }, error => {
      this.spinner.hide();
      this.messageService.add({ severity: `error`, summary: `Error`, detail: `${error}` });
    });
  }

  onReset() {
    this.submitted = false;
    this.registerForm.reset();
  }

  getSettings() {
    this.apiHttpService.getSettings().subscribe(res => {
      if (res['value'].id > 0) {
        this.openingTimeMessage = `Please book your seats  between ${res['value'].openingTime} - ${res['value'].closingTime}`;
        this.bookBeforeMessage = `Please do your bookings atleast ${res['value'].bookBeforeHours} hours before`;
        // res['value'].closingTime;
        // res['value'].bookBeforeHours;
      }
    })
  }

}
