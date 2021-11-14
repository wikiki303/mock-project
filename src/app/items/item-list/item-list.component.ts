import { Component, EventEmitter, Input, OnChanges, OnDestroy, OnInit, Output } from '@angular/core';
import { User } from 'src/app/auth/user.model';
import { AlertService } from 'src/app/shared/alert/alert.service';
import { Shop } from 'src/app/models/shop.model';
import { ItemService } from '../item.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-item-list',
  templateUrl: './item-list.component.html',
  styleUrls: ['./item-list.component.css'],
})
export class ItemListComponent implements OnInit, OnDestroy {
  @Input() shop: Shop;
  @Input() user: User;
  @Input() cartId: string;
  @Input() hasSubmit: boolean;
  @Output() refreshCart = new EventEmitter<string>();
  @Output() refreshShop = new EventEmitter<string>();
  @Output() updateItem = new EventEmitter<string>();
  defaultImage = environment.defaultImage;

  constructor(private itemService: ItemService, private alertService: AlertService, private spinner: NgxSpinnerService) {}

  ngOnInit(): void {}

  onAddToCartClick(itemId: string) {
    this.spinner.show();
    if (!this.cartId) {
      this.itemService.createCart(this.user?.id, this.shop?.shopId).subscribe(
        (resCreate) => {
          this.addItemToCart(itemId, resCreate.cartId);
        },
        (errorMessage) => {
          this.alertService.error(errorMessage, true);
          this.spinner.hide();
        }
      );
    } else {
      this.addItemToCart(itemId, this.cartId);
    }
  }

  addItemToCart(itemId: string, cartId: string) {
    this.itemService.addItemToCart(itemId, this.user?.id, cartId).subscribe(
      (resData) => {
        if (!resData.isSuccess) {
          this.alertService.error(resData.errorMessage, true);
          return;
        }
        this.cartId = resData.cartId;
        this.refreshCart.emit(this.cartId);
        this.spinner.hide();
      },
      (errorMessage) => {
        this.alertService.error(errorMessage, true);
        this.spinner.hide();
      }
    );
  }

  onDeleteItemClick(itemId: string) {
    this.itemService.deleteItem(this.shop.shopId, itemId).subscribe(
      (resData) => {
        this.refreshShop.emit(this.shop.shopId);
        this.alertService.success('Delete Success', true);
      },
      (errorMessage) => {
        this.alertService.error(errorMessage, true);
      }
    );
  }

  ngOnDestroy() {
    this.spinner.hide();
  }
}
