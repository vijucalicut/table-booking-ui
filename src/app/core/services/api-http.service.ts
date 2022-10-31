import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { Staff } from '../../shared/staff';
import { environment } from 'src/environments/environment.prod';
@Injectable({
  providedIn: 'root'
})
export class ApiHttpService {
  apiURL = environment.apiEndPoint;
  constructor(
    private http: HttpClient
  ) { }
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }


  getAllStaff(): Observable<any> {
    return this.http.get<Staff>(this.apiURL + '/api/Staff/getStaffList')
      .pipe(
        retry(1),
        catchError(this.handleError)
      )
  }

  public postSatff(data: any, options?: any) {
    return this.http.post(this.apiURL + '/api/Staff/AddStaff', data, options);
  }

  public postBooking(data: any, options?: any) {
    return this.http.post(this.apiURL + '/api/TableBooking/AddBooking', data, options);
  }

  updateBooking(bookingBody: any, id: any): any {
    return this.http.put(this.apiURL + `/api/TableBooking/UpdateBooking?id=${id}`, bookingBody
    ).pipe(
      retry(1),
      catchError(this.handleError)
    )
  }

  public getAllBookings() {
    // return this.http.post(this.apiURL + '/api/GeneralSettings/saveFieldConfiguration', data, options);
    return this.http.get<Staff>(this.apiURL + '/api/TableBooking/getBookingList')
      .pipe(
        retry(1),
        catchError(this.handleError)
      )
  }

  public editSatff(data: any, options?: any) {
    return this.http.put(this.apiURL + '/api/Staff/UpdateStaff', data, options);
  }

  getStaffById(staffId: any): Observable<any> {
    return this.http.get<Staff>(this.apiURL + '/api/Staff/getStaffById/' + staffId)
      .pipe(
        retry(1),
        catchError(this.handleError)
      )
  }

  public postSettings(data: any, options?: any) {
    return this.http.post(this.apiURL + '/api/Admin/AddSettings', data, options);
  }


  public updateSettings(data: any, id: any,  options?: any) {
    return this.http.put(this.apiURL + `/api/Admin/UpdateSettings?id=${id}`, data, options);
  }

  public getSettings() {
    // return this.http.post(this.apiURL + '/api/GeneralSettings/saveFieldConfiguration', data, options);
    return this.http.get<any>(this.apiURL + '/api/Admin/getSettings')
      .pipe(
        retry(1),
        catchError(this.handleError)
      )
  }


  getVisitorsChart() {
    return this.http.get<Staff>(this.apiURL + '/api/Chart/getVisitorLog')
      .pipe(
        retry(1),
        catchError(this.handleError)
      )
  }

  getDeviceChart() {
    return this.http.get<Staff>(this.apiURL + '/api/Chart/getDeviceList')
      .pipe(
        retry(1),
        catchError(this.handleError)
      )
  }

  getCountObject() {
    return this.http.get<Staff>(this.apiURL + '/api/Chart/getChartCount')
      .pipe(
        retry(1),
        catchError(this.handleError)
      )
  }

  generateOtp(deviceBody: any): Observable<any> {
    // let headers = new HttpHeaders();
    // let headers = {
    //   headers: new HttpHeaders({
    //     'x-wwwdsource-origin': 'winterwood.com'
    //   })
    // }
    return this.http.post(this.apiURL + '/api/Device/AddDevice', deviceBody).pipe(
      retry(1),
      catchError(this.handleError)
    )
  }

  updateDevice(deviceBody: any): any {
    // let headers = {
    //   headers: new HttpHeaders({
    //     'x-wwwdsource-origin': 'winterwood.com'
    //   })
    // }

    return this.http.put(this.apiURL + '/api/Device/UpdateDevice', deviceBody
    ).pipe(
      retry(1),
      catchError(this.handleError)
    )
  }


  reGenerateOtp(deviceLogId: any): any {
    // let headers = {
    //   headers: new HttpHeaders({
    //     'x-wwwdsource-origin': 'winterwood.com'
    //   })
    // }

    return this.http.put(this.apiURL + '/api/DeviceLog/' + deviceLogId, null).pipe(
      retry(1),
      catchError(this.handleError)
    )
  }

  deleteDevice(deviceId: any): any {
    // let headers = {
    //   headers: new HttpHeaders({
    //     'x-wwwdsource-origin': 'winterwood.com'
    //   })
    // }

    return this.http.put(this.apiURL + `/api/Device/${deviceId}`, null).pipe(
      retry(1),
      catchError(this.handleError)
    )
  }


  getAllDevices(): any {
    // let headers = {
    //   headers: new HttpHeaders({
    //     'x-wwwdsource-origin': 'winterwood.com'
    //   })
    // }
    return this.http.get(this.apiURL + '/api/Device/getDeviceList').pipe(
      retry(1),
      catchError(this.handleError)
    )
  }


  getAllFields(): any {
    return this.http.get(this.apiURL + '/api/Field/getFieldList').pipe(
      retry(1),
      catchError(this.handleError)
    )
  }

  getUploadOptions = (): HttpHeaders => {
    const headers = new HttpHeaders();
    headers.set('Accept', 'application/json');
    headers.delete('Content-Type');
    return headers;
  }

  saveDeviceConfiguration(configuredItem: any): any {
    return this.http.post(this.apiURL + '/api/Field/saveFieldConfiguration', configuredItem).pipe(
      retry(1),
      catchError(this.handleError)
    )
  }

  saveBlob(configuredItem: FormData): any {
    return this.http.post(this.apiURL + `/api/Field`, configuredItem, {
      reportProgress: true,
    }).pipe(
      retry(1),
      catchError(this.handleError)
    )
  }


  deleteStaff(staffId: any): Observable<any> {
    return this.http.delete<any>(this.apiURL + `/api/Staff/${staffId}`)
      .pipe(
        retry(1),
        catchError(this.handleError)
      )
  }

  getConfiguredFields(): any {
    return this.http.get(this.apiURL + '/api/Field/getFieldByTenant').pipe(
      retry(1),
      catchError(this.handleError)
    )
  }

  getPrintList() {
    return this.http.get(this.apiURL + '/api/GeneralSettings/getPrintSettings').pipe(
      retry(1),
      catchError(this.handleError)
    )
  }



  public get(url: string, options?: any) {
    return this.http.get(url, options);
  }
  public post(url: string, data: any, options?: any) {
    return this.http.post(url, data, options);
  }
  public put(url: string, data: any, options?: any) {
    return this.http.put(url, data, options);
  }
  public delete(url: string, options?: any) {
    return this.http.delete(url, options);
  }
  handleError(error: any) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // Get client-side error
      errorMessage = error.error.message;
    } else {
      // Get server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    return throwError(errorMessage);
  }
  getVisitorsLog(skipItemFrom: any, takeItemFrom: any, filterList: any, sortField: any, sortOrder: any, isExport: any): any {
    let searchBody = {
      "skipItems": skipItemFrom,
      "noOfItems": takeItemFrom,
      "globalSearchKey": "",
      "searchKey": { "Name": "", "LoggedOutBy": "" },
      "filterBy": { "filterByKey": "LoggedOutBy", "filterByOrder": "Desc" },
      "SearchList": filterList,
      "sortField": sortField,
      "sortOrder": sortOrder,
      "isExport": isExport
    }
    return this.http.post(this.apiURL + '/api/Search/searchByAdmin', searchBody).pipe(
      retry(1),
      catchError(this.handleError)
    )
  }

  logoutUser(visitorId: any): any {
    let loggedOutBy = "Admin";
    // return this.http.put(this.apiURL + '/api/Device/UpdateDevice', deviceBody
    // ).pipe(
    //   retry(1),
    //   catchError(this.handleError)
    // )
    return this.http.post(this.apiURL + '/api/VisitorLog/' + visitorId + '?' + 'loggedOutBy=' + loggedOutBy, null).pipe(
      retry(1),
      catchError(this.handleError)
    )
  }


  testpost(configuredItem: any): any {
    return this.http.post(this.apiURL + '/api/VisitorLog/saveVisitor', configuredItem, {
      reportProgress: true,
    }).pipe(
      retry(1),
      catchError(this.handleError)
    )
  }
}