import { ItemsInCart } from './items-in-cart.model';

export class Cart {
  public cartId: string;
  public shopId: string;
  public customerId: string;
  public totalPrice: number;
  public itemsInCart: ItemsInCart[];
}
