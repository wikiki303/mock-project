import { Component, OnDestroy, OnInit } from '@angular/core';
import { AlertService } from 'src/app/shared/alert/alert.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/auth/auth.service';
import { User } from 'src/app/auth/user.model';

@Component({
  selector: 'app-tracking-order',
  templateUrl: './tracking-order.component.html',
  styleUrls: ['./tracking-order.component.css'],
})
export class TrackingOrderComponent implements OnInit, OnDestroy {
  private userSub: Subscription;
  user: User;

  constructor(private authService: AuthService, private alertService: AlertService, private spinner: NgxSpinnerService) {}

  ngOnInit(): void {
    this.userSub = this.authService.user.subscribe((user) => {
      this.user = user;
    });
  }

  ngOnDestroy() {
    this.userSub.unsubscribe();
    this.spinner.hide();
  }
}
