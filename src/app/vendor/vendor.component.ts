import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '../_services/auth/auth.service';
import { Vendor } from '../_interfaces/vendor';
import { VendorService } from '../_services/vendor/vendor.service';

@Component({
  selector: 'app-vendor',
  templateUrl: './vendor.component.html',
  styleUrls: ['./vendor.component.css']
})
export class VendorComponent implements OnInit {

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

  constructor(private authService: AuthService, private vendorService: VendorService){}

  ngOnInit(){

  }

  originalVendorForm: Vendor = {
    vendor_name: "",
    email: "",
    description: "",
    url: "https://canteen-management-system-nsbm.s3.ap-south-1.amazonaws.com/",
    mobile_no: "",
    access: ""
  };

  vendorForm: Vendor = {...this.originalVendorForm}


  onHttpError(errorResponse:  any): void {
    console.log('error : ',errorResponse);
    this.postError = true;
    this.postErrorMessage = errorResponse;
    console.log(this.postErrorMessage)
  }


   onSubmit(form: NgForm) {
    console.log('in on submit : '+ form.valid);
    if(form.valid && this.vendorForm.access != 'Set Access') {
      this.messages();
      this.vendorService.postVendorForm(this.vendorForm).subscribe((result) => {
        console.log(result);
        if(Object.hasOwn(result,'Error')){
          const status = Object.getOwnPropertyDescriptor(result, 'Status');
          const error = Object.getOwnPropertyDescriptor(result, 'Error');

          if(status?.value === "400") {
            this.onHttpError(error?.value)
          }
          else {
            this.onHttpError("Something went Wrong with the Server try again later,.. If the Issue Persists please Contact Support!");
            console.log(result)
          }
        }
        else {
          this.postError = false;
          this.postSuccess = true;
          this.postSuccessMessage = result.email + "- Successfully Registered";
          this.vendorForm = this.originalVendorForm;
        }
      });
    }
  }


  orginalBody : any = {
    email: ''
  }

  body : any = {...this.orginalBody}

  onFind(search: NgForm){
    console.log("in on submit "+ search.valid);
    if(search.valid){
      this.messages();

      this.vendorService.findVendorId(this.body).subscribe((result : any) => {
        if(result == null) {
          this.postErrorMessageFind = "Employee not Found";
          this.postErrorFind = true;
          this.postSuccessFind = false;
        }
        else{
          this.vendorForm = result;
          this.postErrorFind = false;
          this.postSuccessFind = true;
          this.postSuccessMessageFind = result.email + " - Vendor Found";
          this.updateTrue = true;
        }
      })
    }
  }


  onUpdate(form: NgForm){
    console.log("in on submit "+ form.valid);
    console.log(this.vendorForm);
    if(form.valid){
      this.messages();
      console.log(this.vendorForm);
      this.vendorService.updateVendor(this.vendorForm).subscribe((result) => {
        console.log(result);
        if (Object.hasOwn(result, 'Error')) {
          const status = Object.getOwnPropertyDescriptor(result, 'Status');
          const error = Object.getOwnPropertyDescriptor(result, 'Error');

          if (status?.value === "400") {
            this.onHttpError(error?.value);
          }
          else {
            this.onHttpError("Something went Wrong with the Server try again later,.. If the Issue Persists please Contact Support!");
            console.log(result);
          }
        }
        else {
          this.postError = false;
          this.postSuccess = true;
          this.postSuccessMessage = this.body.email + " - Updated Successfully";
          this.vendorForm = { ...this.originalVendorForm };
          this.body = this.orginalBody;
          this.updateTrue = false;
        }
      });
    }
  }


  onDelete(form: NgForm){
    console.log("in on submit "+ form.valid);
    if(form.valid){
      this.messages();
      this.vendorService.deleteVendor(this.vendorForm).subscribe((result : any) => {
        console.log(result);
        if(Object.hasOwn(result,'Error')){
          const status = Object.getOwnPropertyDescriptor(result, 'Status');
          const error = Object.getOwnPropertyDescriptor(result, 'Error');

          if(status?.value === "400") {
            this.onHttpError(error?.value)
          }
          else {
            this.onHttpError("Something went Wrong with the Server try again later,.. If the Issue Persists please Contact Support!");
            console.log(result)
          }
        }
        else {
          this.postError = false;
          this.postSuccess = true;
          this.postSuccessMessage = this.vendorForm.email + " - Deleted Successfully!"
          this.vendorForm = {...this.originalVendorForm}
          this.updateTrue = false;
        }
      });
    }
  }

  onCancel():void {
    this.vendorForm = {...this.originalVendorForm}
    this.messages();
  }

  messages(): void{

    this.postErrorFind = false;
    this.postSuccessFind = false;

    this.postSuccess = false;
    this.postError = false;
  }
}
