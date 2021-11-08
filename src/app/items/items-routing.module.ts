import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthGuard } from '../auth/auth.guard';
import { ItemEditComponent } from './item-edit/item-edit.component';
import { ItemListComponent } from './item-list/item-list.component';
import { ItemsComponent } from './items.component';

const routes: Routes = [
  {
    path: '',
    component: ItemsComponent,
    // canActivate: [AuthGuard],
    children: [
      { path: '', component: ItemListComponent },
      {
        path: ':id',
        // component: ItemDetailComponent,
        // resolve: [ItemsResolverService]
      },
      {
        path: ':id/edit',
        component: ItemEditComponent,
        // resolve: [ItemsResolverService]
      },
    ],
  },
];

@NgModule({
  imports: [CommonModule, RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ItemsRoutingModule {}
