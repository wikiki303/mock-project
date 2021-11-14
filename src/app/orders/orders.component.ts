import { Component, Input, OnChanges, OnDestroy, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { Observable } from 'rxjs';
import { Shop } from '../models/shop.model';
import { AlertService } from '../shared/alert/alert.service';
import { OrderService } from './order.service';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css'],
})
export class OrdersComponent implements OnInit, OnChanges, OnDestroy {
  @Input() id: string;
  @Input() isVendor: boolean;
  orders = [];
  orderDetail = {};
  isLoading = false;

  constructor(private orderService: OrderService, private alertService: AlertService, private spinner: NgxSpinnerService) {}

  ngOnInit(): void {}

  ngOnChanges() {
    let orderObs: Observable<any>;

    if (this.id) {
      if (this.isVendor) {
        orderObs = this.orderService.getOrdersByShop(this.id);
      } else {
        orderObs = this.orderService.getOrdersByCustomer(this.id);
      }
    }

    orderObs.subscribe(
      (resData) => {
        if (resData) {
          if (!resData.isSuccess) {
            this.alertService.error(resData.errorMessage, true);
            return;
          }
          this.orders = resData.orders;
        }
      },
      (errorMessage) => {
        this.alertService.error(errorMessage, true);
      }
    );
  }

  // values: {orderId, index}
  viewOrderDetailClick(values: any) {
    // this.spinner.show();
    this.orderService.getOrderById(values.orderId).subscribe(
      (resData) => {
        resData.orderId = values.orderId;
        resData.customerName = this.orders[values.index].customerName;
        resData.customerPhoneNumber = this.orders[values.index].customerPhoneNumber;
        this.orderDetail = resData;
        // this.spinner.hide();
      },
      (errorMessage) => {
        this.alertService.error(errorMessage, true);
        // this.spinner.hide();
      }
    );
  }

  ngOnDestroy() {
    this.spinner.hide();
  }
}
