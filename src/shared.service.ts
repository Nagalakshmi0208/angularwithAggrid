import { EventEmitter, Injectable, Output } from "@angular/core";
import { BehaviorSubject } from "rxjs";


@Injectable({
    providedIn:'root'
})

export class SharedService {
    empData : any;
    modalData : any;
    @Output() getLoggedInName: EventEmitter<any> = new EventEmitter();

    isLoggedIn(){
        this.getLoggedInName.emit(JSON.parse(localStorage.getItem("loggedInUser")));
    }

    setEmpData(empData){
        this.empData = empData;
    }

    getEmpData(){
        return this.empData;
    }

    setEmpModalData(empData){
        this.modalData = empData;
    }

    getEmpModalData(){
        return this.modalData;
    }
    
}