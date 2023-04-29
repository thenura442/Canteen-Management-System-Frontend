import { Component } from '@angular/core';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent {

  type = "all";

  all(){
    this.type = "all";
  }

  pending() {
    this.type = "pending";
  }

  progress(){
    this.type = "in progress";
  }

  pick(){
    this.type = "pick up";
  }

  completed(){
    this.type = "completed";
  }
}
