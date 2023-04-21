import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Item } from 'src/app/_interfaces/item';

const URL = 'http://localhost:5500/';
const PATH = 'api/item/';

@Injectable({
  providedIn: 'root'
})
export class ItemService {

  constructor(private http: HttpClient) { }

  postVendorForm(itemSettings: Item) : Observable<Item> {
    return this.http.post<Item>(URL+PATH+'register',itemSettings);
  }

  findVendorId(body: any) : any {
    return this.http.post(URL+PATH+'get/id', body);
  }

  updateVendor(itemSettings: Item) : Observable<Item>  {
    return this.http.post<Item>(URL+PATH+'update/id', itemSettings);
  }

  deleteVendor(deleteItemSettings: Item) : Observable<Item> {
    return this.http.post<Item>(URL+PATH+'delete/id', deleteItemSettings);
  }
}
