import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../shared/api.service';
import { Cart } from '../models/cart.model';

@Injectable()
export class ItemService {
  constructor(private router: Router, private api: ApiService) {}

  checkExistCart(customerId: string, shopId: string) {
    const param = { customerId, shopId };
    return this.api.postEndPoint<any>(param, 'Cart/exist/shop/customer');
  }

  createCart(customerId: string, shopId: string) {
    const param = { customerId, shopId };
    return this.api.postEndPoint<any>(param, 'Cart/create');
  }

  addItemToCart(itemId: string, customerId: string, cartId: string) {
    const param = { itemId, customerId, cartId };
    return this.api.postEndPoint<any>(param, 'Cart/add/item');
  }

  removeItemFromCart(itemId: string, customerId: string, cartId: string) {
    const param = { itemId, customerId, cartId };
    return this.api.postEndPoint<any>(param, 'Cart/remove/item');
  }

  submitItems(param: any) {
    return this.api.postEndPoint<any>(param, 'Cart/submit');
  }

  unSubmitItems(customerId: string, cartId: string) {
    const param = { customerId, cartId };
    return this.api.postEndPoint<any>(param, 'Cart/unsubmit');
  }

  getCartById(id: string) {
    return this.api.getEndPoint<Cart>(`Cart/${id}`);
  }

  order(cartId: string) {
    const param = { cartId, deliveryInformation: cartId };
    return this.api.postEndPoint<any>(param, `Order`);
  }
}
