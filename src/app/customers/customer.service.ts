import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../shared/api.service';

@Injectable()
export class CustomerService {
  constructor(private router: Router, private api: ApiService) {}
}
