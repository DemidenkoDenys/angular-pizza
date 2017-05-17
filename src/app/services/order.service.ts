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

  constructor(){}

  makeOrder(item){
    this.order.push({
      id: item.id,
      size: 1,
      date: Date.now()
    })

    console.log(this.order);
  }



}
