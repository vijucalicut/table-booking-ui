import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ConfirmationService, MessageService, SortEvent } from 'primeng/api';
import { ApiHttpService } from '../core/services/api-http.service';
import { SharedService } from '../core/services/shared.service';

@Component({
  selector: 'app-list-booking',
  templateUrl: './list-booking.component.html',
  styleUrls: ['./list-booking.component.scss']
})
export class ListBookingComponent implements OnInit, OnDestroy {
  rows: number;
  displayAddModal = false;
  autoResize = false;
  addBookingForm = new FormGroup({
    bookingDateTime: new FormControl('', [Validators.required]),
    fromDate: new FormControl(null, [Validators.required]),
    fromTime: new FormControl(null, [Validators.required, Validators.max(12), Validators.min(1)]),
    toTime: new FormControl(''),
    email: new FormControl('', [Validators.required, Validators.email]),
    noOfGuests: new FormControl('', [Validators.required,
    Validators.max(12), Validators.min(1)]),
    phoneNumber: new FormControl('', [Validators.required,
    Validators.pattern("^[0-9]*$"),
    Validators.max(12), Validators.min(1)]),
  });
  selecteddBookingLogId: any;
  isEditEnabled: boolean;
  displayDeleteModel: boolean;
  intervalObj: any;
  showBookingModal = true;

  constructor(
    private confirmationService: ConfirmationService, private apiHttpService:
      ApiHttpService,
    private messageService: MessageService,
    private spinner: NgxSpinnerService,
    public sharedService: SharedService
  ) { }
  bookingList: any = [];
  first: any;
  last: any;
  totalRecords: any;
  noDataMessage: any = "No Bookings found";
  ngOnInit(): void {
    this.getAllBookings();
    this.intervalObj = setInterval(() => {
    this.spinner.show();
    this.getAllBookings();
    }, 50000);
  }


  addBooking(): void {
    this.displayAddModal = true;
    this.isEditEnabled = false;
  }



  getAllBookings(): any {
    this.spinner.show();
    this.apiHttpService.getAllBookings().subscribe((res: any) => {
      this.first = 0;
      this.rows = 10;
      this.bookingList = res;
      console.log('this.bookingList', this.bookingList);
      this.spinner.hide();
    });
  }


  ngOnDestroy() {
    if (this.intervalObj) {
      clearInterval(this.intervalObj);
    }
  }

  ApproveBooking(bookingItem: any) {
    this.confirmationService.confirm({
      message: 'Are you sure that you want to approve?',
      header: 'Confirmation',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        bookingItem.approvalStatus = 'Approved';
        this.ApproveBookingItem(bookingItem, bookingItem?.id);
      },
      reject: () => {

      }
    });
  }

  RejectBooking(bookingItem: any) {
    this.confirmationService.confirm({
      message: 'Are you sure that you want to reject?',
      header: 'Confirmation',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        bookingItem.approvalStatus = 'Rejected';
        this.RejectBookingItem(bookingItem, bookingItem?.id);
      },
      reject: () => {

      }
    });
  }
  RejectBookingItem(bookingItem: any, id: any) {
    this.apiHttpService.updateBooking(bookingItem, id).subscribe((response: any) => {
      console.log('response', response);
      this.messageService.add({ severity: `${response.key.toLowerCase()}`, summary: `${response.key}`, detail: `${response.value}` });
      this.getAllBookings();
    }, (error: any) => {
      this.displayAddModal = false;
      console.log('error', error);
      this.messageService.add({ severity: 'error', summary: 'Error', detail: `Error occured. ${error}` });
    });
  }


  ApproveBookingItem(bookingItem: any, id: any) {
    this.apiHttpService.updateBooking(bookingItem, id).subscribe((response: any) => {
      console.log('response', response);
      this.messageService.add({ severity: `${response.key.toLowerCase()}`, summary: `${response.key}`, detail: `${response.value}` });
      this.getAllBookings();
    }, (error: any) => {
      this.displayAddModal = false;
      console.log('error', error);
      this.messageService.add({ severity: 'error', summary: 'Error', detail: `Error occured. ${error}` });
    });
  }

}
