import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '../_services/auth/auth.service';
import { Employee } from '../_interfaces/employee';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']
})
export class EmployeeComponent implements OnInit{

  constructor(private authService: AuthService){}

  postErrorFind = false;
  postErrorMessageFind = "";
  postSuccessFind = false;
  postSuccessMessageFind = "";

  postSuccess = false;
  postSuccessMessage = "false";
  postError = false;
  postErrorMessage = "";

  onTrue = false;
  updateTrue = false;
  date: any;
  password2: string = "";
  retypepassword: string = this.password2;
  type : any;

  ngOnInit(){
    this.authService.currentData.subscribe(dataSub => {
      this.type= dataSub.type;
    })
  }

  originalEmployeeForm: Employee = {
    first_name: "",
    last_name: "",
    nic: "",
    dob: "",
    email: "",
    mobile_no: "",
    address: "",
    access: "",
    type: "",
    vendor: "",
    url: "",
    password: ""
  };

  employeeForm: Employee = {...this.originalEmployeeForm}

  onHttpError(errorResponse:  any): void {
    console.log('error : ',errorResponse);
    this.postError = true;
    this.postErrorMessage = errorResponse;
    console.log(this.postErrorMessage)
  }


  // onSubmit(form: NgForm) {
  //   console.log('in on submit : '+ form.valid);
  //   this.datepipe.transform(this.date, 'yyyy-MM-dd');
  //   this.lecturerSettings.dob = this.date;
  //   if(form.valid && this.lecturerSettings.password === this.retypepassword && this.lecturerSettings.dle_access != 'Set DLE Access') {
  //     this.messages();
  //     this.register.postEmployeeSettingsForm(this.lecturerSettings).subscribe((result) => {
  //       console.log(result);
  //       if(Object.hasOwn(result,'Error')){
  //         const status = Object.getOwnPropertyDescriptor(result, 'Status');
  //         const error = Object.getOwnPropertyDescriptor(result, 'Error');

  //         if(status?.value === "400") {
  //           this.onHttpError(error?.value)
  //         }
  //         else {
  //           this.onHttpError("Something went Wrong with the Server try again later,.. If the Issue Persists please Contact Support!");
  //           console.log(result)
  //         }
  //       }
  //       else {
  //         this.postError = false;
  //         this.postSuccess = true;
  //         this.postSuccessMessage = "Operation Successful with ID - " + result._id;
  //         this.lecturerSettings = this.orginalLecturerSettings;
  //       }
  //     });
  //   }
  // }
}
