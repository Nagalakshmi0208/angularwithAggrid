import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SignupComponent } from './signup/signup.component';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { EmployeeDataComponent } from './employee-data/employee-data.component';
import { LoginComponent } from './login/login.component';


const routes: Routes = [
  {path: "", redirectTo: "login" , pathMatch: "full"},
  {path: "signup", component: SignupComponent},
  {path: "admindashboard", component: AdminDashboardComponent},
  {path: "employeedata", component: EmployeeDataComponent},
  {path: "login", component: LoginComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
