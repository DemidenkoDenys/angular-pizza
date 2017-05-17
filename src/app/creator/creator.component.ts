import { Component, OnInit } from '@angular/core';
import { ingredients, IngredientInteface } from '../shared/ingredients-data';
import { OrderService } from '../services/order.service';

@Component({
  selector: 'app-creator',
  templateUrl: './creator.component.html',
  styleUrls: ['./creator.component.css']
})
export class CreatorComponent implements OnInit{
  ingredients: IngredientInteface[] = ingredients;
  elementCount: number = this.ingredients.length;
  orderSum: number = 50;
  elementSize: number = 50;
  creatorHeight: number = 500;

  constructor(private _orderService: OrderService){}

  ngOnInit(){
    this.creatorHeight = document.getElementById('creator').clientHeight;
    let wrap = this.creatorHeight / 2 - this.elementSize / 2;
    let radius = this.creatorHeight / 2 - this.elementSize;

    for(let i = 0; i < this.elementCount; i++){
      this.ingredients[i].left = Math.round(wrap + radius * Math.sin(2 / this.elementCount * i * Math.PI));
      this.ingredients[i].top = Math.round(wrap + radius * Math.cos(2 / this.elementCount * i * Math.PI));
    }
  }

  addIngredient(event: Event, item: IngredientInteface){
    event.preventDefault();
      let i = item.id;
      if(this.ingredients[i].name === item.name){
        if(this.ingredients[i].added < this.ingredients[i].limit){
          this.ingredients[i].added++;
          this.checkSum();
          this.moveIngredientField(this.ingredients[i]);
        }
    }
  }

  moveIngredientField(item){
    let initLeft = item.left, initTop = item.top;
    item.left = this.creatorHeight / 2 - this.elementSize / 2;
    item.top = this.creatorHeight / 2 - this.elementSize / 2;
    setTimeout(function(){
      item.left = initLeft;
      item.top = initTop;
    }, 1000);
  }

  deleteIngredient(event: Event, item: IngredientInteface){
    event.preventDefault();
    let i = item.id;
      if(this.ingredients[i].name === item.name){
        if(this.ingredients[i].added > 0){
          this.ingredients[i].added--;
          this.checkSum();
        }
      }
  }

  fullDeleteIngredient(event: Event, item: IngredientInteface){
    event.stopPropagation();
    let i = item.id;
      if(this.ingredients[i].name === item.name){
        this.ingredients[i].added = 0;
        this.checkSum();
      }
  }

  checkSum(){
    this.orderSum = 50;
    for(let i = 0; i < this.ingredients.length; i++)
      this.orderSum += this.ingredients[i].added * this.ingredients[i].cost;
  }

  onMakeOrder(item){
    this._orderService.makeOrder({
      id: 0,
      name: 'собраная',
      desciption: 'ингредиенты',
      url: '../img/pizza-base.png',
      initPrice: 50,
      initWeight: 100
    }, 28);
    this._orderService.updateOrderCounter();
  }

}
