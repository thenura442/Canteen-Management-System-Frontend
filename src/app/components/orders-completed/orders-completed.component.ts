import { Component, Input, OnInit } from '@angular/core';
import { Vendor } from 'src/app/_interfaces/vendor';
import { AuthService } from 'src/app/_services/auth/auth.service';
import { OrderService } from 'src/app/_services/order/order.service';
import { VendorService } from 'src/app/_services/vendor/vendor.service';

@Component({
  selector: 'app-orders-completed',
  templateUrl: './orders-completed.component.html',
  styleUrls: ['./orders-completed.component.css']
})
export class OrdersCompletedComponent implements OnInit {

  constructor(private orderService: OrderService, private authService: AuthService, private vendorService : VendorService){}

  @Input() orderId = "";
  completedArray : any = [];
  isLoading = true;

  ngOnInit(): void {
    this.isLoading = true;
    let vendor_email;
    this.authService.currentData.subscribe(vendor => {
      vendor_email = vendor.vendor;
    })

    this.orderService.getOrders({store_email : vendor_email}).subscribe(orders => {
      let allOrders : any = [];
      this.isLoading =false;
      allOrders = orders;
      for(let i = 0; i < allOrders.length; i++) {
        if(allOrders[i].status === 'completed'){
          this.completedArray.push(allOrders[i]);
        }
      }
    })
  }
}
