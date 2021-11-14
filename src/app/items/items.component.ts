import { Component, EventEmitter, Input, OnChanges, OnInit, Output } from '@angular/core';
import { User } from '../auth/user.model';
import { AlertService } from '../shared/alert/alert.service';
import { Shop } from '../models/shop.model';
import { Cart } from '../models/cart.model';
import { ItemService } from './item.service';
import _ from 'lodash';

@Component({
  selector: 'app-items',
  templateUrl: './items.component.html',
  styleUrls: ['./items.component.css'],
})
export class ItemsComponent implements OnInit, OnChanges {
  @Input() shop: Shop;
  @Input() user: User;
  @Output() refreshShop = new EventEmitter<string>();
  cart: Cart;
  hasSubmit: boolean;
  itemsByCustomer = [];
  itemId: string = '';

  constructor(private itemService: ItemService, private alertService: AlertService) {}

  ngOnInit(): void {}

  ngOnChanges() {
    this.itemId = '';
    this.checkExistCart();
  }

  onRefreshCart(cartId: string) {
    this.itemService.getCartById(cartId).subscribe(
      (resData) => {
        if (!resData.isSuccess) {
          this.alertService.error(resData.errorMessage, true);
          return;
        }
        this.cart = resData;
        this.createCustomerItems();
      },
      (errorMessage) => {
        this.alertService.error(errorMessage, true);
      }
    );
  }

  onCartOrder(data: any) {
    if (data) {
      this.hasSubmit = data.hasSubmit;
      this.itemsByCustomer = [];
      this.checkExistCart();
    }
  }

  createCustomerItems() {
    if (this.cart) {
      this.itemsByCustomer = [];
      this.cart.itemsInCart.forEach((item) => {
        const index = _.findIndex(this.itemsByCustomer, {
          customerId: item.customerId,
        });
        const total = item.price * item.amount;
        if (index >= 0) {
          this.itemsByCustomer[index].customerTotal += total;
          this.itemsByCustomer[index].hasSubmit = item.readyToOrder ? item.readyToOrder : this.itemsByCustomer[index].hasSubmit;
          this.itemsByCustomer[index].items.push(item);
        } else {
          this.itemsByCustomer.push({
            customerId: item.customerId,
            customerName: item.customerName,
            customerTotal: total,
            cartId: this.cart.cartId,
            hasSubmit: item.readyToOrder,
            items: [{ ...item }],
          });
        }
      });

      if (this.user) {
        const customer = _.find(this.itemsByCustomer, {
          customerId: this.user.id,
        });
        this.hasSubmit = customer?.hasSubmit;
      }
    }
  }

  checkExistCart() {
    if (this.user && this.shop) {
      if (!this.user.isVendor) {
        this.itemService.checkExistCart(this.user?.id, this.shop?.shopId).subscribe((resCheck) => {
          this.cart = resCheck;
          this.createCustomerItems();
        });
      }
    }
  }
}
