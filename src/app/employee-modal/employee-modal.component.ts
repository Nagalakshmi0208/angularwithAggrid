import { Component } from '@angular/core';
import {MatDialog,MatDialogActions,MatDialogClose,MatDialogContent,MatDialogTitle} from '@angular/material/dialog';
import { SharedService } from '../../shared.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { Router } from '@angular/router';

@Component({
  selector: 'app-employee-modal',
  standalone: false,
  templateUrl: './employee-modal.component.html',
  styleUrl: './employee-modal.component.css'
})
export class EmployeeModalComponent {
    userForm: any;
    modalData : any;
    salary: string[] = ['20k', '40k','50k'];
    accessTypeArr: string[] = ["Admin", "Non-Admin"];
    employee = [];

    constructor(private matDialog : MatDialog, private sharedService : SharedService, private router:Router){}

    ngOnInit(){
        this.modalData = this.sharedService.getEmpModalData();
        this.userForm = new FormGroup({
            firstName:new FormControl(this.modalData.firstName,Validators.required),
            lastName:new FormControl(this.modalData.lastName,Validators.required),
            employeeid: new FormControl(this.modalData.employeeid, Validators.required),
            password: new FormControl(this.modalData.password, Validators.required),
            email: new FormControl(this.modalData.email, [Validators.required,Validators.email]),
            accessType: new FormControl(this.modalData.accessType),
            gender: new FormControl(this.modalData.gender),
            description: new FormControl(this.modalData.description),
            dob: new FormControl(this.modalData.dob),
            salary: new FormControl(this.modalData.salary),
            Timings: new FormGroup({
              parttime: new FormControl(this.modalData.Timings?.parttime ? true : false),
              fulltime: new FormControl(this.modalData.Timings?.fulltime ? true : false),
             
            })
          });
    }

    onSubmit(){
        let empData = JSON.parse(localStorage.getItem('employee'));
        this.matDialog.closeAll();
        for(let i=0;i<empData.length;i++){
            if(empData[i].employeeid === this.userForm.value.employeeid){
                empData[i]=this.userForm.value;
            }
        }
        localStorage.setItem("employee",JSON.stringify(empData));
    }
}
