import { Component} from '@angular/core';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent {

  searchedOrderId : string = "";

  allStatus  = true;
  pendingStatus  = false;
  progressStatus  = false;
  pickStatus  = false;
  completedStatus  = false;

  all(){
    this.allStatus = true;
    this.pendingStatus = false;
    this.progressStatus = false;
    this.pickStatus = false;
    this.completedStatus = false;
  }

  pending() {
    this.allStatus = false;
    this.pendingStatus = true;
    this.progressStatus = false;
    this.pickStatus = false;
    this.completedStatus = false;
  }

  progress(){
    this.allStatus = false;
    this.pendingStatus = false;
    this.progressStatus = true;
    this.pickStatus = false;
    this.completedStatus = false;
  }

  pick(){
    this.allStatus = false;
    this.pendingStatus = false;
    this.progressStatus = false;
    this.pickStatus = true;
    this.completedStatus = false;
  }

  completed(){
    this.allStatus = false;
    this.pendingStatus = false;
    this.progressStatus = false;
    this.pickStatus = false;
    this.completedStatus = true;
  }
}
