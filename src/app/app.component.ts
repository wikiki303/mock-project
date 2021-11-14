import { Component } from '@angular/core';
import { NavigationStart, Router } from '@angular/router';
import { AuthService } from './auth/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  
  title = 'shopping';
  showHead: boolean = false;

  constructor(
    private authService: AuthService,
    private router: Router
  ) {
    // on route change to '/login', set the variable showHead to false
    router.events.forEach((event) => {
      if (event instanceof NavigationStart) {
         if (event['url'] == '/auth') {
            this.showHead = false;
         } else {
            // console.log("NU")
            this.showHead = true;
         }
      }
   });
  }
  
  ngOnInit() {
    this.authService.autoLogin();
  }
}
