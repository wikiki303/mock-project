import { Item } from "./item.model";

export class Shop {
  public shopId: string;
  public name: string;
  public phoneNumber: string;
  public image: string;
  public items: Item[];
  public errorMessage: string;
}