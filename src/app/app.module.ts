import { APP_INITIALIZER, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LeftNavComponent } from './layout/left-nav/left-nav.component';
import { TopNavComponent } from './layout/top-nav/top-nav.component';
import {TableModule} from 'primeng/table';
import {ButtonModule} from 'primeng/button';
import {TooltipModule} from 'primeng/tooltip';
import { TagModule } from 'primeng/tag';
import {DialogModule} from 'primeng/dialog';
import {ConfirmDialogModule} from 'primeng/confirmdialog';
import {ConfirmationService} from 'primeng/api';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {InputTextModule} from 'primeng/inputtext';
import {FileUploadModule} from 'primeng/fileupload';
import {HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http';
import {ApiHttpService} from './core/services/api-http.service';
import {ToastModule} from 'primeng/toast';
import {MessageService} from 'primeng/api';
import { NgxSpinnerModule } from "ngx-spinner";
import { AuthModule, OidcConfigService } from 'angular-auth-oidc-client';
import { SharedService } from './core/services/shared.service';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { DropdownModule } from 'primeng/dropdown';
import { HeaderInterceptor } from './shared/header-interceptor';
import { CalendarModule } from 'primeng/calendar';
import {SliderModule} from 'primeng/slider';
import {MultiSelectModule} from 'primeng/multiselect';
import {ContextMenuModule} from 'primeng/contextmenu';
import {ProgressBarModule} from 'primeng/progressbar';
import { NoDataComponent } from './shared/no-data/no-data.component';
import { AddBookingComponent } from './add-booking/add-booking.component';
import { ListBookingComponent } from './list-booking/list-booking.component';
import { AddSettingsComponent } from './add-settings/add-settings.component';


@NgModule({
  declarations: [
    AppComponent,
    LeftNavComponent,
    TopNavComponent,
    AdminDashboardComponent,
    NoDataComponent,
    AddBookingComponent,
    ListBookingComponent,
    AddSettingsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    TableModule,
    ButtonModule,
    TooltipModule,
    TagModule,
    DialogModule,
    ConfirmDialogModule,
    FormsModule,
    ReactiveFormsModule,
    InputTextModule,
    FileUploadModule,
    HttpClientModule,
    ToastModule,
    NgxSpinnerModule,
    DragDropModule,
    DropdownModule,
    CalendarModule,
		SliderModule,
		DialogModule,
		MultiSelectModule,
		ContextMenuModule,
    ProgressBarModule,
    HttpClientModule,
    FormsModule,
 
  ],
  providers: [ConfirmationService, ApiHttpService, MessageService,SharedService,
    { provide: HTTP_INTERCEPTORS, useClass: HeaderInterceptor, multi: true },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
