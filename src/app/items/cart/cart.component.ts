import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
} from '@angular/core';
import { Cart } from '../../models/cart.model';
import _ from 'lodash';
import { ItemService } from '../item.service';
import { AlertService } from 'src/app/shared/alert/alert.service';
import { User } from 'src/app/auth/user.model';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
})
export class CartComponent implements OnInit, OnChanges {
  @Input() user: User;
  @Input() cart: Cart;
  @Input() itemsByCustomer = [];
  @Input() hasSubmit: boolean;
  @Output() refreshCart = new EventEmitter<string>();
  @Output() handleSubmit = new EventEmitter<boolean>();
  _ = _; //lodash in html

  constructor(
    private itemService: ItemService,
    private alertService: AlertService
  ) {}

  ngOnInit(): void {}

  ngOnChanges() {
    // if (this.cart && this.user) {
    //   const userId = this.user.id;
    //   this.itemsByCustomer = [];
    //   this.hasSubmit =
    //     _.size(
    //       _.filter(this.cart.itemsInCart, function (o) {
    //         return o.readyToOrder && o.customerId === userId;
    //       })
    //     ) === _.size(this.cart.itemsInCart);
    //   this.cart.itemsInCart.forEach((item) => {
    //     const index = _.findIndex(this.itemsByCustomer, {
    //       customerId: item.customerId,
    //     });
    //     const total = item.price * item.amount;
    //     if (index >= 0) {
    //       this.itemsByCustomer[index].customer_total += total;
    //       this.itemsByCustomer[index].items.push(item);
    //     } else {
    //       this.itemsByCustomer.push({
    //         customerId: item.customerId,
    //         customerName: item.customerName,
    //         customerTotal: total,
    //         cartId: this.cart.cartId,
    //         items: [{ ...item }],
    //       });
    //     }
    //   });
    //   console.log('this.itemsByCustomer', this.itemsByCustomer);
    // }
  }

  removeItemFromCart(itemId: string, customerId: string, cartId: string) {
    this.itemService.removeItemFromCart(itemId, customerId, cartId).subscribe(
      (resData) => {
        if (!resData.isSuccess) {
          this.alertService.error(resData.errorMessage, true);
          return;
        }
        this.refreshCart.emit(resData.cartId);
      },
      (errorMessage) => {
        this.alertService.error(errorMessage, true);
      }
    );
  }

  submitClick() {
    let submitObs: Observable<any>;

    if (this.hasSubmit) {
      submitObs = this.itemService.unSubmitItems(
        this.user.id,
        this.cart.cartId
      );
    } else {
      submitObs = this.itemService.submitItems(
        _.find(this.itemsByCustomer, { customerId: this.user.id })
      );
    }

    submitObs.subscribe(
      (resData) => {
        if (!resData.isSuccess) {
          this.alertService.error(resData.errorMessage, true);
          return;
        }
        this.hasSubmit = !this.hasSubmit;
        this.handleSubmit.emit(this.hasSubmit);
      },
      (errorMessage) => {
        this.alertService.error(errorMessage, true);
      }
    );
  }

  orderClick() {
    this.itemService.order(this.cart.cartId).subscribe(
      (resData) => {
        if (!resData.isSuccess) {
          this.alertService.error(resData.errorMessage, true);
          return;
        }
      },
      (errorMessage) => {
        this.alertService.error(errorMessage, true);
      }
    );
  }
}
