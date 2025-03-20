import { Component } from '@angular/core';
import { ClientSideRowModelModule } from '@ag-grid-community/client-side-row-model';
import { Module } from '@ag-grid-community/core';
import { MatDialog } from '@angular/material/dialog';
import { EmployeeModalComponent } from '../employee-modal/employee-modal.component';
import { SharedService } from '../../shared.service';


@Component({
  selector: 'app-admin-dashboard',
  standalone: false,
  templateUrl: './admin-dashboard.component.html',
  styleUrl: './admin-dashboard.component.css',
})
export class AdminDashboardComponent {

  employees = [];
  rowData : any;
  colDefs : any;
  gridHeight : any;
  public modules : Module[] = [ClientSideRowModelModule];
  
  constructor(private matDialog : MatDialog, private sharedService : SharedService){}
  
  ngOnInit(){
    this.employees = JSON.parse(localStorage.getItem('employee'));
    this.setColDefs();

  }

  setColDefs(){
    this.rowData = this.employees;
    this.colDefs = [
      { field: 'employeeid', headerName: 'Employee Id'},
      { field: 'firstName', headerName: 'First Name' },
      { field: 'lastName', headerName: 'Last Name' },
      { field: 'email', headerName: 'Email' },
      { field: 'accessType', headerName: 'Access Type' },
      { field: 'gender', headerName: 'Gender' },
      { field: 'description', headerName: 'Description',cellRenderer: (data) => "<div [innerHTML]="+(data.value)+"></div>"},
      { field: 'dob', headerName: 'Date of Birth',cellRenderer: (data) => new Date(data.value).toLocaleDateString() },
      { field: 'salary', headerName: 'Salary' },
      { field: 'Timings', headerName: 'Timings',cellRenderer: (data) => Object.keys(data.value).filter(key => data.value[key]).join(', ') }
    ];
    const rowHeight = 42; 
    const headerHeight = 48; 
    const numberOfRows = this.rowData.length;
    const gridPadding = 20; 
    this.gridHeight = (numberOfRows * rowHeight + headerHeight + gridPadding) + 'px';
  }

  defaultColDef = {
    sortable: true,
    filter: true
  }

  onGridReady(event){
    const rowHeight = 25; 
    const numberOfRows = this.rowData.length;
    const gridPadding = 50
    this.gridHeight = (numberOfRows * rowHeight + gridPadding) + 'px';
  }

  onRowClick(event){
    this.sharedService.setEmpModalData(event.data);
    const dialogRef = this.matDialog.open(EmployeeModalComponent);
    dialogRef.afterClosed().subscribe(() => {
      this.ngOnInit();
    });
  }
}
