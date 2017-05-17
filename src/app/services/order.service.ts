import { Injectable } from '@angular/core';

interface OrderInterface {
  id: number;
  size: number;
  date: number;
}

@Injectable()
export class OrderService {

  order: OrderInterface[] = [];
  orderDate: Number;

  constructor(){
    for(let i = 0, l = sessionStorage.length; i < l; i++){
      if(/\b\d_\d{2}|\d{13}\b/g.test(sessionStorage.key(i)))
        this.order.push({
          id: +sessionStorage.key(i).substr(0, sessionStorage.key(i).indexOf('_')),
          size: +sessionStorage.key(i).substr(sessionStorage.key(i).indexOf('_') + 1, sessionStorage.key(i).indexOf('|') - 2),
          date: +sessionStorage.key(i).substr(sessionStorage.key(i).indexOf('|') + 1, sessionStorage.key(i).length)
        });
    }
    console.log('массив заказов', this.order);
  }

  makeOrder(item, size){
    this.order.push({
      id: item.id,
      size: size,
      date: Date.now()
    });
    sessionStorage.setItem(String(item.id)+'_'+String(size)+'|'+String(Date.now()), '');
    console.log('локальное хранилище', sessionStorage);
  }

  getOrderList(){
    return this.order;
  }


}
