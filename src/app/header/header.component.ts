import { Component } from '@angular/core';
import { OrderService } from '../services/order.service';

@Component({
  templateUrl: './header.component.html',
  selector: 'app-header',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent{

  title: string = 'Dream Pizza';
  basketShow: boolean = false;

  public logoImage = require('../img/logo.png');

  constructor(private _orderService: OrderService){}

  onShowBasket(){
    if(!this.basketShow)
      this._orderService.updateBasket();
    this.basketShow = !this.basketShow;
  }

  onHideBasket(){
    this.basketShow = false;
  }
}
