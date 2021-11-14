import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-order-list',
  templateUrl: './order-list.component.html',
  styleUrls: ['./order-list.component.css'],
})
export class OrderListComponent implements OnInit {
  @Input() orders: [];
  @Input() isVendor: boolean;
  @Output() viewOrderDetail = new EventEmitter<{orderId: string, index: number}>();

  constructor() {}

  ngOnInit(): void {}

  viewDetail(orderId: string, index: number) {
    this.viewOrderDetail.emit({orderId, index});
  }
}
