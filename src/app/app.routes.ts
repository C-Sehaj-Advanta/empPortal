import { Routes } from '@angular/router';
import { EmployeeListsComponent } from './employee-charts/employee-charts.component';
import { EmployeeChartsComponent } from './employee-lists/employee-lists.component';
import { EmployeeMedDetailsComponent } from './employee-med-details/employee-med-details.component';
import { SettingsComponent } from './settings/settings.component';
import { HomeComponent } from './home/home.component';
import { EditEmployeeComponent } from './employee-charts/edit-employee/edit-employee.component';
import { AddEmployeeComponent } from './employee-charts/add-employee/add-employee.component';

export const routes: Routes = [
  { path: '', redirectTo: 'Home', pathMatch: 'full' },
  { path: '', component: HomeComponent },
  { path: 'employee-lists', component: EmployeeListsComponent },
  { path: 'add-employee', component: AddEmployeeComponent },
  { path: 'edit/:id', component: EditEmployeeComponent },
  { path: 'employee-charts', component: EmployeeChartsComponent },
  { path: 'employee-med-details', component: EmployeeMedDetailsComponent },
  { path: 'settings', component: SettingsComponent },
];
