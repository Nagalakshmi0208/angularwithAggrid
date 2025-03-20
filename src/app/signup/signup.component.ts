import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Route, Router } from '@angular/router';


@Component({
  selector: 'app-signup',
  standalone: false,
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css'
})
export class SignupComponent {
  userForm: any;
  salary: string[] = ['20k', '40k','50k'];
  accessTypeArr: string[] = ["Admin", "employee"];
  employee: any[]=[];

  constructor(private router: Router) {
  }

  ngOnInit() {
    this.userForm = new FormGroup({
        firstName:new FormControl(null,Validators.required),
        lastName:new FormControl(null,Validators.required),
        employeeid: new FormControl(null, [Validators.required, Validators.maxLength(5)]),
        password: new FormControl(null, Validators.required),
        email: new FormControl(null, [Validators.required,Validators.email]),
        accessType: new FormControl(null,Validators.required),
        gender: new FormControl(null),
        description: new FormControl(null),
        dob: new FormControl(null),
        salary: new FormControl(null),
        Timings: new FormGroup({
          parttime: new FormControl(null),
          fulltime: new FormControl(null)
          
        })
      });
  }

  onSubmit(){
    let emp = JSON.parse(localStorage.getItem("employee"));
const formData=this.userForm.value;

let a=(localStorage.getItem('employee'))
      if(this.userForm?.value){
        this.employee=JSON.parse(a)
        this.employee.push(formData);
        localStorage.setItem('employee',JSON.stringify(this.employee));
      }else{
        if(emp.length>0){
          if(this.userForm?.value){
            this.employee=JSON.parse(a)
            this.employee.push(formData);
           // emp.push(this.userForm.value);
            localStorage.setItem("employee",JSON.stringify(this.employee));
          }
        } 
      }
     
    this.userForm.reset();
    this.router.navigateByUrl("login");
  }
}
