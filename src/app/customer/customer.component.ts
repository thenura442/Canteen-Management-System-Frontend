import { Component, OnInit } from '@angular/core';
import { CustomerService } from '../_services/customer/customer.service';
import { NgForm } from '@angular/forms';
import { Customer } from '../_interfaces/customer';

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.css']
})
export class CustomerComponent implements OnInit {

  constructor(private customerService : CustomerService){}

  postErrorFind = false;
  postErrorMessageFind = "";
  postSuccessFind = false;
  postSuccessMessageFind = "";

  postSuccess = false;
  postSuccessMessage = "false";
  postError = false;
  postErrorMessage = "";

  updateTrue = false;

  orginalCustomerForm : Customer = {
    first_name: "",
    last_name: "",
    nic: "",
    dob: "",
    email: "",
    mobile_no: "",
    address: "",
    access: "",
    url: "https://canteen-management-system-nsbm.s3.ap-south-1.amazonaws.com/profile+pic.jpg",
    password: ""
  }

  customerForm : Customer = {...this.orginalCustomerForm};

  ngOnInit(): void {
  }


  onHttpError(errorResponse:  any): void {
    console.log('error : ',errorResponse);
    this.postError = true;
    this.postErrorMessage = errorResponse;
    console.log(this.postErrorMessage)
  }


   onSubmit(form: NgForm) {
    if(form.valid) {
      this.messages();
      this.customerForm.password = this.customerForm.email+'-'+this.customerForm.dob
      this.customerService.postCustomerForm(this.customerForm).subscribe((result : any) => {
        console.log(result);
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
          this.postSuccessMessage = result.email + "- Successfully Registered";
          this.customerForm = this.orginalCustomerForm;
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

      this.customerService.getCustomerId(this.body).subscribe((result : any) => {
        if(result == null) {
          this.postErrorMessageFind = "Customer not Found";
          this.postErrorFind = true;
          this.postSuccessFind = false;
        }
        else{
          this.updateTrue= true;
          this.customerForm = result;
          this.postErrorFind = false;
          this.postSuccessFind = true;
          this.postSuccessMessageFind = result.email + " - Customer Found";
          this.updateTrue = true;
        }
      })
    }
  }


  onUpdate(form: NgForm){
    if(form.valid){
      this.messages();
      this.customerService.updateCustomer(this.customerForm).subscribe((result) => {
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
          this.customerForm = {...this.orginalCustomerForm}
          this.body = {...this.orginalBody}
          this.updateTrue = false;
        }
      });
    }
  }


  onDelete(form: NgForm){
    if(form.valid){
      this.messages();
      this.customerService.deleteCustomer(this.customerForm).subscribe((result : any) => {
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
          this.postSuccessMessage = this.customerForm.email + " - Deleted Successfully!"
          this.customerForm = {...this.orginalCustomerForm}
          this.body = {...this.orginalBody}
          this.updateTrue = false;
        }
      });
    }
  }

  onCancel():void {
    this.customerForm = {...this.orginalCustomerForm}
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
