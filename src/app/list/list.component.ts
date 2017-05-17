import { Component, OnInit } from '@angular/core';
import { GetDataService, PizzaInterface } from '../services/get-data.service';
import { OrderService } from '../services/order.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent {
  pizzas = [];
  sizes = [];

  constructor(private getPizzaData: GetDataService,
              private getSizesData: GetDataService,
              private orderService: OrderService){}

  ngOnInit(){
    this.getPizzaData.getPizzaInformation()
                     .then(pizzas => this.pizzas = pizzas)
                     .then(pizzas => {
                       for(let i = 0, l = this.pizzas.length; i < l; i++){
                         this.pizzas[i].currentPrice = this.pizzas[i].initPrice;
                         this.pizzas[i].currentWeight = this.pizzas[i].initWeight;
                         this.pizzas[i].orderedSize = this.sizes[0].size;
                       }
                     });

    this.getSizesData.getSizesInformation()
                     .then(sizes => this.sizes = sizes);
  }

  onSizeChecked(event){
    for(let i = 0, l = this.pizzas.length; i < l; i++){
      if(this.pizzas[i].id === event.idPizza){
         this.pizzas[i].currentPrice = Math.round(this.pizzas[i].initPrice * event.pratio);
         this.pizzas[i].currentWeight = Math.round(this.pizzas[i].initWeight * event.wratio);
         this.pizzas[i].orderedSize = event.size;
      }
    }
  }

  onMakeOrder(item){
    this.orderService.makeOrder(item);
  }

}
