import { Injectable } from '@angular/core';
import { pizzas } from '../shared/pizza-data';
import { sizes } from '../shared/sizes-data';
import { cities } from '../shared/cities';
import { ingredients } from '../shared/ingredients-data';
import { PizzaInterface } from './pizza.interface';

@Injectable()
export class GetDataService {

  private sizes: SizesInterface[] = sizes;
  private cities;
  private pizzas: PizzaInterface[] = pizzas;
  private ingredients = ingredients;

  private _uniqueId: number = 0;

  constructor(){
    this.cities = cities;
  }

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

  getCities(){
    return this.cities;
  }

};

export interface IngredientInteface{
  id: number;
  name: string;
  cost: number;
  url: string;
  added: number;
  limit: number;
  initWeight: number;
};

export interface SizesInterface{
  id: number;
  size: string;
  priceRatio: number;
  weightRatio: number;
};
