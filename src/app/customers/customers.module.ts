import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';

import { SharedModule } from '../shared/shared.module';
import { TrackingOrderComponent } from './tracking-order/tracking-order.component';
import { CustomerService } from './customer.service';
import { CustomersRoutingModule } from './customers-routing.module';
import { OrdersModule } from '../orders/orders.module';
import { CustomersComponent } from './customers.component';

@NgModule({
  declarations: [CustomersComponent, TrackingOrderComponent],
  imports: [
    RouterModule,
    ReactiveFormsModule,
    CustomersRoutingModule,
    SharedModule,
    OrdersModule
  ],
  providers: [CustomerService],
})
export class CustomersModule {}
