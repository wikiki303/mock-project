import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { ApiService } from "../shared/api.service";
import { Shop } from "../models/shop.model";

@Injectable()
export class ShopService {
  constructor(
    private router: Router,
    private api: ApiService
  ) {}

  getListShops(){

  }

  getShopById(id : string) {
    return this.api.getEndPoint<Shop>(`Shop/${id}`);
  }
}