import { Injectable } from '@angular/core';
import { pizzas } from '../shared/pizza-data';
import { sizes } from '../shared/sizes-data';

export interface PizzaInterface {
  readonly id: number;
  readonly name: string;
  readonly description: string;
  readonly url: string;
  initPrice: number;
  readonly initWeight: number;
}

@Injectable()
export class GetDataService {
  pizzas: PizzaInterface[] = pizzas;
  sizes = sizes;

  getPizzaInformation(){
    return Promise.resolve(this.pizzas);
  }

  getSizesInformation(){
    return Promise.resolve(this.sizes);
  }

  getOnePizza(id: number){
    for(let i = 0, l = this.pizzas.length; i < l; i++)
      if(this.pizzas[i].id === id)
        return this.pizzas[i];
  }

}
