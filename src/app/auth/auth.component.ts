import {
  Component,
  ComponentFactoryResolver,
  ViewChild,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';

import { AuthService } from './auth.service';
import { AlertComponent } from '../shared/alert/alert.component';
import { PlaceholderDirective } from '../shared/placeholder/placeholder.directive';
import { AlertService } from '../shared/alert/alert.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css'],
})
export class AuthComponent implements OnInit, OnDestroy {
  returnUrl: string;
  isLoginMode = true;
  isLoading = false;
  error: string = null;

  selectedFile?: File;
  preview: string;

  @ViewChild(PlaceholderDirective, { static: false })
  alertHost: PlaceholderDirective;

  private closeSub: Subscription;

  constructor(
    private authService: AuthService,
    private alertService: AlertService,
    private route: ActivatedRoute,
    private router: Router,
    private componentFactoryResolver: ComponentFactoryResolver
  ) {}

  ngOnInit() {
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
    console.log('ur', this.returnUrl);
    
  }

  onSwitchMode() {
    this.isLoginMode = !this.isLoginMode;
  }

  onSubmit(form: NgForm) {
    if (!form.valid) {
      return;
    }
    const phoneNumber = form.value.phoneNumber;
    const userName = form.value.userName;
    const isVendor: boolean = form.value.isVendor ? true : false;

    let authObs: Observable<any>;

    this.isLoading = true;

    if (this.isLoginMode) {
      authObs = this.authService.login(phoneNumber, isVendor);
    } else {
      authObs = this.authService.signup(
        phoneNumber,
        userName,
        this.selectedFile,
        isVendor
      );
    }
    authObs.subscribe(
      (resData) => {
        const id = isVendor === true ? resData.shopId : resData.customerId;
        if (id) {
          // this.router.navigate(['shops', id]);
          this.router.navigate(['shops', '985e50']);
        } else {
          this.alertService.error('User is not exist', true);
        }
        this.isLoading = false;
      },
      (errorMessage) => {
        this.alertService.error(errorMessage, true);
        // this.error = errorMessage;
        // this.showErrorAlert(errorMessage);
        this.isLoading = false;
      }
    );

    form.reset();
  }

  onHandleError() {
    this.error = null;
  }

  ngOnDestroy() {
    // if (this.closeSub) {
    //   this.closeSub.unsubscribe();
    // }
  }

  private showErrorAlert(message: string) {
    // const alertCmpFactory =
    //   this.componentFactoryResolver.resolveComponentFactory(AlertComponent);
    // const hostViewContainerRef = this.alertHost.viewContainerRef;
    // hostViewContainerRef.clear();
    // const componentRef = hostViewContainerRef.createComponent(alertCmpFactory);
    // componentRef.instance.message = message;
    // this.closeSub = componentRef.instance.close.subscribe(() => {
    //   this.closeSub.unsubscribe();
    //   hostViewContainerRef.clear();
    // });
  }

  selectFiles(event: any): void {
    const files: FileList = event.target.files;
    this.preview = '';
    if (files && files[0]) {
      this.selectedFile = files[0];
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.preview = e.target.result;
      };
      reader.readAsDataURL(this.selectedFile);
    }
  }
}
