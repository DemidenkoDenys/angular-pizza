import { Component, OnInit } from '@angular/core';

interface IngredientInteface {
             name: string;
             cost: number;
    readonly url: string;
             left: number;
             top: number;
             added: number;
             limit: number;
};

let ingredients = [
  {
    name:  'помидоры',
    cost: 20,
    url: '../img/creator/ingredient-1.png',
    left: 0,
    top: 0,
    added: 0,
    limit: 3
  },
  {
    name:  'грибы',
    cost: 10,
    url: '../img/creator/ingredient-2.png',
    left: 0,
    top: 0,
    added: 0,
    limit: 3
  },
  {
    name:  'зелень',
    cost: 5,
    url: '../img/creator/ingredient-3.png',
    left: 0,
    top: 0,
    added: 0,
    limit: 5
  },
  {
    name:  'сыр',
    cost: 12,
    url: '../img/creator/ingredient-4.png',
    left: 0,
    top: 0,
    added: 0,
    limit: 2
  },
  {
    name:  'маслины',
    cost: 21,
    url: '../img/creator/ingredient-5.png',
    left: 0,
    top: 0,
    added: 0,
    limit: 12
  },
  {
    name:  'лук',
    cost: 4,
    url: '../img/creator/ingredient-6.png',
    left: 0,
    top: 0,
    added: 0,
    limit: 15
  },
  {
    name:  'салями',
    cost: 16,
    url: '../img/creator/ingredient-7.png',
    left: 0,
    top: 0,
    added: 0,
    limit: 2
  },
  {
    name:  'перец',
    cost: 8,
    url: '../img/creator/ingredient-8.png',
    left: 0,
    top: 0,
    added: 0,
    limit: 5
  },
  {
    name:  'ананасы',
    cost: 23,
    url: '../img/creator/ingredient-9.png',
    left: 0,
    top: 0,
    added: 0,
    limit: 1
  },
  {
    name:  'перец сладкий',
    cost: 11,
    url: '../img/creator/ingredient-10.png',
    left: 0,
    top: 0,
    added: 0,
    limit: 3
  },
  {
    name:  'рыба',
    cost: 19,
    url: '../img/creator/ingredient-11.png',
    left: 0,
    top: 0,
    added: 0,
    limit: 2
  },
  {
    name:  'свинина',
    cost: 27,
    url: '../img/creator/ingredient-12.png',
    left: 0,
    top: 0,
    added: 0,
    limit: 2
  },
  {
    name:  'курица',
    cost: 18,
    url: '../img/creator/ingredient-13.png',
    left: 0,
    top: 0,
    added: 0,
    limit: 2
  },
  {
    name:  'кукуруза',
    cost: 7,
    url: '../img/creator/ingredient-14.png',
    left: 0,
    top: 0,
    added: 0,
    limit: 10
  },
  {
    name:  'огурец',
    cost: 5,
    url: '../img/creator/ingredient-15.png',
    left: 0,
    top: 0,
    added: 0,
    limit: 5
  },
  {
    name:  'ветчина',
    cost: 22,
    url: '../img/creator/ingredient-16.png',
    left: 0,
    top: 0,
    added: 0,
    limit: 2
  },
  {
    name:  'острый перец',
    cost: 8,
    url: '../img/creator/ingredient-17.png',
    left: 0,
    top: 0,
    added: 0,
    limit: 3
  },
  {
    name:  'листья салата',
    cost: 14,
    url: '../img/creator/ingredient-18.png',
    left: 0,
    top: 0,
    added: 0,
    limit: 15
  },
  {
    name:  'морепродукты',
    cost: 30,
    url: '../img/creator/ingredient-19.png',
    left: 0,
    top: 0,
    added: 0,
    limit: 5
  },
  {
    name:  'кетчуп',
    cost: 5,
    url: '../img/creator/ingredient-20.png',
    left: 0,
    top: 0,
    added: 0,
    limit: 2
  },
  {
    name:  'горчица',
    cost: 5,
    url: '../img/creator/ingredient-21.png',
    left: 0,
    top: 0,
    added: 0,
    limit: 2
  },
  {
    name:  'майонез',
    cost: 5,
    url: '../img/creator/ingredient-22.png',
    left: 0,
    top: 0,
    added: 0,
    limit: 2
  }
];

@Component({
  selector: 'app-creator',
  templateUrl: './creator.component.html',
  styleUrls: ['./creator.component.css']
})
export class CreatorComponent extends OnInit{
  ingredients: IngredientInteface[] = ingredients;
  elementCount: number = this.ingredients.length;
  orderSum: number = 50;
  elementSize: number = 50;

  ngOnInit(){
    let creatorHeight = document.getElementById('creator').clientHeight;
    let wrap = creatorHeight / 2 - this.elementSize / 2;
    let radius = creatorHeight / 2 - this.elementSize;

    for(let i = 0; i < this.elementCount; i++){
      this.ingredients[i].left = Math.round(wrap + radius * Math.sin(2 / this.elementCount * i * Math.PI));
      this.ingredients[i].top = Math.round(wrap + radius * Math.cos(2 / this.elementCount * i * Math.PI));
    }
  }

  addIngredient(event: Event, item: IngredientInteface){
    event.preventDefault();
    for(let i = 0; i < this.ingredients.length; i++){
      if(this.ingredients[i].name === item.name){
        if(this.ingredients[i].added < this.ingredients[i].limit){
          this.ingredients[i].added++;
          this.checkSum();
          break;
        }
      }
    }
  }

  deleteIngredient(event: Event, item: IngredientInteface){
    event.preventDefault();
    for(let i = 0; i < this.ingredients.length; i++){
      if(this.ingredients[i].name === item.name){
        if(this.ingredients[i].added > 0){
          this.ingredients[i].added--;
          this.checkSum();
          break;
        }
      }
    }
  }

  fullDeleteIngredient(event: Event, item: IngredientInteface){
    event.stopPropagation();
    for(let i = 0; i < this.ingredients.length; i++){
      if(this.ingredients[i].name === item.name){
        this.ingredients[i].added = 0;
        this.checkSum();
        break;
      }
    }
  }

  checkSum(){
    this.orderSum = 50;
    for(let i = 0; i < this.ingredients.length; i++)
      this.orderSum += this.ingredients[i].added * this.ingredients[i].cost;
  }
}
