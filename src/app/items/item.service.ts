import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../shared/api.service';
import { Cart } from '../models/cart.model';
import { Item } from '../models/item.model';

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
    return this.api.getEndPoint<any>(`Cart/${id}`);
  }

  order(cartId: string) {
    const param = { cartId, deliveryInformation: cartId };
    return this.api.postEndPoint<any>(param, `Order`);
  }

  deleteItem(shopId: string, itemId: string) {
    const param = { shopId, itemId };
    return this.api.deleteEndPoint<any>(`Item`, param);
  }

  createItem(shopId: string, itemName: string, price: string, selectedFile: File) {
    const formData = new FormData();
    formData.append('ShopId', shopId);
    formData.append('Name', itemName);
    formData.append('Price', price);
    formData.append('Image', selectedFile);
    return this.api.postEndPoint<any>(formData, `Item/create`);
  }

  editItem(shopId: string, itemId: string, itemName: string, price: string, selectedFile: File) {
    const formData = new FormData();
    formData.append('ShopId', shopId);
    formData.append('ItemId', itemId);
    formData.append('Name', itemName);
    formData.append('Price', price);
    formData.append('Image', selectedFile);
    return this.api.putEndPoint<any>(formData, `Item`);
  }

  getItemById(id: string) {
    return this.api.getEndPoint<Item>(`Item/${id}`);
  }
}
