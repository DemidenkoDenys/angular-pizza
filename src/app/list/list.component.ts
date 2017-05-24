import { Component, OnInit } from '@angular/core';
import { GetDataService, PizzaInterface } from '../services/get-data.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent {

  pizzas = [];
  private _limpids = [];

  constructor(private _getPizzaData: GetDataService){}

  ngOnInit(){
    this._getPizzaData.getPizzaInformation()
                      .then(pizzas => { this.pizzas = pizzas;
                                        for(let i = 0, l = pizzas.length; i < l; i++)
                                          this._limpids.push(-1);
                                      });
  }

  onPizzaHover(index){
    this._limpids.fill(0);
    this._limpids[index] = 1;
  }

  onPizzaOut(index){
    if(this._limpids.findIndex((e) => { return e === 1 }) !== -1)
      this._limpids.fill(-1);
    else
      this._limpids[index] = 0;
  }

}
