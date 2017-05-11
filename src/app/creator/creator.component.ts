import { Component, OnInit } from '@angular/core';

let ingredients = [
  {
    name:  'помидоры',
    cost: 20,
    url: '../img/creator/ingredient-1.png',
    left: 0,
    top: 0
  },
  {
    name:  'грибы',
    cost: 10,
    url: '../img/creator/ingredient-2.png',
    left: 0,
    top: 0
  },
  {
    name:  'зелень',
    cost: 5,
    url: '../img/creator/ingredient-3.png',
    left: 0,
    top: 0
  },
  {
    name:  'сыр',
    cost: 12,
    url: '../img/creator/ingredient-4.png',
    left: 0,
    top: 0
  },
  {
    name:  'маслины',
    cost: 21,
    url: '../img/creator/ingredient-5.png',
    left: 0,
    top: 0
  },
  {
    name:  'лук',
    cost: 4,
    url: '../img/creator/ingredient-6.png',
    left: 0,
    top: 0
  },
  {
    name:  'салями',
    cost: 16,
    url: '../img/creator/ingredient-7.png',
    left: 0,
    top: 0
  },
  {
    name:  'перец',
    cost: 8,
    url: '../img/creator/ingredient-8.png',
    left: 0,
    top: 0
  },
  {
    name:  'ананасы',
    cost: 23,
    url: '../img/creator/ingredient-9.png',
    left: 0,
    top: 0
  },
  {
    name:  'перец сладкий',
    cost: 11,
    url: '../img/creator/ingredient-10.png',
    left: 0,
    top: 0
  },
  {
    name:  'рыба',
    cost: 19,
    url: '../img/creator/ingredient-11.png',
    left: 0,
    top: 0
  },
  {
    name:  'свинина',
    cost: 27,
    url: '../img/creator/ingredient-12.png',
    left: 0,
    top: 0
  },
  {
    name:  'курица',
    cost: 18,
    url: '../img/creator/ingredient-13.png',
    left: 0,
    top: 0
  },
  {
    name:  'кукуруза',
    cost: 7,
    url: '../img/creator/ingredient-14.png',
    left: 0,
    top: 0
  },
  {
    name:  'огурец',
    cost: 5,
    url: '../img/creator/ingredient-15.png',
    left: 0,
    top: 0
  },
  {
    name:  'ветчина',
    cost: 22,
    url: '../img/creator/ingredient-16.png',
    left: 0,
    top: 0
  },
  {
    name:  'острый перец',
    cost: 8,
    url: '../img/creator/ingredient-17.png',
    left: 0,
    top: 0
  },
  {
    name:  'листья салата',
    cost: 14,
    url: '../img/creator/ingredient-18.png',
    left: 0,
    top: 0
  },
  {
    name:  'морепродукты',
    cost: 30,
    url: '../img/creator/ingredient-19.png',
    left: 0,
    top: 0
  },
  {
    name:  'кетчуп',
    cost: 5,
    url: '../img/creator/ingredient-20.png',
    left: 0,
    top: 0
  },
  {
    name:  'горчица',
    cost: 5,
    url: '../img/creator/ingredient-21.png',
    left: 0,
    top: 0
  },
  {
    name:  'майонез',
    cost: 5,
    url: '../img/creator/ingredient-22.png',
    left: 0,
    top: 0
  }
];

class Ingredients {
  name: string;
  cost: number;
  url: string;
  constructor(public left: number = 0,
              public top:  number = 0) {}
};

@Component({
  selector: 'app-creator',
  templateUrl: './creator.component.html',
  styleUrls: ['./creator.component.css']
})
export class CreatorComponent extends OnInit{
  ingredients = ingredients;
  sum = this.ingredients.length;
  element = 50;

  ngOnInit(){
    let h = document.getElementById('creator').clientHeight;
    let wrap = h / 2 - this.element / 2;
    let radius = h / 2 - this.element;

    for(let i = 0; i < this.sum; i++){
      this.ingredients[i].left = Math.round(wrap + radius * Math.sin(2 / this.sum * i * Math.PI));
      this.ingredients[i].top = Math.round(wrap + radius * Math.cos(2 / this.sum * i * Math.PI));
    }
  }
}
