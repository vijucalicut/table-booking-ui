import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddBookingComponent } from './add-booking/add-booking.component';
import { AddSettingsComponent } from './add-settings/add-settings.component';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { ListBookingComponent } from './list-booking/list-booking.component';

const routes: Routes = [ 
  { path: '', component:   AdminDashboardComponent },
  { path: 'dashboard', component: AdminDashboardComponent },
  { path: 'add-booking', component: AddBookingComponent },
  { path: 'list-booking', component: ListBookingComponent },
  { path: 'add-settings', component: AddSettingsComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
