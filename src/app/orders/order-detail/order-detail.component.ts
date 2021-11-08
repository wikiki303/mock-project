import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AlertService } from 'src/app/shared/alert/alert.service';
import { OrderService } from '../order.service';
import _ from 'lodash';

@Component({
  selector: 'app-order-detail',
  templateUrl: './order-detail.component.html',
  styleUrls: ['./order-detail.component.css'],
})
export class OrderDetailComponent implements OnInit {
  @Input() orderDetail = {};
  _ = _; //lodash in html
  orderStatus = ['', 'Confirmed', 'Ready for Pickup', 'Delivered'];

  constructor(private route: ActivatedRoute, private orderService: OrderService, private alertService: AlertService) {}

  ngOnInit(): void {}

  onChangeStatus(status: string) {
    this.orderService.changeOrderStatus(this.orderDetail['orderId'], status, this.orderDetail['customerId'], this.orderDetail['shopId']).subscribe(
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

  cancelOrder() {
    this.orderService.cancelOrder(this.orderDetail['orderId'], this.orderDetail['customerId']).subscribe(
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
