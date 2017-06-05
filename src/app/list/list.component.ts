import { Component, OnInit } from '@angular/core';
import { GetDataService  } from '../services/get-data.service';
import { PizzaInterface } from '../services/pizza.interface';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit{

  private pizzas: PizzaInterface[] = [];
  private _limpids: number[] = [];

  constructor(private _getPizzaData: GetDataService){}

  ngOnInit(){
    this._getPizzaData.getPizzaInformation()
                      .then(pizzas => { this.pizzas = pizzas;
                                        for(let i = 0, l = pizzas.length; i < l; i++)
                                          this._limpids.push(-1);
                                      });
  }

  ngDoCheck(){
    let i = this._limpids.indexOf(1);
    this._limpids.fill(0, 0, i).fill(0, i + 1, this._limpids.length);
    if(i + 1) return false;
    this._limpids.fill(-1);
  }
}
