import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { Shop } from 'src/app/models/shop.model';
import { AlertService } from 'src/app/shared/alert/alert.service';
import { ShopService } from '../shop.service';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-shop-list',
  templateUrl: './shop-list.component.html',
  styleUrls: ['./shop-list.component.css'],
})
export class ShopListComponent implements OnInit {
  shops: Shop[];
  defaultImage = environment.defaultImage;

  constructor(private shopService: ShopService, private alertService: AlertService, private spinner: NgxSpinnerService) {}

  ngOnInit(): void {
    this.spinner.show();
    this.shopService.getAllShops().subscribe(
      (resData) => {
        this.shops = resData;
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
