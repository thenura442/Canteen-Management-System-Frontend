import { Component, Input, OnInit } from '@angular/core';
import { Vendor } from 'src/app/_interfaces/vendor';
import { AuthService } from 'src/app/_services/auth/auth.service';
import { OrderService } from 'src/app/_services/order/order.service';
import { VendorService } from 'src/app/_services/vendor/vendor.service';

@Component({
  selector: 'app-orders-progress',
  templateUrl: './orders-progress.component.html',
  styleUrls: ['./orders-progress.component.css']
})
export class OrdersProgressComponent implements OnInit {
  constructor(private orderService: OrderService, private authService: AuthService){}

  @Input() orderId = "";

  progressArray : any = [];
  isLoading = true;

  ngOnInit(): void {
    let vendor_email;
    this.authService.currentData.subscribe(vendor => {
      vendor_email = vendor.vendor;
    })

    this.orderService.getOrders({store_email : vendor_email}).subscribe(orders => {
      let allOrders : any = [];
      allOrders = orders;
      for(let i = 0; i < allOrders.length; i++) {
        if(allOrders[i].status === 'in progress'){
          this.progressArray.push(allOrders[i]);
        }
      }
      this.isLoading = false;
    })
  }
}
