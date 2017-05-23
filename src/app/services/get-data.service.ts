import { Injectable } from '@angular/core';
import { pizzas } from '../shared/pizza-data';
import { sizes } from '../shared/sizes-data';
import { ingredients } from '../shared/ingredients-data';

@Injectable()
export class GetDataService {

  private sizes: SizesInterface[] = sizes;
  private pizzas: PizzaInterface[] = pizzas;
  private ingredients = ingredients;

  private _uniqueId: number = 0;

  constructor(){}

  getPizzaInformation(){
    return Promise.resolve(this.pizzas);
  }

  getSizesInformation(){
    return this.sizes;
  }

  getIngredients(){
    return this.ingredients;
  }

  getIngredientsCount(){
    return this.ingredients.length;
  }

  getOnePizzaInformation(id: number){
    for(let i = 0, l = this.pizzas.length; i < l; i++){
      if(this.pizzas[i].id === id)
        return Object.assign({}, this.pizzas[i]);
    }
  }

  getOneSizeInformation(id: number){
    for(let i = 0, l = this.sizes.length; i < l; i++)
      if(this.sizes[i].id === id)
        return Object.assign({}, this.sizes[i]);
  }

  getUniqueId(): number{
    ++this._uniqueId;
    return this._uniqueId;
  }

}

export interface PizzaInterface {
  readonly id: number;
  readonly name: string;
  readonly description: string;
  readonly url: string;
           initPrice: number;
  readonly initWeight: number;
}

export interface IngredientInteface{
  id: number;
  name: string;
  cost: number;
readonly url: string;
  left: number;
  top: number;
  added: number;
  limit: number;
  initWeight: number;
}

export interface SizesInterface{
  id: number;
  size: number;
  priceRatio: number;
  weightRatio: number;
}
