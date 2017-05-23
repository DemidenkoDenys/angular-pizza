import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { OrderService } from '../../services/order.service';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  menus: string[] = [];
  countOrderedItem: number;
  @Output() showBasket = new EventEmitter();

  subscription: Subscription;

  constructor(private _orderService: OrderService) {
    this.menus = ['Main', 'Pizza', 'Create', 'Order'];
    this.countOrderedItem = this._orderService.getOrderCount();

    this.subscription = _orderService.updateCount$.subscribe(
      counter => { this.countOrderedItem = counter; });
  }

  ngOnInit(){}

  onShowBasket(e: Event){
    e.preventDefault();
    this.showBasket.emit(true);
  }

}
