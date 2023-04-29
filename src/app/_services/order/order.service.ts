import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';


const URL = 'http://localhost:5500/';
const PATH = 'api/order/';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(private http: HttpClient) {}

  getOrders(vendor : any) {
    return this.http.post(URL+PATH+'get', vendor)
  }

  getById(id : any) {
    return this.http.post<any>(URL+PATH+'get/id', id)
  }

}
