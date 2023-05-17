import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Employee } from 'src/app/_interfaces/employee';
import { AuthService } from 'src/app/_services/auth/auth.service';
import { UserService } from 'src/app/_services/user/user.service';

@Component({
  selector: 'app-profile-header',
  templateUrl: './profile-header.component.html',
  styleUrls: ['./profile-header.component.css']
})
export class ProfileHeaderComponent implements OnInit {

  constructor(private location: Location, private authService: AuthService , private userService: UserService ,public router: Router){}

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

  ngOnInit(): void {
    this.authService.currentData.subscribe(dataSub => {
      if(dataSub.email != null || dataSub.email != undefined){
        this.userService.getLogged({email : dataSub.email}).subscribe((result : any) => {
          this.user = result;
        })
      }
    })
  }

  logout(){
    this.authService.logOut().subscribe((logout: any) => {
      console.log(logout);
      this.router.navigateByUrl('/login');
    })
  }

  backNav(){
    this.location.back();
  }

}
