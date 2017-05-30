import { Component, OnInit, ViewChild } from '@angular/core';
import { OrderService } from '../services/order.service';
import { GetDataService } from '../services/get-data.service';
import { ingredientPath } from '../shared/paths';

@Component({
  selector: 'app-creator',
  templateUrl: './creator.component.html',
  styleUrls: ['./creator.component.css']
})
export class CreatorComponent implements OnInit{

  creatorHeight: number = 500;
  widthSlider: number = 0;
  currentLeft: number = 0;
  isLeftEnd = false;
  isRightEnd = true;
  dragObject = false;
  offsetX: number = 0;
  offsetSum: number = 0;
  private selectedSize;
  private ingredients;
  private createdPizza;
  private _ingredientPath;

  private _currentIngredientWeight = [];
  private _currentIngredientPrice = [];

  constructor(private _orderService: OrderService,
              private _getDataService: GetDataService){
    this.ingredients = _getDataService.getIngredients();
    this.widthSlider = (this.ingredients.length * 10 + this.ingredients.length * 150);
    this.createdPizza = this._getDataService.getOnePizzaInformation(0);
    this.selectedSize = {id: 0, size: "S", priceRatio: 1, weightRatio: 1 };
  }

  ngOnInit(){
    this.creatorHeight = document.getElementById('creator').clientHeight;
    this._ingredientPath = ingredientPath;
    this.calculateWeightPrice();
  }

  calculateWeightPrice(){
    this._currentIngredientWeight = [];
    this._currentIngredientPrice = [];
    for(let i = 0, l = this.ingredients.length; i < l; i++){
      this._currentIngredientWeight[i] = Math.round(this.ingredients[i].initWeight * this.selectedSize.weightRatio * (this.ingredients[i].added===0 ? 1 : this.ingredients[i].added));
      this._currentIngredientPrice[i] = Math.round(this.ingredients[i].cost * this.selectedSize.priceRatio * (this.ingredients[i].added===0 ? 1 : this.ingredients[i].added));
    }
  }

  addIngredient(event: Event, item){
    event.preventDefault();
    if(this.ingredients[item.id].added < this.ingredients[item.id].limit && Math.abs(this.offsetSum) < 10){
      this.ingredients[item.id].added++;
      this.updatePizzaInformation();
    }
    this.offsetSum = 0;
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
    this.calculateWeightPrice();
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
    for(let i = 0, l = this.ingredients.length; i < l; i++)
      if(this.ingredients[i].added > 0)
        tempWeight += Math.round(this.ingredients[i].added * this.ingredients[i].initWeight);
    this.createdPizza.initWeight = Math.round(tempWeight * this.selectedSize.weightRatio);
  }

  checkPizzaDescription(){
    let description = '';
    for(let i = 0, l = this.ingredients.length; i < l; i++){
      if(this.ingredients[i].added > 0)
        description += this.ingredients[i].name + ' - ' + this.ingredients[i].added + ' шт, ';
    }
    this.createdPizza.description = description.substr(0, description.length - 2);
  }

  clearCreator(){
    for(let i = 0, l = this.ingredients.length; i < l; i++)
      this.ingredients[i].added = 0;

    this.createdPizza = this._getDataService.getOnePizzaInformation(0);
    this.createdPizza.description = '';
    this.updatePizzaInformation();
  }

  onMakeOrder(event){
    this._orderService.makeOrder(this.createdPizza, this.selectedSize);
    this._orderService.updateOrderCounter();
    this.clearCreator();
  }

  handlerMouseDown(e: any){
    if(e.which === 1){
      this.offsetX = e.x;
      this.dragObject = e.target;
    }
  }

  handlerMouseMove(e: any){
    if(this.dragObject){
      let offset = e.x - this.offsetX;
      this.offsetX = e.x;
      this.offsetSum += offset;
      this.moveSlider(offset);
    }
  }

  handlerMouseUp(e){
    this.dragObject = false;
  }

  handlerWrapperOut(e: any){
    if(!e.target.classList.contains('draggable'))
      this.dragObject = false;
  }

  cancelDragStart(){
    return false;
  }



  handleWheel(e){
    e = e || window.event;
    e.preventDefault();

    let delta = e.deltaY || e.detail || e.wheelDelta;
    this.moveSlider(delta);
  }

  moveSlider(offset){
    let leftMargin = this.checkMoveMargins(offset).leftMargin;
    let rightMargin = this.checkMoveMargins(offset).rightMargin;

    if(leftMargin < 0 && rightMargin < 0) this.currentLeft = this.currentLeft + offset;
    if(rightMargin >= 0) this.currentLeft = (this.widthSlider - document.documentElement.clientWidth) * -1;
    if(leftMargin >= 0) this.currentLeft = 0;

    this.isLeftEnd = leftMargin < 0;
    this.isRightEnd = rightMargin < 0;
  }

  checkMoveMargins(offset){
    return {
      leftMargin: this.currentLeft + offset,
      rightMargin: Math.abs(this.currentLeft - document.documentElement.clientWidth) - offset - parseInt(document.getElementById('ingredient-slider').style.width)
    }
  }

}
