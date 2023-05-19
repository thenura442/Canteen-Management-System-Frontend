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
import { AppComponent } from './app.component';
import { AdminGuard } from './_guards/admin/admin.guard';
import { UnauthorizedComponent } from './components/unauthorized/unauthorized.component';
import { BlockComponent } from './components/block/block.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { BlockGuard } from './_guards/block/block.guard';
import { OwnerAdminGuard } from './_guards/owner-admin/owner-admin.guard';
import { OwnerEmployeeGuard } from './_guards/owner-employee/owner-employee.guard';

const routes: Routes = [
  { path: 'login',   component: LoginComponent},
  { path: 'employee',   component: EmployeeComponent , canActivate : [OwnerAdminGuard , BlockGuard]},
  { path: 'vendor',   component: VendorComponent, canActivate : [AdminGuard , BlockGuard]},
  { path: 'customer',   component: CustomerComponent , canActivate : [AdminGuard , BlockGuard]},
  { path: 'item',   component: ItemComponent, canActivate : [OwnerEmployeeGuard , BlockGuard]},
  { path: 'profile',   component: ProfileComponent},
  { path: 'orders',   component: OrdersComponent , canActivate : [OwnerEmployeeGuard ,BlockGuard]},
  { path: 'orders/:id',   component: OrderPageComponent, canActivate : [OwnerEmployeeGuard , BlockGuard]},
  { path: 'unauthorized',   component: UnauthorizedComponent},
  { path: 'block',   component: BlockComponent},
  { path: '',   redirectTo: 'orders', pathMatch: 'full' }
  //{ path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
