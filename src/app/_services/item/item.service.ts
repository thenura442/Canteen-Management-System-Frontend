import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Item } from 'src/app/_interfaces/item';

const URL = 'https://cms-backend-d9n7.onrender.com/';
const PATH = 'api/item/';

@Injectable({
  providedIn: 'root'
})
export class ItemService {

  constructor(private http: HttpClient) { }

  findItems(body: any) : any {
    return this.http.post(URL+PATH+'get', body);
  }

  findAllItems(body: any) : any {
    return this.http.post(URL+PATH+'get/vendor', body);
  }

  postItemForm(itemSettings: Item) : Observable<Item> {
    return this.http.post<Item>(URL+PATH+'register',itemSettings);
  }

  findItemId(body: any) : any {
    return this.http.post(URL+PATH+'get/id', body);
  }

  updateItem (itemSettings: Item) : Observable<Item>  {
    return this.http.post<Item>(URL+PATH+'update/id', itemSettings);
  }

  deleteItem(deleteItemSettings: Item) : Observable<Item> {
    return this.http.post<Item>(URL+PATH+'delete/id', deleteItemSettings);
  }
}
