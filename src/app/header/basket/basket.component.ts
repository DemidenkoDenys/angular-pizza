import { Component, Input, Output, EventEmitter } from '@angular/core';
import { OrderService } from '../../services/order.service';
import { GetDataService } from '../../services/get-data.service';

@Component({
  templateUrl: './basket.component.html',
  selector: 'app-basket',
  styleUrls: ['./basket.component.css']
})
export class BasketComponent{

  orderList = [];
  fullOrderList = [];

  @Output() hideBasket = new EventEmitter();

  constructor(private _orderService: OrderService,
              private _getDataService: GetDataService){
    this.updateBasket();
  }

  updateBasket(){
    this.orderList = this._orderService.getOrderList();
    this.fullOrderList = [];

    for(let i = 0, l = this.orderList.length, pizza; i < l; i++){
      pizza = (this.orderList[i].id === 0)
        ? { id: 0, name: 'сборная', desciption: 'ингредиенты', url: '../img/pizza-base.png', initPrice: 50, initWeight: 100 }
        : this._getDataService.getOnePizza(this.orderList[i].id);

      this.fullOrderList.push({
        id: this.orderList[i].id,
        url: pizza.url,
        name: pizza.name,
        size: this.orderList[i].size,
        price: this.orderList[i].price,
        dateMS: this.orderList[i].date,
        date: (new Date(this.orderList[i].date)).toLocaleDateString() + ' - ' + (new Date(this.orderList[i].date)).toLocaleTimeString()
      });
    }
    console.log('Лист заказов', this.fullOrderList);
  }

  onHideBasket(e: Event, forceClose: boolean){
    if(e.srcElement.id === 'basket' || forceClose === true)
      this.hideBasket.emit(false);
  }
}
