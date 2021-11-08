import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
import { OrdersRoutingModule } from './orders-routing.module';
import { OrdersComponent } from './Orders.component';
import { OrderListComponent } from './Order-list/Order-list.component';
import { OrderService } from './order.service';
import { OrderDetailComponent } from './order-detail/order-detail.component';

@NgModule({
  declarations: [OrdersComponent, OrderListComponent, OrderDetailComponent],
  imports: [
    RouterModule,
    ReactiveFormsModule,
    SharedModule,
    OrdersRoutingModule,
  ],
  exports: [OrdersComponent, OrderListComponent],
  providers: [OrderService],
})
export class OrdersModule {}
 