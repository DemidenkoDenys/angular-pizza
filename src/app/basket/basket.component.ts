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

  opened: boolean = false;
  basketSum: number;
  basketCounter: number;
  message: string = '';
  fullOrderList = [];
  subscription: Subscription;
  countSubscription: Subscription;

  constructor(private _orderService: OrderService, private _getDataService: GetDataService){

    this.subscription = _orderService.updateBasket$.subscribe(
      () => { this.updateBasket(); });

    this.countSubscription = _orderService.updateCount$.subscribe(
      counter => { this.basketCounter = counter; });

    this.countSubscription = _orderService.addToBasket$.subscribe(
      message => { this.message = message;
                   setTimeout(() => { this.message = ''; }, 2000); });

    this.basketCounter = _orderService.getOrderCount();
  }

  ngOnInit(){
    this.updateBasket();
    this.basketSum = this._orderService.getOrderSum();
  }

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

    this.basketCounter = this.fullOrderList.length;
    this.basketSum = this._orderService.getOrderSum();

    // console.log('Лист заказов', this.fullOrderList);
  }

  toggleBasket(){
    this.opened = !this.opened;
    if(this.opened) this.updateBasket();
  }

  hideBasket(e){
    if(e.target.id === 'basket' || e.target.className.indexOf('close-icon') !== -1)
      this.opened = false;
    else
      e.preventDefault();
  };

  onClearBasket(){
    this._orderService.clearBasket();
    this.updateBasket();
    this.opened = false;
  }

  onDeleteBasketItem(e){
    if(!this.basketCounter)
      this.opened = false;
  }
}
