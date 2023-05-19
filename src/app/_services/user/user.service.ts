import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

const URL = 'https://cms-backend-d9n7.onrender.com/';
const PATH = 'api/employee/';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http:HttpClient) { }

  getLogged(loginForm: any) {
    return this.http.post<any>(URL+PATH+'get/id',loginForm)
  }


  updatePass(form: any) {
    return this.http.post<any>(URL+PATH+'update/pass',form)
  }

  updatePicture(form: any): any {
    return this.http.post(URL+PATH+'update/picture',form);
  }
}
