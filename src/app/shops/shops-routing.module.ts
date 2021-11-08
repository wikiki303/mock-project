import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthGuard } from '../auth/auth.guard';
import { ShopDetailComponent } from './shop-detail/shop-detail.component';
import { ShopEditComponent } from './shop-edit/shop-edit.component';
import { ShopListComponent } from './shop-list/shop-list.component';
import { ShopsComponent } from './shops.component';

const routes: Routes = [
  {
    path: '',
    component: ShopsComponent,
    // canActivate: [AuthGuard],
    children: [
      { path: '', component: ShopListComponent },
      {
        path: ':id',
        component: ShopDetailComponent,
        canActivate: [AuthGuard],
        // resolve: [ShopsResolverService]
      },
      {
        path: ':id/edit',
        component: ShopEditComponent,
        // resolve: [ShopsResolverService]
      },
    ],
  },
];

@NgModule({
  imports: [CommonModule, RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ShopsRoutingModule {}
