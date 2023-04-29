import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';


const URL = 'http://localhost:5500/';
const PATH = 'api/customer/';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  constructor(private http: HttpClient) {}

  getCustomerId(id : any) {
    return this.http.post<any>(URL+PATH+'get/id', id)
  }
}
