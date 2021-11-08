import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../shared/api.service';

@Injectable()
export class OrderService {
  constructor(private router: Router, private api: ApiService) {}

  getOrderById(id: string) {
    return this.api.getEndPoint<any>(`Order/${id}`);
  }

  getOrdersByShop(shopId: string) {
    return this.api.getEndPoint<any>(`Order/${shopId}/shop/all`);
  }

  changeOrderStatus(orderId: string, orderStatus: string, customerId: string, shopId: string) {
    const param = { orderId, orderStatus, customerId, shopId };
    return this.api.putEndPoint<any>(param, `Order/status`);
  }

  cancelOrder(orderId: string, customerId: string) {
    const param = { orderId, customerId };
    return this.api.putEndPoint<any>(param, `Order/cancel`);
  }
}
