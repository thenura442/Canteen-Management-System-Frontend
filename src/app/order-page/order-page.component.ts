import { Component } from '@angular/core';
import { OrderService } from '../_services/order/order.service';
import { VendorService } from '../_services/vendor/vendor.service';
import { Vendor } from '../_interfaces/vendor';
import { ActivatedRoute } from '@angular/router';
import { CustomerService } from '../_services/customer/customer.service';
import { Order } from '../_interfaces/order';

@Component({
  selector: 'app-order-page',
  templateUrl: './order-page.component.html',
  styleUrls: ['./order-page.component.css']
})
export class OrderPageComponent {
  constructor( private activatedRoute : ActivatedRoute , private customerService: CustomerService , private orderService: OrderService, private vendorService : VendorService){}

  progressArray : any = [];
  orginalOrder: Order = {
    id: "",
    customer_email: "",
    store_email: "",
    sub_total: "",
    payment_type: "",
    discount: "",
    total: "",
    date: "" ,
    time: "",
    status: "",
    rejected_reasons: "",
    products: [{
      id: "",
      item_name: "",
      price: "",
      quantity: "",
      url: "",
      product_total: ""
    }]
  };

  order : Order = {...this.orginalOrder};

  customer: any = [];
  order_id: any = "";
  isEdit = false;
  noEditStatus = false;
  reason_reject = "";

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
      if(result.status == 'completed' || result.status == 'rejected' || result.status == 'cancelled'){
        this.noEditStatus = true;
      }
      else {
        this.noEditStatus = false;
      }
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
    if(this.reason_reject === ""){
      console.log("Yoo")
      return;
    }
    let status = "rejected";
    if(this.reason_reject === "Customer Cancel Request"){
      status = "cancelled";
    }
    this.orderService.updateStatus({id: this.order_id , status : status, rejected_reason : this.reason_reject}).subscribe(order => {
      console.log(order);
      this.reload();
    })
  }

  reload(){
    this.orderService.getById({id: this.order_id}).subscribe(result => {
      if(result.status == 'completed' || result.status == 'rejected' || result.status == 'cancelled'){
        this.noEditStatus = true;
      }
      else {
        this.noEditStatus = false;
      }
      this.order = result;
    })
  }

  edit(){
    this.isEdit = true;
  }

  cancel(){
    this.isEdit = false;
    this.reload();
  }


  minus(item_id: any){
    this.isEdit = true;
    let sub_tot = 0;
    let tot = 0;
    for (let i = 0; i < this.order.products.length; i++) {
      if(this.order.products[i].id == item_id){
        let quantity = Number(this.order.products[i].quantity) - 1;
        this.order.products[i].quantity = quantity.toString();
        let product_total = Number(this.order.products[i].product_total) - Number(this.order.products[i].price);
        this.order.products[i].product_total = product_total.toString();
        let total = Number(this.order.products[i].product_total) - Number(this.order.products[i].price);
        this.order.products[i].product_total = product_total.toString();
      }
      sub_tot = sub_tot + Number(this.order.products[i].product_total);
      tot = sub_tot;
    }
    this.order.sub_total = sub_tot.toString();
    this.order.total = tot.toString();
  }

  add(item_id : any){
    this.isEdit = true;
    let sub_tot = 0;
    let tot = 0;
    for (let i = 0; i < this.order.products.length; i++) {
      if(this.order.products[i].id == item_id){
        let quantity = Number(this.order.products[i].quantity) + 1;
        this.order.products[i].quantity = quantity.toString();
        let product_total = Number(this.order.products[i].product_total) + Number(this.order.products[i].price);
        this.order.products[i].product_total = product_total.toString();
        let total = Number(this.order.products[i].product_total) - Number(this.order.products[i].price);
        this.order.products[i].product_total = product_total.toString();
      }
      sub_tot = sub_tot + Number(this.order.products[i].product_total);
      tot = sub_tot;
    }
    this.order.sub_total = sub_tot.toString();
    this.order.total = tot.toString();
  }


  remove(id : any){
    this.orderService.deleteItem({item_id:id, order_id: this.order.id}).subscribe((result : any) => {
      this.reload();
      if(result.deletedCount == 1){
        this.order = {...this.orginalOrder}
      }
    })
  }


  update(){
    this.isEdit = false;
    this.orderService.updateOrder(this.order).subscribe((result : any) => {
      this.reload();
    })
  }
}
