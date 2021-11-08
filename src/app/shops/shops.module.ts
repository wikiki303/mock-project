import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';

import { ShopsComponent } from './shops.component';
import { ShopListComponent } from './shop-list/shop-list.component';
import { ShopEditComponent } from './shop-edit/shop-edit.component';
import { ShopDetailComponent } from './shop-detail/shop-detail.component';
import { ShopsRoutingModule } from './shops-routing.module';
import { ShopService } from './shop.service';
import { ItemsModule } from '../items/items.module';
import { SharedModule } from '../shared/shared.module';
import { OrdersModule } from '../orders/orders.module';

@NgModule({
  declarations: [
    ShopsComponent,
    ShopListComponent,
    ShopEditComponent,
    ShopDetailComponent,
  ],
  imports: [
    RouterModule,
    ReactiveFormsModule,
    ShopsRoutingModule,
    SharedModule,
    ItemsModule,
    OrdersModule
  ],
  providers: [ShopService],
})
export class ShopsModule {}
