import { Component } from '@angular/core';
import { SharedService } from '../../shared.service';

@Component({
  selector: 'app-employee-data',
  standalone: false,
  templateUrl: './employee-data.component.html',
  styleUrl: './employee-data.component.css'
})
export class EmployeeDataComponent {
  user :any;
  Timings = []

  constructor(private sharedService : SharedService) {}

  ngOnInit() {
    this.user = this.sharedService.getEmpData();
    this.Timings = Object.keys(this.user.Timings);
  }
}
