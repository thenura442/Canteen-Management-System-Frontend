import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Vendor } from 'src/app/_interfaces/vendor';

const URL = 'http://localhost:5500/';
const PATH = 'api/vendor/';

@Injectable({
  providedIn: 'root'
})
export class VendorService {

  constructor(private http: HttpClient) { }

  postVendorForm(vendorSettings: Vendor) : Observable<Vendor> {
    return this.http.post<Vendor>(URL+PATH+'register',vendorSettings);
  }

  findVendorId(body: any) : any {
    return this.http.post(URL+PATH+'get/id', body);
  }

  updateVendor(vendorSettings: Vendor) : Observable<Vendor>  {
    return this.http.post<Vendor>(URL+PATH+'update/id', vendorSettings);
  }

  deleteVendor(deleteVendorSettings: Vendor) : Observable<Vendor> {
    return this.http.post<Vendor>(URL+PATH+'delete/id', deleteVendorSettings);
  }

  getVendors() : any {
    return this.http.get(URL+PATH+'get/access');
  }
}
