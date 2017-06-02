import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { OrderService } from '../services/order.service';
import { GetDataService, PizzaInterface, SizesInterface, FullOrderList } from '../services/get-data.service';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-basket',
  templateUrl: './basket.component.html',
  styleUrls: ['./basket.component.css']
})
export class BasketComponent implements OnInit{

  isOpened: boolean = false;
  basketSum: number;
  basketCounter: number;
  message: string = '';
  fullOrderList: FullOrderList[] = [];
  subscription: Subscription;
  countSubscription: Subscription;

  constructor(private _orderService: OrderService,
              private _getDataService: GetDataService){

    // подписка на обновление корзины
    this.subscription = _orderService.updateBasket$.subscribe(
      () => { this.updateBasket(); });

    // подписка на изменение количества заказанных пицц
    this.countSubscription = _orderService.updateCount$.subscribe(
      counter => { this.basketCounter = counter; });

    // подписка на событие добавления в корзину для сообщения
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

    for(let i = 0, l = orderList.length, pizza: PizzaInterface, size: SizesInterface, description: string; i < l; i++){
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
        date: orderList[i].date,
        description: description
      });
    }

    this.basketCounter = this.fullOrderList.length;
    this.basketSum = this._orderService.getOrderSum();
  }

  toggleBasket(){
    this.isOpened = !this.isOpened;
    if(this.isOpened) this.updateBasket();
  }

  hideBasket(e){
    if(e.target.id === 'basket' || e.target.className.indexOf('close-icon') !== -1)
      this.isOpened = false;
    else
      e.preventDefault();
  };

  onClearBasket(){
    this._orderService.clearOrder();
    this.updateBasket();
    this.isOpened = false;
  }

  onDeleteBasketItem(){
    if(!this.basketCounter)
      this.isOpened = false;
  }

  moveToOrder(e){
    e.preventDefault();
    this.isOpened = false;
    this.scrollToOrder();
  }

  scrollToOrder(){
    let timer = setInterval(
      function(){
        let i = Math.sign($('#order').position().top - $(window).scrollTop());
        window.scrollTo(0, $(window).scrollTop() + 10 * i);
        if($(window).scrollTop() * i >= $('#order').position().top * i)
          clearInterval(timer) },
     1);
  }
}
