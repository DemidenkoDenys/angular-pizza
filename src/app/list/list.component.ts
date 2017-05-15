import { Component } from '@angular/core';
import { PizzaInterface, pizzas } from '../shared/pizza-data';
import { sizes } from '../shared/sizes-data';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent {
  pizzas: PizzaInterface[] = pizzas;
  sizes = sizes;
}
