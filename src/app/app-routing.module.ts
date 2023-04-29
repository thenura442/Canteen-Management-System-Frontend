import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { EmployeeComponent } from './employee/employee.component';
import { VendorComponent } from './vendor/vendor.component';
import { CustomerComponent } from './customer/customer.component';
import { ItemComponent } from './item/item.component';
import { ProfileComponent } from './profile/profile.component';
import { OrdersComponent } from './orders/orders.component';
import { OrderPageComponent } from './order-page/order-page.component';

const routes: Routes = [
  { path: 'login',   component: LoginComponent},
  { path: 'employee',   component: EmployeeComponent},
  { path: 'vendor',   component: VendorComponent},
  { path: 'customer',   component: CustomerComponent},
  { path: 'item',   component: ItemComponent},
  { path: 'profile',   component: ProfileComponent},
  { path: 'orders',   component: OrdersComponent},
  { path: 'orders/:id',   component: OrderPageComponent},
  { path: '',   redirectTo: '', pathMatch: 'full' }
  //{ path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
