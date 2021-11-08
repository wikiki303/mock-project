import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { User } from 'src/app/auth/user.model';
import { AlertService } from 'src/app/shared/alert/alert.service';
import { Shop } from 'src/app/models/shop.model';
import { ItemService } from '../item.service';
import { NgxSpinnerService } from 'ngx-spinner';

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

  constructor(
    private itemService: ItemService,
    private alertService: AlertService,
    private spinner: NgxSpinnerService
  ) {}

  ngOnInit(): void {}

  onAddToCartClick(itemId: string) {
    this.spinner.show();

    if (!this.cartId) {
      this.itemService.createCart(this.user?.id, this.shop?.id).subscribe(
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

  ngOnDestroy() {
    this.spinner.hide();
  }
}
