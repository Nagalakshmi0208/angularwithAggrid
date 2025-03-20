import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { SharedService } from '../../shared.service';

@Component({
  selector: 'app-login',
  standalone: false,
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  loginForm: any;
  employeeData : any;
  empValid : boolean=false;

  constructor(private router: Router, private sharedService : SharedService) {
  }

  ngOnInit() {
    this.employeeData = JSON.parse(localStorage.getItem('employee'));
    this.loginForm = new FormGroup({
        email: new FormControl('', [Validators.required, Validators.email]),
        password: new FormControl('', [Validators.required])
    })
  }

  onSubmit() {
    let emp : any;
    this.empValid = false;
    this.employeeData.forEach(element => {
      if(element?.email.toLowerCase() === this.loginForm.value?.email.toLowerCase() && element.password === this.loginForm.value.password){
        emp = element;
        localStorage.setItem('loggedInUser',JSON.stringify(emp));
        this.sharedService.getLoggedInName.emit(emp);
        console.log('emp11',emp)
      }
    });
    console.log('emp',emp)
    if(emp?.accessType === 'Admin'){
      this.router.navigateByUrl("admindashboard");
    } else if(emp?.accessType === 'employee') {
      this.sharedService.setEmpData(emp);
      this.router.navigateByUrl("employeedata");
    } else {
      this.empValid = true;
    }
  }

}
