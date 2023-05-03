import { Component, OnInit } from '@angular/core';
import { ItemService } from '../_services/item/item.service';

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.css']
})
export class ItemComponent implements OnInit{

  constructor(private itemService: ItemService){}



  see_form: boolean = false;
  items: any = [];
  filter : any = "";

  ngOnInit(): void {
    this.itemService.findItems({email : "streetstore@gmail.com"}).subscribe((result : any ) => {
      this.items = result;
      //console.log(result)
    })
  }

  seeForm(){
    this.see_form = !this.see_form;
  }

  onClipboardCopy(success : boolean) : void {

  }

}
