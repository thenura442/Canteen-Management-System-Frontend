import { Component, OnInit } from '@angular/core';
import { AuthService } from '../_services/auth/auth.service';
import { UserService } from '../_services/user/user.service';
import { Employee } from '../_interfaces/employee';
import { Router } from '@angular/router';
import { UploadService } from '../_services/upload/upload.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  password : boolean = false;
  image: any = [];
  path = "";

  postErrorFind = false;
  postErrorMessageFind = "";
  postSuccessFind = false;
  postSuccessMessageFind = "";

  postSuccess = false;
  postSuccessMessage = "false";
  postError = false;
  postErrorMessage = "";

  orginalUser: Employee = {
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
  }

  user: Employee = {...this.orginalUser}

  constructor(private authService: AuthService, private uploadService: UploadService , private userService: UserService, private router: Router){}

  ngOnInit(): void {
    this.authService.currentData.subscribe(dataSub => {
      if(dataSub.email != null || dataSub.email != undefined){
        this.userService.getLogged({email : dataSub.email}).subscribe((result : any) => {
          this.user = result;
          console.log(this.user);
        })
      }
    })
  }

  orginalPass : any = {
    old_password : "",
    new_password : "",
    retype_new_password : ""
  }

  pass : any = {...this.orginalPass}

  editPassword(){
    this.password = true;
  }

  cancel(){
    this.pass = this.orginalPass;
    this.password = false;
  }

  update(){
    if(this.pass.new_password != this.pass.retype_new_password){
      this.onHttpError("New Passwords do not Match")
      return;
    }
    this.userService.updatePass({email: this.user.email , old_password : this.pass.old_password , new_password : this.pass.new_password , retype_new_password : this.pass.retype_new_password}).subscribe((result: any) => {
      console.log(result)
      if(Object.hasOwn(result,'Error')){
        const status = Object.getOwnPropertyDescriptor(result, 'Status');
        const error = Object.getOwnPropertyDescriptor(result, 'Error');

        if(status?.value === 500){
          this.onHttpError("Something went Wrong with the Server try again later,.. If the Issue Persists please Contact Support!")
        }
        if(status?.value === 400){
          this.onHttpError(error?.value)
        }
      }
      else{
        this.messages();
        this.postSuccess = true;
        this.postSuccessMessage = "Password Updated Successfully"
        this.pass = {...this.orginalPass}
        this.password = false;
      }
    });
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
          console.log(result.path);
          this.path = result.path;
          this.userService.updatePicture({email : this.user.email, url : this.path}).subscribe((pic:any) => {
            console.log(pic);
            this.user.url = pic.url;
          })
        })
      }
      catch(e) {
        console.log(e);
      }
    }
  }



  onHttpError(errorResponse:  any): void {
    console.log('error : ',errorResponse);
    this.postError = true;
    this.postErrorMessage = errorResponse;
    console.log(this.postErrorMessage)
  }

  messages(): void{

    this.postErrorFind = false;
    this.postSuccessFind = false;

    this.postSuccess = false;
    this.postError = false;
  }


  logout(){
    this.authService.logOut().subscribe((logout: any) => {
      console.log(logout);
      //this.router.navigateByUrl('/login');
    })
  }

}
