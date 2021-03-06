import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';

interface OrderInterface {
  id: number;
  sizeId: number;
  date: number;
  price: number;
  weight: number;
  description: string;
}

@Injectable()
export class OrderService {

  private order: OrderInterface[] = [];
  private orderDate: Number;
  private basketCountUpdater = new Subject<number>();
  private basketUpdater = new Subject<number>();
  private basketAdder = new Subject<string>();

  public messageAdded = '';

  updateCount$ = this.basketCountUpdater.asObservable();
  updateBasket$ = this.basketUpdater.asObservable();
  addToBasket$ = this.basketAdder.asObservable();

  constructor(){
    if(sessionStorage.length > 0){
      for(let i = 0, l = sessionStorage.length; i < l; i++){
        if(/\d{1,3}_\d_\d{13}_\d{2,3}_\d{3,4}/g.test(sessionStorage.key(i))){
          this.order.push({
            id:     +sessionStorage.key(i).split('_')[0],
            sizeId: +sessionStorage.key(i).split('_')[1],
            date:   +sessionStorage.key(i).split('_')[2],
            weight: +sessionStorage.key(i).split('_')[3],
            price:  +sessionStorage.key(i).split('_')[4],
            description: sessionStorage.getItem(sessionStorage.key(i))
          });
        }
      }
    }
  }

  makeOrder(pizzaObj, sizeObj){
    if(pizzaObj.id === 0){
      this.order.push({
        id: 0,
        sizeId: sizeObj.id,
        date: Date.now(),
        price: pizzaObj.initPrice,
        weight: pizzaObj.initWeight,
        description: pizzaObj.description
      });
    }
    else
      this.order.push({
        id: pizzaObj.id,
        sizeId: sizeObj.id,
        date: Date.now(),
        price: Math.round(pizzaObj.initPrice * sizeObj.priceRatio),
        weight: Math.round(pizzaObj.initWeight * sizeObj.weightRatio),
        description: ''
      });

    sessionStorage.setItem(this.order[this.order.length - 1].id + '_' +
                           this.order[this.order.length - 1].sizeId + '_' +
                           this.order[this.order.length - 1].date + '_' +
                           this.order[this.order.length - 1].price + '_' +
                           this.order[this.order.length - 1].weight,
                           this.order[this.order.length - 1].description);

    this.basketAdder.next(pizzaObj.name + ' добавлена в корзину');

    this.updateOrderCounter();

    // console.log('заказ сделан: ', sessionStorage);
  }

  getOrderList(){
    return this.order;
  }

  updateOrderCounter(){
    this.basketCountUpdater.next(this.order.length);
  }

  getOrderCount(){
    return this.order.length;
  }

  getOrderSum(){
    let sum = 0;
    for(let i = 0, l = this.order.length; i < l; i++)
      sum += this.order[i].price;
    return sum;
  }


  updateBasket(){
    this.basketUpdater.next(1);
  }

  clearOrder(){
    let tempSessionStorage = {};
    for(let i = 0, l = sessionStorage.length; i < l; i++){
      if(!(/\d{1,3}_\d{1,3}_\d{13}_\d{2,3}_\d{3,4}/g.test(sessionStorage.key(i))))
        tempSessionStorage[sessionStorage.key(i)] = sessionStorage.getItem(sessionStorage.key(i));
    }
    sessionStorage.clear();

    for(let key in tempSessionStorage){
      sessionStorage.setItem(key, tempSessionStorage[key]);
    }
    this.order = [];
    this.updateOrderCounter();
  }

  deleteOrderItem(item){
    for(let i = 0, l = this.order.length; i < l; i++){
      if(this.order[i].date === item.date){
        this.order.splice(i, 1); break;
      }
    }

    for(let k = 0; k < sessionStorage.length; k++){
      if(sessionStorage.key(k).indexOf(item.dateMS) !== -1){
        sessionStorage.removeItem(sessionStorage.key(k)); break;
      }
    }

    this.updateBasket();
    this.updateOrderCounter();
  }
}
