import { Component, OnInit } from '@angular/core';
import { OrderService } from '../services/order.service';
import { GetDataService } from '../services/get-data.service';

@Component({
  selector: 'app-creator',
  templateUrl: './creator.component.html',
  styleUrls: ['./creator.component.css']
})
export class CreatorComponent implements OnInit{

  elementsCount: number;
  initSize: number = 0;
  elementSize: number = 50;
  creatorHeight: number = 500;

  private selectedSize;
  private ingredients;
  private createdPizza;

  constructor(private _orderService: OrderService,
              private _getDataService: GetDataService){
    this.ingredients = _getDataService.getIngredients();
    this.createdPizza = this._getDataService.getOnePizzaInformation(0);
    this.elementsCount = this.ingredients.length;
    this.selectedSize = {id: 0, size: 28, priceRatio: 1, weightRatio: 1 };
  }

  ngOnInit(){
    this.creatorHeight = document.getElementById('creator').clientHeight;

    let wrap = this.creatorHeight / 2 - this.elementSize / 2;
    let radius = this.creatorHeight / 2 - this.elementSize;

    for(let i = 0; i < this.elementsCount; i++){
      this.ingredients[i].left = Math.round(wrap + radius * Math.sin(2 / this.elementsCount * i * Math.PI));
      this.ingredients[i].top = Math.round(wrap + radius * Math.cos(2 / this.elementsCount * i * Math.PI));
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


  addIngredient(event: Event, item){
    event.preventDefault();
    if(this.ingredients[item.id].added < this.ingredients[item.id].limit){
      this.ingredients[item.id].added++;
      this.updatePizzaInformation();
      this.moveIngredientField(this.ingredients[item.id]);
    }
  }

  deleteIngredient(event: Event, item){
    event.preventDefault();
    if(this.ingredients[item.id].added > 0){
      this.ingredients[item.id].added--;
      this.updatePizzaInformation();
    }
  }

  clearIngredient(event: Event, item){
    event.stopPropagation();
    this.ingredients[item.id].added = 0;
    this.updatePizzaInformation();
  }

  onSizeChecked(event){
    this.selectedSize = event;
    this.updatePizzaInformation();
  }

  updatePizzaInformation(){
    this.checkPizzaPrice();
    this.checkPizzaWeight();
    this.checkPizzaDescription();
  };

  checkPizzaPrice(){
    let tempPrice = 50;
    for(let i = 0; i < this.ingredients.length; i++)
      if(this.ingredients[i].added > 0)
        tempPrice += Math.round(this.ingredients[i].added * this.ingredients[i].cost);
    this.createdPizza.initPrice = Math.round(tempPrice * this.selectedSize.priceRatio);
  }

  checkPizzaWeight(){
    let tempWeight = 100;
    for(let i = 0; i < this.ingredients.length; i++)
      if(this.ingredients[i].added > 0)
        tempWeight += Math.round(this.ingredients[i].added * this.ingredients[i].initWeight);
    this.createdPizza.initWeight = Math.round(tempWeight * this.selectedSize.weightRatio);
  }

  checkPizzaDescription(){
    let description = '';
    for(let i = 0; i < this.ingredients.length; i++){
      if(this.ingredients[i].added > 0)
        description += this.ingredients[i].name + ' - ' + this.ingredients[i].added + ' шт, ';
    }
    this.createdPizza.description = description.substr(0, description.length - 2);
  }

  initCreator(){
    for(let i = 0, l = this.ingredients.length; i < l; i++)
      this.ingredients[i].added = 0;

    this.createdPizza = this._getDataService.getOnePizzaInformation(0);
    this.createdPizza.description = '';
    this.updatePizzaInformation();
  }

  onMakeOrder(){
    // console.log(this.createdPizza);
    this._orderService.makeOrder(this.createdPizza, this.selectedSize);
    this._orderService.updateOrderCounter();
    this.initCreator();
  }

}
