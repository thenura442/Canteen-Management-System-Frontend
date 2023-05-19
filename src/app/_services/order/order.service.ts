import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';


const URL = 'https://cms-backend-d9n7.onrender.com/';
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

  updateStatus(status : any) {
    return this.http.post<any>(URL+PATH+'update/status', status)
  }

  updateRejectStatus(status : any) {
    return this.http.post<any>(URL+PATH+'update/reject', status)
  }

  updateOrder(order : any):any{
    return this.http.post(URL+PATH+'update',order);
  }

}
