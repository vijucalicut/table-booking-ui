import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { ConfirmationService, MessageService } from 'primeng/api';
import { environment } from 'src/environments/environment';
import { ApiHttpService } from '../core/services/api-http.service';
import { SharedService } from '../core/services/shared.service';


declare var getUser: Function;

declare var loadBarChart: Function;
declare var loadPieChart: Function;
declare var loadDeviceBarChart: Function;
declare var loadDevicePieChart: Function;

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.scss']
})
export class AdminDashboardComponent implements OnInit {
  dataSource: Object;
  chartConfig: Object;
  chartData: any;
  deviceChartData: any;
  deviceChartCountElements: any;
  constructor(public sharedService: SharedService,
    private apiHttpService:
      ApiHttpService, private spinner: NgxSpinnerService, private messageService: MessageService,
    private confirmationService: ConfirmationService) { }

  ngOnInit(): void {
   
  }

  getVisitorsLog(): void {
    this.spinner.show();
    this.apiHttpService.getVisitorsChart().subscribe((res: any) => {
      if (res['value'].length > 0) {
        this.chartData = res['value'];
        loadBarChart(this.chartData);
        loadPieChart(this.chartData);
      }
      this.spinner.hide();
    }, (error: { [x: string]: { value: any; }; }) => {
      this.spinner.hide();
      this.showError('Some internal error occured');
    });
  }

  getDeviceChart(): void {
    this.spinner.show();
    this.apiHttpService.getDeviceChart().subscribe((res: any) => {
      if (res['value'].length > 0) {
        this.deviceChartData = res['value'];
        loadDeviceBarChart(this.deviceChartData);
        loadDevicePieChart(this.deviceChartData);
      }
      this.spinner.hide();
    }, (error: { [x: string]: { value: any; }; }) => {
      this.spinner.hide();
      this.showError('Some internal error occured');
    });
  }

  getDashboardElements():void{
    this.spinner.show();
    this.apiHttpService.getCountObject().subscribe((res: any) => {
      if (res['value'] != null) {
        this.deviceChartCountElements = res['value'];
      }
      this.spinner.hide();
    }, (error: { [x: string]: { value: any; }; }) => {
      this.spinner.hide();
      this.showError('Some internal error occured');
    });
  }

  showSuccess(message: any) {
    this.messageService.add({ severity: 'success', summary: 'Success', detail: message });
  }
  showInfo(message: any) {
    this.messageService.add({ severity: 'info', summary: 'Info', detail: message });
  }

  showWarn(message: any) {
    this.messageService.add({ severity: 'warn', summary: 'Warn', detail: message });
  }

  showError(message: any) {
    this.messageService.add({ severity: 'error', summary: 'Error', detail: message });
  }
}
