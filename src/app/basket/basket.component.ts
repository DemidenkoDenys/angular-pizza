import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { OrderService } from '../services/order.service';
import { GetDataService } from '../services/get-data.service';
import { Subscription } from 'rxjs/Subscription';

@Component({
  templateUrl: './basket.component.html',
  selector: 'app-basket',
  styleUrls: ['./basket.component.css']
})
export class BasketComponent implements OnInit{

  fullOrderList = [];
  subscription: Subscription;
  @Output() hideBasket = new EventEmitter();

  constructor(private _orderService: OrderService, private _getDataService: GetDataService){
    this.subscription = _orderService.updateBasket$.subscribe(
      () => { this.updateBasket(); });
    this.updateBasket();
  }

  ngOnInit(){}

  updateBasket(){
    let orderList = this._orderService.getOrderList();
    this.fullOrderList = [];

    for(let i = 0, l = orderList.length, pizza, description, size; i < l; i++){
      pizza = this._getDataService.getOnePizzaInformation(orderList[i].id);
      size = this._getDataService.getOneSizeInformation(orderList[i].sizeId);
      description = (orderList[i].description === '') ? pizza.description : orderList[i].description;

      this.fullOrderList.push({
        id: orderList[i].id,
        url: pizza.url,
        name: pizza.name,
        size: size.size,
        price: orderList[i].price,
        weight: orderList[i].weight,
        dateMS: orderList[i].date,
        date: (new Date(orderList[i].date)).toLocaleDateString() + ' - ' + (new Date(orderList[i].date)).toLocaleTimeString(),
        description: description
      });
    }
    // console.log('Лист заказов', this.fullOrderList);
  }

  onHideBasket(e: Event, forceClose: boolean){
    if(e.srcElement.id === 'basket' || forceClose === true)
      this.hideBasket.emit(false);
  }

  onClearBasket(){
    this._orderService.clearBasket();
    this.updateBasket();
  }

}
