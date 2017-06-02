import { Component, OnInit } from '@angular/core';
import { OrderService } from '../services/order.service';
import { GetDataService, PizzaInterface, IngredientInteface, SizesInterface } from '../services/get-data.service';
import { ingredientPath } from '../shared/paths';

@Component({
  selector: 'app-creator',
  templateUrl: './creator.component.html',
  styleUrls: ['./creator.component.css']
})
export class CreatorComponent implements OnInit{

  offsetX: number = 0;
  offsetSum: number = 0;
  isLeftEnd: boolean = false;
  isRightEnd: boolean = true;
  dragObject: boolean = false;
  currentLeft: number = 0;
  widthSlider: number = 0;
  creatorHeight: number = 500;
  private selectedSize: SizesInterface;
  private createdPizza: PizzaInterface;
  private ingredients: IngredientInteface[];
  private _ingredientPath: string;
  private _currentIngredientWeight = [];
  private _currentIngredientPrice = [];

  constructor(private _orderService: OrderService,
              private _getDataService: GetDataService){
    this.ingredients = _getDataService.getIngredients();
    this.widthSlider = (this.ingredients.length * 10 + this.ingredients.length * 150);
    this.createdPizza = _getDataService.getOnePizzaInformation(0);
    this.selectedSize = _getDataService.getOneSizeInformation(0);
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

  addIngredient(e: Event, item){
    e.preventDefault();
    if(this.ingredients[item.id].added < this.ingredients[item.id].limit && Math.abs(this.offsetSum) < 10){
      this.ingredients[item.id].added++;
      this.updatePizzaInformation();
    }
    this.offsetSum = 0;
  }

  deleteIngredient(e: Event, item){
    e.preventDefault();
    if(this.ingredients[item.id].added > 0){
      this.ingredients[item.id].added--;
      this.updatePizzaInformation();
    }
  }

  clearIngredient(e: Event, item){
    event.stopPropagation();
    this.ingredients[item.id].added = 0;
    this.updatePizzaInformation();
  }

  onSizeChecked(event){
    this.selectedSize = event;
    this.updatePizzaInformation();
  }

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

  updatePizzaInformation(){
    this.checkPizzaPrice();
    this.checkPizzaWeight();
    this.checkPizzaDescription();
    this.calculateWeightPrice();
  };

  clearCreator(){
    for(let i = 0, l = this.ingredients.length; i < l; i++)
      this.ingredients[i].added = 0;

    this.createdPizza = this._getDataService.getOnePizzaInformation(0);
    this.createdPizza.description = '';
    this.updatePizzaInformation();
  }

  onMakeOrder(){
    this._orderService.makeOrder(this.createdPizza, this.selectedSize);
    this._orderService.updateOrderCounter();
    this.clearCreator();
  }

  handlerMouseDown(e){
    if(e.which === 1){
      this.offsetX = e.x;
      this.dragObject = e.target;
    }
  }

  handlerMouseMove(e){
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

  handlerWrapperOut(e){
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
