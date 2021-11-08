import { Component, Input, OnChanges, OnInit } from '@angular/core';
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
  cart: Cart;
  hasSubmit: boolean;
  itemsByCustomer = [];

  constructor(
    private itemService: ItemService,
    private alertService: AlertService
  ) {}

  ngOnInit(): void {
    // this.cart = {
    //   "cartId": "555c5f",
    //   "shopId": "985e50",
    //   "customerId": "72cfcb",
    //   "totalPrice": 11,
    //   "itemsInCart": [
    //     {
    //       "image": null,
    //       "amount": 4,
    //       "price": 1,
    //       "customerId": "72cfcb",
    //       "cartId": "555c5f",
    //       "itemId": "017305",
    //       "isDeleted": false,
    //       "readyToOrder": false,
    //       "customerName": "customer",
    //       "itemName": "item 1",
    //       "itemIsActive": true
    //     },
    //     {
    //       "image": null,
    //       "amount": 1,
    //       "price": 1,
    //       "customerId": "30333f",
    //       "cartId": "555c5f",
    //       "itemId": "017305",
    //       "isDeleted": false,
    //       "readyToOrder": false,
    //       "customerName": "demo1",
    //       "itemName": "item 1",
    //       "itemIsActive": true
    //     },
    //     {
    //       "image": null,
    //       "amount": 3,
    //       "price": 2,
    //       "customerId": "30333f",
    //       "cartId": "555c5f",
    //       "itemId": "7e0dcf",
    //       "isDeleted": false,
    //       "readyToOrder": false,
    //       "customerName": "demo1",
    //       "itemName": "item 2",
    //       "itemIsActive": true
    //     }
    //   ],
    // }
  }

  ngOnChanges() {
    if (this.user && this.shop) {
      this.itemService
        .checkExistCart(this.user?.id, this.shop?.id)
        .subscribe((resCheck) => {
          if (resCheck) {
            this.cart = resCheck;
            this.createCustomerItems();
          }
        });
    }
  }

  onRefreshCart(cartId: string) {
    this.itemService.getCartById(cartId).subscribe(
      (reaData) => {
        this.cart = reaData;
        this.createCustomerItems();
      },
      (errorMessage) => {
        this.alertService.error(errorMessage, true);
      }
    );
  }

  onHandleSubmit(hasSubmit: boolean) {
    this.hasSubmit = hasSubmit;
  }

  createCustomerItems() {
    this.itemsByCustomer = [];
    this.cart.itemsInCart.forEach((item) => {
      const index = _.findIndex(this.itemsByCustomer, {
        customerId: item.customerId,
      });
      const total = item.price * item.amount;
      if (index >= 0) {
        this.itemsByCustomer[index].customerTotal += total;
        this.itemsByCustomer[index].hasSubmit = item.readyToOrder
          ? item.readyToOrder
          : this.itemsByCustomer[index].hasSubmit;
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
