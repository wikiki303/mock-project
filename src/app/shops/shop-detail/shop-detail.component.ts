import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/auth/auth.service';
import { User } from 'src/app/auth/user.model';
import { AlertService } from 'src/app/shared/alert/alert.service';
import { Shop } from '../../models/shop.model';
import { ShopService } from '../shop.service';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-shop-detail',
  templateUrl: './shop-detail.component.html',
  styleUrls: ['./shop-detail.component.css'],
})
export class ShopDetailComponent implements OnInit, OnDestroy {
  private userSub: Subscription;
  defaultImage = environment.defaultImage;
  user: User;
  shop: Shop;
  isViewOrders: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private shopService: ShopService,
    private authService: AuthService,
    private alertService: AlertService,
    private spinner: NgxSpinnerService
  ) {}

  ngOnInit(): void {
    this.userSub = this.authService.user.subscribe((user) => {
      this.user = user;
    });
    const id = this.route.snapshot.paramMap.get('id');
    this.getShop(id);
  }

  onRefreshShop(shopId) {
    this.getShop(shopId);
  }

  getShop(id) {
    this.spinner.show();
    this.shopService.getShopById(id).subscribe(
      (resData) => {
        if (resData.errorMessage) {
          this.alertService.error(resData.errorMessage, true);
          this.spinner.hide();
          return;
        }

        this.shop = resData;
        this.shop.shopId = id;
        this.spinner.hide();
      },
      (errorMessage) => {
        this.alertService.error(errorMessage, true);
        this.spinner.hide();
      }
    );
  }

  ngOnDestroy() {
    this.userSub.unsubscribe();
    this.spinner.hide();
  }
}
