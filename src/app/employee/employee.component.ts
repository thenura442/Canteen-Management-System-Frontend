import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '../_services/auth/auth.service';
import { Employee } from '../_interfaces/employee';
import { VendorService } from '../_services/vendor/vendor.service';
import { EmployeeService } from '../_services/employee/employee.service';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']
})
export class EmployeeComponent implements OnInit{

  constructor(private employeeService : EmployeeService, private vendorService : VendorService  ,private authService: AuthService){}

  postErrorFind = false;
  postErrorMessageFind = "";
  postSuccessFind = false;
  postSuccessMessageFind = "";

  postSuccess = false;
  postSuccessMessage = "false";
  postError = false;
  postErrorMessage = "";

  updateTrue = false;
  type : any;

  vendorForm : any = []

  ngOnInit(){
    this.authService.currentData.subscribe(dataSub => {
      this.type= dataSub.type;
    })

    this.vendorService.getVendors().subscribe((vendors : any) => {
      this.vendorForm = vendors;
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
    url: "https://canteen-management-system-nsbm.s3.ap-south-1.amazonaws.com/profile+pic.jpg",
    password: ""
  };

  employeeForm: Employee = {...this.originalEmployeeForm}

  onHttpError(errorResponse:  any): void {
    console.log('error : ',errorResponse);
    this.postError = true;
    this.postErrorMessage = errorResponse;
    console.log(this.postErrorMessage)
  }


   onSubmit(form: NgForm) {
    if(form.valid) {
      this.messages();
      this.employeeForm.password = this.employeeForm.email+'-'+this.employeeForm.dob
      this.employeeService.postEmployeeForm(this.employeeForm).subscribe((result : any) => {;
        if(Object.hasOwn(result,'Error')){
          const status = Object.getOwnPropertyDescriptor(result, 'Status');
          const error = Object.getOwnPropertyDescriptor(result, 'Error');

          if(status?.value === "400") {
            this.onHttpError(error?.value)
          }
          else {
            this.onHttpError("Something went Wrong with the Server try again later,.. If the Issue Persists please Contact Support!");
          }
        }
        else {
          this.postError = false;
          this.postSuccess = true;
          this.postSuccessMessage = this.employeeForm.email + "- Successfully Registered";
          this.employeeForm = this.originalEmployeeForm;
        }
      });
    }
  }


  orginalBody : any = {
    email: ''
  }

  body : any = {...this.orginalBody}

  onFind(search: NgForm){
    if(search.valid){
      this.messages();

      this.employeeService.getEmployeeId(this.body).subscribe((result : any) => {
        if(result == null) {
          this.postErrorMessageFind = "Employee not Found";
          this.postErrorFind = true;
          this.postSuccessFind = false;
        }
        else{
          this.updateTrue= true;
          this.employeeForm = result;
          this.postErrorFind = false;
          this.postSuccessFind = true;
          this.postSuccessMessageFind = result.email + " - Employee Found";
          this.updateTrue = true;
        }
      })
    }
  }


  onUpdate(form: NgForm){
    if(form.valid){
      this.messages();
      this.employeeService.updateEmployee(this.employeeForm).subscribe((result) => {
        if (Object.hasOwn(result, 'Error')) {
          const status = Object.getOwnPropertyDescriptor(result, 'Status');
          const error = Object.getOwnPropertyDescriptor(result, 'Error');

          if (status?.value === "400") {
            this.onHttpError(error?.value);
          }
          else {
            this.onHttpError("Something went Wrong with the Server try again later,.. If the Issue Persists please Contact Support!");
          }
        }
        else {
          this.postError = false;
          this.postSuccess = true;
          this.postSuccessMessage = this.body.email + " - Updated Successfully";
          this.employeeForm = {...this.originalEmployeeForm}
          this.body = {...this.orginalBody}
          this.updateTrue = false;
        }
      });
    }
  }


  onDelete(form: NgForm){
    if(form.valid){
      this.messages();
      this.employeeService.deleteEmployee(this.employeeForm).subscribe((result : any) => {
        if(Object.hasOwn(result,'Error')){
          const status = Object.getOwnPropertyDescriptor(result, 'Status');
          const error = Object.getOwnPropertyDescriptor(result, 'Error');

          if(status?.value === "400") {
            this.onHttpError(error?.value)
          }
          else {
            this.onHttpError("Something went Wrong with the Server try again later,.. If the Issue Persists please Contact Support!");
          }
        }
        else {
          this.postError = false;
          this.postSuccess = true;
          this.postSuccessMessage = this.employeeForm.email + " - Deleted Successfully!"
          this.employeeForm = {...this.originalEmployeeForm}
          this.body = {...this.orginalBody}
          this.updateTrue = false;
        }
      });
    }
  }

  onCancel():void {
    this.employeeForm = {...this.originalEmployeeForm}
    this.messages();
    this.updateTrue= false;
    this.body = {...this.orginalBody}
  }

  messages(): void{

    this.postErrorFind = false;
    this.postSuccessFind = false;

    this.postSuccess = false;
    this.postError = false;
  }
}
