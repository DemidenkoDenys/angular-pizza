import { Component } from '@angular/core';

const pizzas = [
  '../img/pizza/1.png',
  '../img/pizza/2.png',
  '../img/pizza/3.png',
  '../img/pizza/4.png',
  '../img/pizza/5.png',
  '../img/pizza/6.png',
  '../img/pizza/7.png',
  '../img/pizza/8.png',
  '../img/pizza/9.png',
  '../img/pizza/10.png',
  '../img/pizza/11.png',
]

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent {

  pizzas = pizzas;

  showInfo(e: any){
    console.log(e.value);
    return false;
  }

}
