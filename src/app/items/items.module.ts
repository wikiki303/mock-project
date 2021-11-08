import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { ItemsComponent } from './items.component';
import { ItemListComponent } from './item-list/item-list.component';
import { ItemEditComponent } from './item-edit/item-edit.component';
import { ItemsRoutingModule } from './items-routing.module';
import { SharedModule } from '../shared/shared.module';
import { CartComponent } from './cart/cart.component';
import { ItemService } from './item.service';

@NgModule({
  declarations: [
    ItemsComponent,
    ItemListComponent,
    ItemEditComponent,
    CartComponent,
    // ItemDetailComponent,
  ],
  imports: [
    RouterModule,
    ReactiveFormsModule,
    ItemsRoutingModule,
    SharedModule,
  ],
  exports: [ItemsComponent, ItemListComponent, ItemEditComponent, CartComponent],
  providers: [ItemService],
})
export class ItemsModule {}
