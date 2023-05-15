import { Component, Input, OnInit } from '@angular/core';
import { Vendor } from 'src/app/_interfaces/vendor';
import { AuthService } from 'src/app/_services/auth/auth.service';
import { OrderService } from 'src/app/_services/order/order.service';
import { VendorService } from 'src/app/_services/vendor/vendor.service';

@Component({
  selector: 'app-orders-all',
  templateUrl: './orders-all.component.html',
  styleUrls: ['./orders-all.component.css']
})
export class OrdersAllComponent implements OnInit {

  constructor(private orderService: OrderService, private authService: AuthService, private vendorService : VendorService){}

  @Input() orderId = "";

  orders : any = [];
  isLoading = true;

  ngOnInit(): void {
    this.isLoading = true;
    let vendor_email;
    this.authService.currentData.subscribe(vendor => {
      vendor_email = vendor.vendor;
    })

    this.orderService.getOrders({store_email : vendor_email}).subscribe(orders => {
      this.orders = orders;
        this.isLoading = false;
    })
  }
}
