import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { MessageService } from 'primeng/api';
import { ApiHttpService } from '../core/services/api-http.service';
import { SharedService } from '../core/services/shared.service';

@Component({
  selector: 'app-add-settings',
  templateUrl: './add-settings.component.html',
  styleUrls: ['./add-settings.component.scss']
})
export class AddSettingsComponent implements OnInit {

  settingsForm: FormGroup;
  submitted = false; isEditEnabled: boolean;
  currentId: any;

  constructor(private formBuilder: FormBuilder, private apiHttpService: ApiHttpService,
    private messageService: MessageService,
    private spinner: NgxSpinnerService,
    public sharedService: SharedService,
  ) { }

  ngOnInit() {
    this.getSettings();
    this.settingsForm = this.formBuilder.group({
      restaurantName: ['', Validators.required],
      emailId: ['', [Validators.required, Validators.email]],
      phoneNumber: ['', [Validators.required, Validators.minLength(10)]],
      openingTime: ['', Validators.required],
      closingTime: ['', Validators.required],
      bookBeforeHours: ['', Validators.required],
      totalSeats: ['', Validators.required],
    });
  }

  // convenience getter for easy access to form fields
  get f() { return this.settingsForm.controls; }


  saveSettings(): any {
    this.submitted = true;
    // stop here if form is invalid
    if (this.settingsForm.invalid) {
      return;
    }
    this.spinner.show();
    let deviceBody = {
      restaurantName: this.settingsForm.value['restaurantName'],
      emailId: this.settingsForm.value['emailId'],
      phoneNumber: this.settingsForm.value['phoneNumber'],
      openingTime: this.settingsForm.value['openingTime'],
      closingTime: this.settingsForm.value['closingTime'],
      bookBeforeHours: this.settingsForm.value['bookBeforeHours'].toString(),
      totalSeats: parseInt(this.settingsForm.value['totalSeats'])
    }
    if (this.isEditEnabled) {
      this.apiHttpService.updateSettings(deviceBody,this.currentId).subscribe((response: any) => {
        console.log('response', response);
        this.messageService.add({ severity: `${response.key.toLowerCase()}`, summary: `${response.key}`, detail: `${response.value}` });
        this.getSettings();
        this.spinner.hide();
      }, (error: any) => {
        this.spinner.hide();
        this.messageService.add({ severity: `error`, summary: `Error`, detail: `${error}` });
      });
    } else {
      this.apiHttpService.postSettings(deviceBody).subscribe((response: any) => {
        console.log('response', response);
        this.messageService.add({ severity: `${response.key.toLowerCase()}`, summary: `${response.key}`, detail: `${response.value}` });
        this.getSettings();
        this.spinner.hide();
      }, (error: any) => {
        this.spinner.hide();
        this.messageService.add({ severity: `error`, summary: `Error`, detail: `${error}` });
      });
    }
  }

  getSettings() {
    this.apiHttpService.getSettings().subscribe(res => {
      if (res['value'].id > 0) {
        this.currentId = res['value'].id;
        this.isEditEnabled = true;
      }
      else {
        this.isEditEnabled = false;
      }
      this.settingsForm.controls['restaurantName'].setValue(res['value'].restaurantName);
      this.settingsForm.controls['emailId'].setValue(res['value'].emailId);
      this.settingsForm.controls['phoneNumber'].setValue(res['value'].phoneNumber);
      this.settingsForm.controls['openingTime'].setValue(res['value'].openingTime);
      this.settingsForm.controls['closingTime'].setValue(res['value'].closingTime);
      this.settingsForm.controls['bookBeforeHours'].setValue(res['value'].bookBeforeHours);
      this.settingsForm.controls['totalSeats'].setValue(res['value'].totalSeats);
      this.settingsForm.controls['emailId'].setValue(res['value'].emailId);
    })
  }

  onReset() {
    this.submitted = false;
    this.settingsForm.reset();
  }
}
