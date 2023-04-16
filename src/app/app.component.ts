import { Component, OnInit } from '@angular/core';
import { AuthService } from './_services/auth/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'web-frontend';

  isUser = false;
  user: any ;

  constructor(private authService:AuthService){}

  ngOnInit(){
    this.authService.currentData.subscribe(dataSub => {
      let user = dataSub;
      this.user = dataSub;
      if(user != null){
        this.isUser = true;
      }
    })
  }
}
