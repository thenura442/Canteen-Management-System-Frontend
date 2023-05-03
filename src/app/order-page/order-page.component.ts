import { Component } from '@angular/core';
import { OrderService } from '../_services/order/order.service';
import { VendorService } from '../_services/vendor/vendor.service';
import { Vendor } from '../_interfaces/vendor';
import { ActivatedRoute } from '@angular/router';
import { CustomerService } from '../_services/customer/customer.service';

@Component({
  selector: 'app-order-page',
  templateUrl: './order-page.component.html',
  styleUrls: ['./order-page.component.css']
})
export class OrderPageComponent {
  constructor( private activatedRoute : ActivatedRoute , private customerService: CustomerService , private orderService: OrderService, private vendorService : VendorService){}

  progressArray : any = [];
  order: any = [];
  customer: any = [];
  order_id: any = "";

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
    let order_id;
    let customer_email;

    this.activatedRoute.params.subscribe(parameter => {
      this.order_id = parameter['id'];
      order_id = parameter['id']
    })

    this.orderService.getById({id: order_id}).subscribe(result => {
      console.log(result)
      this.order = result;
      vendor_email = result.store_email;
      customer_email = result.customer_email;
      this.vendorService.findVendorId({email : vendor_email}).subscribe((vendor : any) => {
        console.log(vendor)
        this.vendor = vendor;
      })

      this.customerService.getCustomerId({ email : customer_email}).subscribe(customer => {
        this.customer = customer;
      })
    })
  }

  acceptStatus(){
    this.orderService.updateStatus({id: this.order_id , status : "in progress"}).subscribe(order => {
      console.log(order);
      this.reload();
    })
  }

  pickStatus(){
    this.orderService.updateStatus({id: this.order_id , status : "pick up"}).subscribe(order => {
      console.log(order);
      this.reload();
    })
  }

  completeStatus(){
    this.orderService.updateStatus({id: this.order_id , status : "completed"}).subscribe(order => {
      console.log(order);
      this.reload();
    })
  }

  rejectStatus(){
    this.orderService.updateStatus({id: this.order_id , status : "rejected"}).subscribe(order => {
      console.log(order);
      this.reload();
    })
  }

  reload(){
    this.orderService.getById({id: this.order_id}).subscribe(result => {
      this.order = result;
    })
  }
}
