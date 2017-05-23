import { Component, OnInit } from '@angular/core';
import { GetDataService, PizzaInterface } from '../services/get-data.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent {
  pizzas = [];

  constructor(private _getPizzaData: GetDataService){}

  ngOnInit(){
    this._getPizzaData.getPizzaInformation()
                      .then(pizzas => this.pizzas = pizzas);
  }
}
