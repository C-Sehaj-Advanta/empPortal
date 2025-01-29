import { Routes } from '@angular/router';
import { EmployeeChartsComponent } from './employee-charts/employee-charts.component';
import { EmployeeListsComponent } from './employee-lists/employee-lists.component';
import { EmployeeMedDetailsComponent } from './employee-med-details/employee-med-details.component';
import { SettingsComponent } from './settings/settings.component';
import { HomeComponent } from './home/home.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'employee-charts', component: EmployeeChartsComponent },
  { path: 'employee-lists', component: EmployeeListsComponent },
  { path: 'employee-med-details', component: EmployeeMedDetailsComponent },
  { path: 'settings', component: SettingsComponent },
];
