import { Component, OnInit } from '@angular/core';
import { ItemService } from '../_services/item/item.service';
import { Item } from '../_interfaces/item';
import { UploadService } from '../_services/upload/upload.service';
import { NgForm } from '@angular/forms';
import { VendorService } from '../_services/vendor/vendor.service';
import { AuthService } from '../_services/auth/auth.service';

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.css']
})
export class ItemComponent implements OnInit{

  constructor( private vendorService : VendorService , private itemService: ItemService, private uploadService: UploadService , private authService : AuthService){}

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
  image: any = [];
  originalImage: any = [];

  orginalItemForm : Item = {
    id: "",
    item_name: "",
    vendor: "",
    description: "",
    url: "",
    meal_type: "",
    type: "",
    price: "",
    availability: ""
  }


  vendorEmail = ""
  vendorForm : any = []
  itemForm :Item = {...this.orginalItemForm}


  see_form: boolean = true;
  items: any = [];
  filter : any = "";

  onHttpError(errorResponse:  any): void {
    console.log('error : ',errorResponse);
    this.postError = true;
    this.postErrorMessage = errorResponse;
  }


   onSubmit(form: NgForm) {
    if(form.valid) {
      if(this.image[0] == undefined) {
        this.onHttpError('Please Set an Item Image');
        return
      }
      this.messages();
      this.itemService.postItemForm(this.itemForm).subscribe((result : any) => {
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
          this.postSuccessMessage = "Item Successfully Registered";
          this.itemForm = this.orginalItemForm;
          this.image = this.originalImage;
        }
      });
    }
    else{
      console.log(false);
    }
  }


  orginalBody : any = {
    id: ''
  }

  body : any = {...this.orginalBody}

  onFind(search: NgForm){
    if(search.valid){
      this.messages();

      this.itemService.findItemId(this.body).subscribe((result : any) => {
        if(result.id == null) {
          this.postErrorMessageFind = "Item not Found";
          this.postErrorFind = true;
          this.postSuccessFind = false;
        }
        else{
          this.updateTrue= true;
          this.itemForm = result;
          this.postErrorFind = false;
          this.postSuccessFind = true;
          this.postSuccessMessageFind = result.id + " - Item Found";
          this.updateTrue = true;
        }
      })
    }
  }


  onUpdate(form: NgForm){
    if(form.valid){
      this.messages();
      this.itemService.updateItem(this.itemForm).subscribe((result) => {
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
          this.postSuccessMessage = this.body.id + " - Updated Successfully";
          this.itemForm = {...this.orginalItemForm}
          this.body = {...this.orginalBody}
          this.image = {...this.originalImage}
          this.updateTrue = false;
        }
      });
    }
  }


  onDelete(form: NgForm){
    if(form.valid){
      this.messages();
      this.itemService.deleteItem(this.itemForm).subscribe((result : any) => {
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
          this.postSuccessMessage = this.itemForm.id + " - Deleted Successfully!"
          this.itemForm = {...this.orginalItemForm}
          this.body = {...this.orginalBody}
          this.image = {...this.originalImage}
          this.updateTrue = false;
        }
      });
    }
  }

  selectImage(fileInput: any) {
    this.messages();
    this.image = fileInput.target.files;

    if(this.image[0] == undefined) {
      return
    }

    if(this.image[0] != undefined) {
      const formData: any = new FormData();
      formData.append('url',this.image[0])
      try{
          this.uploadService.postFiles(formData).subscribe((result: any) => {
          this.itemForm.url = result.path;
        })
      }
      catch(e) {
        console.log(e);
      }
    }
  }

  onCancel():void {
    this.itemForm = {...this.orginalItemForm}
    this.messages();
    this.updateTrue= false;
    this.body = {...this.orginalBody}
    this.image = {...this.originalImage}
  }

  messages(): void{

    this.postErrorFind = false;
    this.postSuccessFind = false;

    this.postSuccess = false;
    this.postError = false;
  }

  ngOnInit(): void {

    this.vendorService.getVendors().subscribe((vendors : any) => {
      this.vendorForm = vendors;
      console.log(vendors)
    })

    let vendor = ""
    this.authService.currentData.subscribe((data : any) => {
      vendor = data.vendor
      this.vendorEmail = data.vendor
    })

    this.itemService.findAllItems({email : vendor}).subscribe((result : any ) => {
      this.items = result;
    })
  }

  seeForm(){
    this.see_form = !this.see_form;
    this.itemService.findAllItems({email : this.vendorEmail}).subscribe(async(result : any ) => {
      this.items = await result;
    })
  }

  onClipboardCopy(success : boolean) : void {

  }

}
