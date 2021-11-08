import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthGuard } from '../auth/auth.guard';
import { OrderDetailComponent } from './order-detail/order-detail.component';
import { OrderListComponent } from './Order-list/Order-list.component';
import { OrdersComponent } from './Orders.component';

const routes: Routes = [
  {
    path: '',
    component: OrdersComponent,
    // canActivate: [AuthGuard],
    children: [
      { path: '', component: OrderListComponent },
      {
        path: ':id',
        component: OrderDetailComponent,
        // resolve: [OrdersResolverService]
      },
      {
        path: ':id/edit',
        // component: OrderEditComponent,
        // resolve: [OrdersResolverService]
      },
    ],
  },
];

@NgModule({
  imports: [CommonModule, RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class OrdersRoutingModule {}
