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
import { OrdersAllComponent } from './components/orders-all/orders-all.component';
import { OrdersPendingComponent } from './components/orders-pending/orders-pending.component';
import { OrdersProgressComponent } from './components/orders-progress/orders-progress.component';
import { OrdersPickComponent } from './components/orders-pick/orders-pick.component';
import { OrdersCompletedComponent } from './components/orders-completed/orders-completed.component';
import { OrderfilterPipe } from './_pipes/orderfilter/orderfilter.pipe';
import { ItemsAllComponent } from './components/items-all/items-all.component';
import { ProfileHeaderComponent } from './components/profile-header/profile-header.component';
import { SpinnerComponent } from './components/spinner/spinner.component';
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
    OrdersAllComponent,
    OrdersPendingComponent,
    OrdersProgressComponent,
    OrdersPickComponent,
    OrdersCompletedComponent,
    OrderfilterPipe,
    ItemsAllComponent,
    ProfileHeaderComponent,
    SpinnerComponent,
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
