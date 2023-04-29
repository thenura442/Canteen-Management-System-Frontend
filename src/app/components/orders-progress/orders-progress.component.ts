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
  constructor(private orderService: OrderService, private authService: AuthService, private vendorService : VendorService){}

  @Input() orderId = "";

  progressArray : any = [];

  orginalVendor : Vendor = {
    vendor_name: "",
    email: "",
    description: "",
    url: "",
    mobile_no: "",
    access: ""
  }

  vendor: Vendor = {...this.orginalVendor}

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
    })

    this.vendorService.findVendorId({email : vendor_email}).subscribe((result : any) => {
      this.vendor = result;
    })
  }
}
