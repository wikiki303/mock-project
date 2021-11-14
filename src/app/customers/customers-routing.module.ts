import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthGuard } from '../auth/auth.guard';
import { CustomersComponent } from './customers.component';
import { TrackingOrderComponent } from './tracking-order/tracking-order.component';

const routes: Routes = [
  {
    path: '',
    component: CustomersComponent,
    canActivate: [AuthGuard],
    children: [
      { path: '', component: TrackingOrderComponent },
      // {
      //   path: ':id/edit',
      //   component: CustomerEditComponent,
      // },
    ],
  },
];

@NgModule({
  imports: [CommonModule, RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CustomersRoutingModule {}
