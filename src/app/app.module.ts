import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http'

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { VendorComponent } from './vendor/vendor.component';
import { EmployeeComponent } from './employee/employee.component';
import { ItemComponent } from './item/item.component';
import { LoginComponent } from './login/login.component';
import { ProfileComponent } from './profile/profile.component';
import { CustomerComponent } from './customer/customer.component';
import { SideNavBarComponent } from './side-nav-bar/side-nav-bar.component';
import { ItemListComponent } from './item.list/item.list.component';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { SearchfilterPipe } from './_pipes/searchfilter/searchfilter.pipe';
import { ClipboardModule } from '@angular/cdk/clipboard';
import { OrdersComponent } from './orders/orders.component';
import { OrderPageComponent } from './order-page/order-page.component';

@NgModule({
  declarations: [
    AppComponent,
    VendorComponent,
    EmployeeComponent,
    ItemComponent,
    LoginComponent,
    ProfileComponent,
    CustomerComponent,
    SideNavBarComponent,
    ItemListComponent,
    SearchfilterPipe,
    OrdersComponent,
    OrderPageComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    Ng2SearchPipeModule,
    ClipboardModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
