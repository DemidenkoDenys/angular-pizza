import { Component, Output, EventEmitter } from '@angular/core';
import { OrderService } from '../../services/order.service';

@Component({
  templateUrl: './basket.component.html',
  selector: 'app-basket',
  styleUrls: ['./basket.component.css']
})
export class BasketComponent{

  orderList = [];
  @Output() hideBasket = new EventEmitter();

  constructor(private _orderSiervice: OrderService){}

  unpdateBasket(){
    console.log('Корзина', this._orderSiervice.getOrderList());
  }

  onHideBasket(){
    this.hideBasket.emit(false);
  }
}
