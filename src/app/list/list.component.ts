import { Component, OnInit } from '@angular/core';
import { PizzaInterface, pizzas } from '../shared/pizza-data';
import { sizes } from '../shared/sizes-data';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent {
  pizzas: any = pizzas;
  sizes = sizes;

  ngOnInit(){
    for(let i = 0, l = pizzas.length; i < l; i++){
      this.pizzas[i].currentPrice = this.pizzas[i].initPrice;
      this.pizzas[i].currentWeight = this.pizzas[i].initWeight;
    }
  }

  onSizeChecked(event){
    for(let i = 0, l = pizzas.length; i < l; i++){
      if(this.pizzas[i].id === event.idPizza){
        this.pizzas[i].currentPrice = Math.round(this.pizzas[i].initPrice * event.pratio);
        this.pizzas[i].currentWeight = Math.round(this.pizzas[i].initWeight * event.wratio);
      }
    }


  }
}
